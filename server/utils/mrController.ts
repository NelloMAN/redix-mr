import { RequestHandler, Request, Response } from "express";
import * as mrServices from './mrServices.js';

export const getUser: RequestHandler = async (req: Request, res: Response) => {
    try {
      const user = await mrServices.getUser(req.params.email, req.params.pwd);
  
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