import {ISquad, IUser, IUsrMonth, IWorkDay, IDateWorkDay, IAlert} from './interface/MRServerInterface.js';
import {Op, Sequelize, WhereOperators } from 'sequelize';
import Usr from './model/Usr.js';
import WorkDay, { IWorkDayModel } from './model/WorkDay.js';
import * as mrUtils from "./mrUtils.js"
import Info from './model/Info.js';
import Enumerable from 'linq';
import Squad from './model/Squad.js';
import { sequelize } from './mysql_utils/vars.config.js';


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
            wrkdUsrID: <WhereOperators>{
                [Op.eq] : usrID
            },
            wrkdDay: <WhereOperators>{
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
            wrkdInfoGrpID: w.getDataValue("wrkdInfoGrpID")!,
            wrkdCdc: w.wrkdCdc
        });
    });

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
        where : {
            wrkdUsrID : <WhereOperators> {
                [Op.eq] : usrID
            }
        }
    }).then ( result => {

        iUsrMonth = result.map(r => {
            return {
                monthName: mrUtils.toItaMonth(r.getDataValue('monthName')!.toString()),
                monthNumb: parseInt(r.getDataValue('monthNumb')!.toString())
            }
        });
    })
    
    return iUsrMonth;
};

export const getSquad = async () : Promise<ISquad[]> => {

    let isqd : ISquad [] = [];

    await Squad.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    }).then(result => {
        isqd = result.map(r=> {
            return {
                sqdID: r.sqdID,
                sqdName: r.sqdName
            }
        })
    });

    return isqd;
    //return execute<ISquad[]>(mrQuery.GetSquad, []);
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
        firstWD_IDAvailable = 1 + parseInt(result[0].getDataValue("firstWDIDAvailable")!.toString())
    })

    return firstWD_IDAvailable;
};

export const SaveWD = async (nwd : IWorkDay[], cwd : IWorkDay[], dwdID : number[]) => {

    let newWorkDays: IWorkDay[] = nwd;
    let changeWorkDays: IWorkDay[] = cwd;
    let deletedWorkDaysID: number[] = dwdID

    /*
    Setto la proprietà wrkdID di tutti gli elementi della lista
    newWorkDays(creandone una nuova ovvero newZeroIdWD) in modo tale 
    da distingure i record da inserire da quelli da updateare prima
    che vengano concatenati per fare il check
    */
    let newZeroIdWD: IWorkDay[] = Enumerable.from(newWorkDays).select(function(x) { 
        return { 
            wrkdActivity:       x.wrkdActivity, 
            wrkdActivityHour:   x.wrkdActivityHour,
            wrkdActivityType:   x.wrkdActivityType,
            wrkdCdc:            x.wrkdCdc,
            wrkdDay:            x.wrkdDay,
            wrkdID:             0,
            wrkdInfoID:         x.wrkdInfoID,
            wrkdSqdID:          x.wrkdSqdID,
            wrkdUsrID:          x.wrkdUsrID,
            wrkdInfoGrpID:      x.wrkdInfoGrpID
        }; 
    }).toArray();

    /*
    Verifico se all'interno della lista degli id dei record cancellati c'è qualche record anche modificato. 
    Se si, rimuovo il record dagli elementi modificati per poi cancellarlo definitivamente
    */
    let changeWorkDaysDef: IWorkDay[] = changeWorkDays.filter(x => deletedWorkDaysID.indexOf(x.wrkdID) === -1);

    let wdToCheck: IWorkDay[] = newZeroIdWD.concat(changeWorkDaysDef);

    let usrToCheck : number = 0;
    let monthToCheck : number [] = [];

    if (wdToCheck.length > 0) {

        usrToCheck = wdToCheck[0].wrkdUsrID;

        monthToCheck = Enumerable.from(wdToCheck).select(m => new Date(m.wrkdDay).getMonth()+1).distinct().toArray();
    } 

    let err_war: IAlert[] = []; 
    
    await mrUtils.checkWorkItem(usrToCheck, monthToCheck, newZeroIdWD, changeWorkDaysDef).then(result => {

        result.forEach(r => {
            err_war.push({
                info: r.info,
                day: r.day,
                delta: r.delta
            }) 
        });
    });

    if (err_war.length > 0) {

        let toJson = {
            errWar: err_war,
            wdToSave: wdToCheck,
            addedRows: 0,
            updatedRows: 0,
            deletedRows: 0
        }

        return toJson;

    } else {

        let addedRows : number = 0;
        let updatedRows : number = 0;
        let deletedRows : number = 0;

        let mWorkDayNew : IWorkDayModel[] = [];
        let mWorkDayUpd : IWorkDayModel[] = [];

        newZeroIdWD.forEach( n => {
    
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

        changeWorkDaysDef.forEach(u => {

            mWorkDayUpd.push({
                wrkdID: u.wrkdID,
                wrkdDay: u.wrkdDay,
                wrkdInfoID: u.wrkdInfoID,
                wrkdUsrID: u.wrkdUsrID,
                wrkdActivity: u.wrkdActivity,
                wrkdActivityType: u.wrkdActivityType,
                wrkdActivityHour: u.wrkdActivityHour,
                wrkdSqdID: u.wrkdSqdID,
                wrkdCdc: u.wrkdCdc
            });
        })

        const t = await sequelize.transaction();
    
        try {

            //INSERT NUOVI WORKDAY
            await WorkDay.bulkCreate(mWorkDayNew, {transaction : t})
                .then(createdWD => {
                    addedRows += createdWD.length;
                })
                .catch(error => {
                    throw new Error("Error trying adding new workDays");
                });

            //UPDATE WORKDAY
            await WorkDay.bulkCreate(
                mWorkDayUpd, 
                {
                    transaction: t,
                    updateOnDuplicate: ["wrkdID"]
                })
                .then(updatedWD => {
                    updatedRows += updatedWD.length;
                })
                .catch(error => {
                    throw new Error("Error trying update WorkDay")
                });
            
            //DELETE WORKDAY
            await WorkDay.destroy({
                where: {
                    wrkdID : deletedWorkDaysID
                },
                transaction: t
            })
            .then( deletedWD => {
                deletedRows += deletedWD
            });
            
            t.commit();

        } catch (err) {
            
            t.rollback();
        }

        let toJson = {
            errWar: [],
            wdToSave: [],
            addedRows: addedRows,
            updatedRows: updatedRows,
            deletedRows: deletedRows
        };

        return toJson;
    }
}