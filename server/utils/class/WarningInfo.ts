import { EWarn } from "../mrEnum.js";
import { IInfo } from "../interface/MRServerInterface.js";

export class WarningInfo implements IInfo {

    type: string = 'W';
    public code: number;
    public message: string;

    constructor(c:EWarn) {

        this.code = c;

        switch(this.code) {
            case EWarn.OVERTIME_HOURS:
                this.message = 'Hai superato le 8 ore di lavoro. Verranno aggiunte come straordinari';
                break;
            case EWarn.PERMITS_HOURS:
                this.message = 'Non hai raggiunto le 8 ore di lavoro. Le rimanenti verranno inserite come ore di permesso';
                break;
            case EWarn.WORK_HOLIDAYS:
                this.message = 'Giorno festivo. Le ore per questo giorno verranno inserite come straordinari';
                break;
            default:
                this.message = 'Warning non gestito';
                break;
        }
    }
}