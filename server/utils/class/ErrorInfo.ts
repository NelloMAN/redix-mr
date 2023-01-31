import { ErrorEnum } from "../mrEnum.js";
import { IInfo } from "../interface/MRServerInterface.js";

export class ErrorInfo implements IInfo {

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
            case ErrorEnum.EIGHT_HOUR_PERMIT:
                this.message = 'Le ore di permesso per un giorno non possono essere uguali o maggiori a 8';
                break;
            case ErrorEnum.PERMIT_AND_WORK_OVER_EIGHT:
                this.message = 'la somma delle ore tra permesso e lavoro non può essere maggiore di 8';
                break;
            default:
                this.message = 'Warning non gestito';
                break;
        }
    }
}