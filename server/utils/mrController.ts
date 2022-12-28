import { RequestHandler, Request, Response } from "express";
import { IUser, IDateWorkDay, ISquad, IUsrMonth, IWorkDay } from "./interface/MRServerInterface.js";
import * as mrServices from './mrServices.js';

export const getUsrInfo: RequestHandler = async (req: Request, res: Response) => {
    try {
      const user:IUser = await mrServices.getUserInfo(req.params.email, req.params.pwd);
  
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
    const workDay:IWorkDay[] = await mrServices.getUserWorkDay(parseInt(req.params.usrID), parseInt(req.params.month));

    let processedDate = new Map<Date,IWorkDay[]>();

    workDay.forEach( (row: IWorkDay) => {

      if (!processedDate.has(row.wrkdDay)) {

        let dayTable : IWorkDay[] = [];
        dayTable.push(row);

        processedDate.set(row.wrkdDay, dayTable);
      } else {

        let tempArray:IWorkDay[]= processedDate.get(row.wrkdDay)!;
        tempArray.push(row);
        processedDate.set(row.wrkdDay, tempArray);
      }
    })

    let dateWorkDay :IDateWorkDay[] = [];
    processedDate.forEach( (value, key) =>{

      let dwdItem : IDateWorkDay = {
        dwdDate : new Date(),
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
      result:'ok'
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
    const usrMonth : IUsrMonth[] = await mrServices.getUsrMonth(parseInt(req.params.usrID));

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
    const squad : ISquad[] = await mrServices.getSquad();

    res.status(200).json({
      squad
    });
  } catch (error) {
    console.error('[mrController][getUsrMonth][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching UsrMonth'
    });
  }
};