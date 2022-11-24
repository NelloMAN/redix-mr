import { WorkDay } from "./WorkDay";

export class DateWorkDay {

    day: Date;
    workDayArray: WorkDay[];

    constructor(d:Date, wArray : WorkDay[]) {
        this.day = d;
        this.workDayArray = wArray;
    }
}