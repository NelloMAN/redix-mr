import { execute } from './mysql_utils/mysql.connector.js';
import {ISquad, IUser, IUsrMonth, IWorkDay, IDateWorkDay} from './interface/MRServerInterface.js';
import {mrQuery} from './mrQuery.js';
import moment from 'moment';
import { FindOptions, IncrementDecrementOptionsWithBy, InstanceDestroyOptions, InstanceRestoreOptions, InstanceUpdateOptions, Model, Op, SaveOptions, Sequelize, SetOptions } from 'sequelize';
import Usr from './model/Usr.js';
import WorkDay, { IWorkDayModel } from './model/WorkDay.js';
import * as mrUtils from "./mrUtils.js"
import Info from './model/Info.js';
import { sequelize } from './mysql_utils/vars.config.js';
import { group } from 'console';
import { SequelizeHooks } from 'sequelize/types/hooks.js';
import { ValidationOptions } from 'sequelize/types/instance-validator.js';

/**
 * Get active team records
 *
 * @param req Express Request
 * @param res Express Response
 */
export const getUserInfo = async (email: IUser['usrEmail'], pwd: IUser['usrPwd'])=> {
    
    //return execute<IUser>(mrQuery.GetUsrInfo, [email, pwd]);
    let  qUsr : Usr [] = [];
    try {

        qUsr = await 
            Usr.findAll({
                attributes: ['usrID','usrEmail','usrName','usrSurname','usrPwd', [Sequelize.fn('MONTH', Sequelize.fn('MAX', Sequelize.col('wrkdDay'))), 'lastWorkedMonth']],
                include: [{
                    model: WorkDay,
                    attributes: [],
                    required: false 
                }],
                where: {
                    usrEmail: {
                        [Op.eq] : email
                    },
                    usrPwd:{
                        [Op.eq] : pwd
                    }
                },
                group: ['usrID']
            });
    } catch (err) {
        console.log(err);
    }
    
    let iuser : IUser[] = [];

    qUsr.forEach(qu => {
        
        iuser.push({
            usrID: qu.usrID,
            usrEmail: qu.usrEmail,
            usrName: qu.usrName,
            usrSurname: qu.usrSurname,
            usrPwd: qu.usrPwd,
            lastWorkedMonth: qu.getDataValue("lastWorkedMonth")
        })
    });
    
    return iuser;
};

export const getUserWorkDay = async (usrID: Number, month: Number) : Promise<IDateWorkDay []> => {
    //return execute<IWorkDay[]>(mrQuery.GetUsrWorkDay, [usrID, month]);

    let workDay : WorkDay[] = [];
    let iwd : IWorkDay[] = [];

    workDay = await WorkDay.findAll({
        attributes:[
            'wrkdID',
            [Sequelize.literal('DATE_FORMAT(wrkdDay, "%Y-%m-%d")'), 'wrkdDay'],
            'wrkdInfoID',
            [Sequelize.literal('`Info`.`infoGrpID`'), 'wrkdInfoGrpID'],
            'wrkdUsrID',
            'wrkdActivity',
            'wrkdActivityType',
            'wrkdActivityHour',
            'wrkdSqdID'],
        include: [{
                model: Info,
                required: true,
                attributes: ['infoGrpID']
            }],
        where: {
            wrkdUsrID: {
                [Op.eq] : usrID
            },
            wrkDay: {
                [Op.and] :[
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('wrkdDay')), month)
                ]
            }
        }
    })
    
    workDay.forEach( w => {

        iwd.push({
            wrkdID: w.wrkdID,
            wrkdDay: w.wrkdDay,
            wrkdInfoID: w.wrkdInfoID,
            wrkdUsrID: w.wrkdUsrID,
            wrkdActivity: w.wrkdActivity,
            wrkdActivityType: w.wrkdActivityType,
            wrkdActivityHour: w.wrkdActivityHour,
            wrkdSqdID: w.wrkdSqdID,
            wrkdInfoGrpID: w.getDataValue("wrkdInfoGrpID"),
            wrkdCdc: w.wrkdCdc
        });
    });
    //Salvo il valore degli ultimi record salvati in modo da averli sempre a disposizione
    //mrSingleton.getInstance().setLastSavedWD(workDay); questo non va fatto. Problemi di performance

    let processedDate: Map<Date, IWorkDay[]> = new Map<Date, IWorkDay[]>();

    iwd.forEach((row: IWorkDay) => {

        if (!processedDate.has(row.wrkdDay)) {

            let dayTable: IWorkDay[] = [];
            dayTable.push(row);

            processedDate.set(row.wrkdDay, dayTable);
        } else {

            let tempArray: IWorkDay[] = processedDate.get(row.wrkdDay)!;
            tempArray.push(row);
            processedDate.set(row.wrkdDay, tempArray);
        }
    })

    let dateWorkDay: IDateWorkDay[] = [];
    processedDate.forEach((value, key) => {

        let dwdItem: IDateWorkDay = {
            dwdDate: new Date(),
            wdArray: []
        };

        dwdItem.dwdDate = key
        dwdItem.wdArray = value
        dateWorkDay.push(dwdItem)
    });

    return dateWorkDay;
};

export const getUsrMonth = async (usrID: Number) : Promise<IUsrMonth[]> => {
    
    //return execute<IUsrMonth[]>(mrQuery.GetUsrMonth, [usrID]);
    let iUsrMonth : IUsrMonth[] = [];

    await WorkDay.findAll({
        attributes : [
            [
                Sequelize.fn(
                    'DISTINCT', Sequelize.fn(
                        'MONTH', Sequelize.col('wrkdDay')
                    )
                ), 'monthNumb'
            ],
            [Sequelize.fn('MONTHNAME', Sequelize.col('wrkdDay')), 'monthName']
        ],
        where:{
            wrkdUsrID : {
                [Op.eq] : usrID
            }
        }
    }).then ( result => {

        iUsrMonth = result.map(r => {
            return {
                monthName: mrUtils.toItaMonth(r.getDataValue('monthName').toString()),
                monthNumb: parseInt(r.getDataValue('monthNumb').toString())
            }
        });
    })
    
    return iUsrMonth;
};


export const getSquad = async () : Promise<ISquad[]> => {
    return execute<ISquad[]>(mrQuery.GetSquad, []);
};

export const getFirstWDIDAvailable = async (usrID: number) : Promise<number> => {

    let firstWD_IDAvailable : number = 0;

    await WorkDay.findAll({
        attributes:[
            [Sequelize.fn('MAX', Sequelize.col('wrkdID')), 'firstWDIDAvailable']
        ],
        where:{
            wrkdUsrID : {
                [Op.eq] : usrID
            }
        },
        group: ['wrkdID']
    }).then( result => {
        firstWD_IDAvailable = 1 + parseInt(result[0].getDataValue('firstWDIDAvailable').toString())
    })

    return firstWD_IDAvailable;
};

export const AddNewWD = async (newWD : IWorkDay []) => {

    let mWorkDayNew : IWorkDayModel[] = [];

    newWD.forEach( n => {

        mWorkDayNew.push({
            wrkdID: n.wrkdID,
            wrkdDay: n.wrkdDay,
            wrkdInfoID: n.wrkdInfoID,
            wrkdUsrID: n.wrkdUsrID,
            wrkdActivity: n.wrkdActivity,
            wrkdActivityType: n.wrkdActivityType,
            wrkdActivityHour: n.wrkdActivityHour,
            wrkdSqdID: n.wrkdSqdID,
            wrkdCdc: n.wrkdCdc
        });
    })

    return await WorkDay.bulkCreate(mWorkDayNew);
}