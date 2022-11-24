import { ErrorEnum } from "../mrEnum";
import { Info } from "../interface/MRServerInterface";

export class ErrorInfo implements Info {

    type: string = 'E';
    public code: number;
    public message: string;

    constructor(c:ErrorEnum) {

        this.code = c;

        switch(this.code) {
            case ErrorEnum.HOLIDAYS_INC_INFO:
                this.message = 'Le info non sono compatibili in quanto sono state inserite per un giorno festivo';
                break;
            case ErrorEnum.INC_INFO:
                this.message = 'Sono state aggiunte delle info incompatibili';
                break;
            case ErrorEnum.MULTIPLE_INFO:
                this.message = 'Aggiunte troppe specifiche per un singolo giorno';
                break;
            default:
                this.message = 'Warning non gestito';
                break;
        }
    }
}