export interface Info{
        readonly type : string,
        code : number,
        message : string
}

export interface IWorkDay {

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

export interface IDateWorkDay {

        dwdDate: Date;
        wdArray: IWorkDay[];
}

export interface IUser {

        usrID: number;
        usrEmail: string;
        usrName: string;
        usrSurname: string;
        usrPwd: string;
        lastWorkedMonth: number;        
}

export interface IUsrMonth {

        monthNumb: number;
        monthName: string;
}

export interface ISquad {

        sqdID: number;
        sqdName: string;
}