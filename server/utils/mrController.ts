  import { RequestHandler, Request, Response } from "express";
import { IDateWorkDay, IWorkDay } from "./interface/MRServerInterface.js";
  import * as mrServices from './mrServices.js';

  export const getUserInfo: RequestHandler = async (req: Request, res: Response) => {
      try {
        const user = await mrServices.getUserInfo(req.params.email, req.params.pwd);
    
        res.status(200).json({
          user
        });
      } catch (error) {
        console.error('[mrController][getUser][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
          message: 'There was an error when fetching user'
        });
      }
  };

  export const getUserWorkDay: RequestHandler = async (req: Request, res: Response) => {
    try {
      const workDay = await mrServices.getUserWorkDay(parseInt(req.params.usrID), parseInt(req.params.month));

      let processedDate = new Map();

      workDay.forEach( (row: IWorkDay) => {

        if (!processedDate.has(row.wrkdDay)) {

          let dayTable = [];
          dayTable.push(row);

          processedDate.set(row.wrkdActivity, dayTable);
        } else {

          let tempArray = processedDate.get(row.wrkdDay);
          tempArray.push(row);
          processedDate.set(row.wrkdDay, tempArray);
        }
      })

      let dateWorkDay :IDateWorkDay[] = [];
      processedDate.forEach( (value, key) =>{

        let dwdItem : IDateWorkDay = {
          dwdDate : new Date,
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
      console.error('[mrController][getUser][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
      res.status(500).json({
        message: 'There was an error when fetching user'
      });
    }
  };