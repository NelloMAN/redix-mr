import {RowDataPacket} from 'mysql2'

export interface Info{
        readonly type : string,
        code : number,
        message : string
}

export interface IWorkDay extends RowDataPacket{

        wrkdID: number; 
        wrkdDay: Date; 
        wrkdInfoID: number;
        wrkdUsrID: number;
        wrkdActivity: string; 
        wrkdActivityType: string; 
        wrkdActivityHour: number; 
        wrkdSqdID: number; 
        wrkdCdc: string;
}