import {IInfo} from "../interface/MRServerInterface";

export class Alert {

    day : Date;
    info : IInfo;
    delta : string

    constructor(
        public wd : Date, 
        public i: IInfo,
        public d: string
    )
    {
        this.day = wd;
        this.info = i;
        this.delta = d
    }
}