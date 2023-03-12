import { RequestHandler, Request, Response } from "express";
import { IUser, IDateWorkDay, ISquad, IUsrMonth, IWorkDay, IAlert } from "./interface/MRServerInterface.js";
import * as mrServices from './mrServices.js';
import * as mrUtils from "./mrUtils.js"
import Enumerable from "linq";
import WorkDay from "./model/WorkDay.js";

export const getUsrInfo: RequestHandler = async (req: Request, res: Response) => {
    try {
        const user: IUser [] = await mrServices.getUserInfo(req.params.email, req.params.pwd);

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

        const dwd: IDateWorkDay[] = await mrServices.getUserWorkDay(parseInt(req.params.usrID), parseInt(req.params.month));
        res.status(200).json({
            dwd
        });

    } catch (error) {
        console.error('[mrController][getUserWorkDay][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when fetching user WorkDay'
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

        let changeWorkDays: IWorkDay[] = req.body.changeWorkDays;
        let deletedWorkDaysID: number[] = req.body.deletedWorkDaysID

        const rowsAdded = await mrServices.AddNewWD(newWorkDays, changeWorkDays, deletedWorkDaysID);

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