import { EError } from "../mrEnum.js";
import { IInfo } from "../interface/MRServerInterface.js";

export class ErrorInfo implements IInfo {

    type: string = 'E';
    public code: number;
    public message: string;

    constructor(c:EError) {

        this.code = c;

        switch(this.code) {
            case EError.HOLIDAYS_INC_INFO:
                this.message = 'Le info non sono compatibili in quanto sono state inserite per un giorno festivo';
                break;
            case EError.INC_INFO:
                this.message = 'Sono state aggiunte delle info incompatibili';
                break;
            case EError.MULTIPLE_INFO:
                this.message = 'Aggiunte troppe specifiche per un singolo giorno';
                break;
            case EError.EIGHT_HOUR_PERMIT:
                this.message = 'Le ore di permesso per un giorno non possono essere uguali o maggiori a 8';
                break;
            case EError.PERMIT_AND_WORK_OVER_EIGHT:
                this.message = 'La somma delle ore tra permesso e lavoro non può essere maggiore di 8';
                break;
            case EError.PERMIT_ONLY:
                this.message = 'Non è possibile inserire solo un permesso per un intero giorno';
            default:
                this.message = 'Warning non gestito';
                break;
        }
    }
}