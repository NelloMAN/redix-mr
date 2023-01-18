export interface IWorkDay {
    wrkdID: number,
    wrkdUsrID: number,
    wrkdDay: Date,
    wrkdInfoID: number,
    wrkdInfoGrpID: number;
    wrkdActivity: string,
    wrkdActivityHour: number,
    wrkdSqdID: number,
    wrkdActivityType: string,
    wrkdCdc: string
}

export interface IUser {
    usrID: number,
    usrEmail : string,
    usrName : string,
    selectedMonth : number
}

export interface DateWorkDay {
    dwdDate: Date,
    wdArray: IWorkDay[]
}

export interface Squad {
    sqdID : number, 
    sqdName : string
}

export interface IUsrMonth {

    monthNumb: number;
    monthName: string;
}