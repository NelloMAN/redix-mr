import { WarnEnum } from "../mrEnum.js";
import { Info } from "../interface/MRServerInterface.js";

export class WarningInfo implements Info {

    type: string = 'W';
    public code: number;
    public message: string;

    constructor(c:WarnEnum) {

        this.code = c;

        switch(this.code) {
            case WarnEnum.OVERTIME_HOURS:
                this.message = 'Hai superato le 8 ore di lavoro. Verranno aggiunte come straordinari';
                break;
            case WarnEnum.PERMITS_HOURS:
                this.message = 'Non hai raggiunto le 8 ore di lavoro. Le rimanenti verranno inserite come ore di permesso';
                break;
            case WarnEnum.WORK_HOLIDAYS:
                this.message = 'Giorno festivo. Le ore per questo giorno verranno inserite come straordinari';
                break;
            default:
                this.message = 'Warning non gestito';
                break;
        }
    }
}