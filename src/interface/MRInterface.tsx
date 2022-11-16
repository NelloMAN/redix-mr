export interface WorkDay {
    wrkdID: number,
    wrkdUsrID: number,
    wrkdDay: Date,
    wrkdInfoID: number,
    wrkdActivity: string,
    wrkdActivityHour: number,
    wrkdSqdID: number,
    wrkdActivityType: string,
    wrkdCdc: string
}

export interface User {
    usrEmail : string,
    usrName : string,
    selectedMonth : number
}

export interface DateWorkDay {
    day: Date,
    wd: WorkDay[]
}

export interface Squad {
    sqdID : number, 
    sqdName : string
}