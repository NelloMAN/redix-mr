import { execute } from './mysql_utils/mysql.connector.js';
import {ISquad, IUser, IUsrMonth, IWorkDay, IDateWorkDay} from './interface/MRServerInterface.js';
import {mrQuery} from './mrQuery.js';
import moment from 'moment';
import { Op, Sequelize } from 'sequelize';
import Usr from './model/Usr.js';
import WorkDay from './model/WorkDay.js';
import { mrSingleton } from './mrSingleton.js';
import Info from './model/Info.js';

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

export const getUserWorkDay = async (usrID: Number, month: Number)  => {
    //return execute<IWorkDay[]>(mrQuery.GetUsrWorkDay, [usrID, month]);

    let workDay : WorkDay[] = [];
    let iwd : IWorkDay[] = [];

    workDay = await WorkDay.findAll({
        attributes:[
            'wrkdID',
            'wrkdDay',
            'wrkdInfoID',
            ['Info.infoGrpID', 'wrkdInfoGrpID'],
            'wrkdUsrID',
            'wrkdActivity',
            'wrkdActivityType',
            'wrkdActivityHour',
            'wrkdSqdID'],
        include: [{
                model: Info,
                attributes: [] 
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

export const setTimeName = async () => {
    return execute(mrQuery.SetTimeName, []);
};

export const getUsrMonth = async (usrID: Number) : Promise<IUsrMonth[]> => {
    return execute<IUsrMonth[]>(mrQuery.GetUsrMonth, [usrID]);
};


export const getSquad = async () : Promise<ISquad[]> => {
    return execute<ISquad[]>(mrQuery.GetSquad, []);
};

export const getFirstWDIDAvailable = async (usrID: number) : Promise<number> => {
    return execute<number>(mrQuery.GetFirstWDIDAvailable, [usrID]);
};

export const AddNewWD = async (newWD : IWorkDay []) : Promise<number> => {

    const values = newWD.map(nwd => [
        moment(nwd.wrkdDay).format('YYYY-MM-DD HH:mm:ss'),
        nwd.wrkdInfoID,
        nwd.wrkdUsrID,
        nwd.wrkdActivity,
        nwd.wrkdActivityType,
        nwd.wrkdActivityHour,
        nwd.wrkdSqdID,
        nwd.wrkdCdc 
    ]);

    return execute<number>(mrQuery.AddNewWD, [values]);
}