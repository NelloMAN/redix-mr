export enum EDayType {
    WORK = 0,                 //giorno feriale
    SATURDAY = 1,             //sabato
    SUNDAY = 2,               //domenica
    HOLIDAY = 3,              //giorno festivo
    BOTH_WEEKEND_HOLIDAY = 4  //sabato o domenica e festivo
}

export enum EInfo {

    OFFICE = 1,
    SICKNESS = 2,
    HOLIDAY = 3,
    WORK_TRIP = 4,
    SMARTWORKING = 5,
    PERMIT = 6
}

export enum EInfoGroup {

    INFO_WORK = 1,
    INFO_NOT_WORK = 2,
    INFO_PERMIT = 3
}

export enum EWorkingInfo {

    OFFICE = 1,
    WORK_TRIP = 4,
    SMARTWORKING = 5
}

export enum EError {

    MULTIPLE_INFO = 0,              //numero di specifiche per un singolo giorno maggiore di 2
    INC_INFO = 1,                   //coppia di specifiche incompatibili
    HOLIDAYS_INC_INFO = 2,          //info non compatibili per i giorni festivi
    EIGHT_HOUR_PERMIT = 3,          //aggiunto un permesso di 8 ore
    PERMIT_AND_WORK_OVER_EIGHT = 4, //la somma tra permessi e ore supera le 8 ore
    PERMIT_ONLY = 5                 //é stato inserito solo una info di permesso per un intero giorno                 
}

export enum EWarn {

    WORK_HOLIDAYS = 0,    //warning giorno feriale
    OVERTIME_HOURS = 1,   //warning ore di straordinari
    PERMITS_HOURS = 2     //warning ore di permesso
}