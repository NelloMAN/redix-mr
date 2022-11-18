export interface WorkDay {
        wrkdID: number, 
        wrkdDay: Date, 
        wrkdInfoID: number, 
        wrkdUsrID: number, 
        wrkdActivity: string, 
        wrkdActivityType: string, 
        wrkdActivityHour: number, 
        wrkdSqdID: number, 
        wrkdCdc: string
}

export interface DateWorkDay {
        day: Date,
        workDayArray: WorkDay[]
}