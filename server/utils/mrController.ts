import { RequestHandler, Request, Response } from "express";
import { IUser, IDateWorkDay, ISquad, IUsrMonth, IWorkDay, IAlert } from "./interface/MRServerInterface.js";
import * as mrServices from './mrServices.js';
import { mrSingleton } from "./mrSingleton.js";
import * as mrUtils from "./mrUtils.js"
import Enumerable from "linq";

export const getUsrInfo: RequestHandler = async (req: Request, res: Response) => {
    try {
        const user: IUser = await mrServices.getUserInfo(req.params.email, req.params.pwd);

        res.status(200).json({
            user
        });
    } catch (error) {
        console.error('[mrController][getUserInfo][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when fetching user'
        });
    }
};

export const getUsrWorkDay: RequestHandler = async (req: Request, res: Response) => {
    try {

        const workDay: IWorkDay[] = await mrServices.getUserWorkDay(parseInt(req.params.usrID), parseInt(req.params.month));

        //Salvo il valore degli ultimi record salvati in modo da averli sempre a disposizione
        mrSingleton.getInstance().setLastSavedWD(workDay);

        let processedDate: Map<Date, IWorkDay[]> = new Map<Date, IWorkDay[]>();

        workDay.forEach((row: IWorkDay) => {

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

        res.status(200).json({
            dateWorkDay
        });

    } catch (error) {
        console.error('[mrController][getUserWorkDay][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when fetching user WorkDay'
        });
    }
};

export const setTimeName: RequestHandler = async (req: Request, res: Response) => {
    try {
        await mrServices.setTimeName();

        res.status(200).json({
            result: 'ok'
        });
    } catch (error) {
        console.error('[mrController][setTimeName][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when setting italian time system'
        });
    }
};

export const getUsrMonth: RequestHandler = async (req: Request, res: Response) => {
    try {
        const usrMonth: IUsrMonth[] = await mrServices.getUsrMonth(parseInt(req.params.usrID));

        res.status(200).json({
            usrMonth
        });
    } catch (error) {
        console.error('[mrController][getUsrMonth][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when fetching UsrMonth'
        });
    }
};

export const getSquad: RequestHandler = async (req: Request, res: Response) => {
    try {
        const squad: ISquad[] = await mrServices.getSquad();

        res.status(200).json({
            squad
        });
    } catch (error) {
        console.error('[mrController][getSquad][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when fetching UsrMonth'
        });
    }
};

export const getFirstWDIDAvailable: RequestHandler = async (req: Request, res: Response) => {
    try {
        const firstWDIDAvailable: number = await mrServices.getFirstWDIDAvailable(parseInt(req.params.usrID));

        res.status(200).json(
            firstWDIDAvailable
        );
    } catch (error) {
        console.error('[mrController][getFirstWDIDAvailable][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when fetching UsrMonth'
        });
    }
};

export const saveWD: RequestHandler = async (req: Request, res: Response) => {
    try {

        let newWorkDays: IWorkDay[] = req.body.newWorkDays;
        let rowsAdded: number = 0;
        let rowsModified: number = 0;
        let rowsDeleted: number = 0;

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

        let changeWorkDays: IWorkDay[] = req.body.changeWorkDays;
        let deletedWorkDaysID: number[] = req.body.deletedWorkDaysID

        /*
        Verifico se all'interno della lista degli id dei record cancellati c'è qualche record anche modificato. 
        Se si rimuovo il record dagli elementi modificati per poi cancellarlo definitivamente
        */
        let changeWorkDaysDef: IWorkDay[] = changeWorkDays.filter(x => deletedWorkDaysID.indexOf(x.wrkdID) === -1);

        let wdToCheck: IWorkDay[] = newZeroIdWD.concat(changeWorkDaysDef);

        let err_war: IAlert[] = mrUtils.checkWorkItem(newZeroIdWD, changeWorkDaysDef);

        if (err_war.length > 0) {

            let toJson = {
                typo: 'err_war',
                errWar: err_war,
                wdToSave: wdToCheck
            }

            res.send(JSON.stringify(toJson));

        } else {

            if (newZeroIdWD.length > 0) {
                rowsAdded = await mrServices.AddNewWD(newZeroIdWD);
            }

            // if (changeWorkDaysDef.length > 0) {
            //     rowsModified = await mrServices.AddNewWD(req.body.newZeroIdWD);
            // }

            // if (deletedWorkDaysID.length > 0) {
            //     rowsDeleted = await mrServices.AddNewWD(req.body.newZeroIdWD);
            // }
        }

        res.status(200).json(
            rowsAdded
        );
        
    } catch (error) {
        console.error('[mrController][AddNewWD][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when fetching UsrMonth'
        });
    }
};