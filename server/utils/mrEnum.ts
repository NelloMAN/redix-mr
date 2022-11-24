export enum DayType {
    WORK = 0,                 //giorno feriale
    SATURDAY = 1,             //sabato
    SUNDAY = 2,               //domenica
    HOLIDAY = 3,              //giorno festivo
    BOTH_WEEKEND_HOLIDAY = 4  //sabato o domenica e festivo
}

export enum WorkingInfo {

    OFFICE = 1,
    WORK_TRIP = 4,
    SMARTWORKING = 5
}

export enum ErrorEnum {
    MULTIPLE_INFO = 0,        //numero di specifiche per un singolo giorno maggiore di 2
    INC_INFO = 1,             //coppia di specifiche incompatibili
    HOLIDAYS_INC_INFO = 2     //info non compatibili per i giorni festivi
}

export enum WarnEnum {

    WORK_HOLIDAYS = 0,    //warning giorno feriale
    OVERTIME_HOURS = 1,   //warning ore di straordinari
    PERMITS_HOURS = 2     //warning ore di permesso
}