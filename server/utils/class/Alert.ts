import { InfoSignal } from "../mrEnum";
import { WorkDay } from "./MRServerInterface";

export class Alert {

    workDay : WorkDay;
    infoSignal : InfoSignal;
    delta : string

    constructor(
        public wd : WorkDay, 
        public is: InfoSignal,
        public d: string
    )
    {
        this.workDay = wd;
        this.infoSignal = is;
        this.delta = d
    }
}