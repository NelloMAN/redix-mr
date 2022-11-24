import { Info } from "../mrEnum";
import { WorkDay } from "../interface/MRServerInterface";

export class Alert {

    day : Date;
    info : Info;
    delta : string

    constructor(
        public wd : Date, 
        public i: Info,
        public d: string
    )
    {
        this.day = wd;
        this.info = i;
        this.delta = d
    }
}