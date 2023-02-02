/* 
Questa classe contiene i check lato server
ovvero vengono controllati i dati inseriti dall'utente secondo alcuni criteri 
  - [DONE] la presenza di sabati, domeniche e festività inserite
  - [DONE] la presenza di ore in piu o in meno per un determinato giorno
  - [DONE] la presenza di specifiche incogruenti (es. trasferta e malattia) 
*/ 

import Enumerable from "linq";
import { IWorkDay, IAlert } from "./interface/MRServerInterface.js";
import { EDayType, EWorkingInfo, EError, EWarn, EInfo, EInfoGroup } from './mrEnum.js';
import { WarningInfo } from "./class/WarningInfo.js";
import { ErrorInfo } from "./class/ErrorInfo.js";
import dateHolidays from 'date-holidays';
import { mrSingleton } from "./mrSingleton.js";


    //Libreria per recuperare i giorni di festività
var holidays = new dateHolidays('IT');
let workingInfo = [EWorkingInfo.OFFICE, EWorkingInfo.SMARTWORKING, EWorkingInfo.WORK_TRIP];

// Check di validità delle attività inserite
export function checkWorkItem(workDaysArray : IWorkDay[]) : IAlert [] {

    //Array contenente errori e wanings
    let err_war : IAlert [] = [];

    //Recupero le attività già esistenti
    const lastSavedWD : IWorkDay [] = mrSingleton.getInstance().getLastSavedWD();

    //Rimuovo dall'array recuperato dal singleton gli elementi che sono stati modificati in questa richiesta
    const lastWD_NOCHANGES = Enumerable.from(lastSavedWD)
                          .where(x => !Enumerable.from(workDaysArray).any(y => y.wrkdID === x.wrkdID))
                          .toArray();

    const finalWdToCheck : IWorkDay [] = lastWD_NOCHANGES.concat(workDaysArray);

    //Array con le ore totali per ogni giorno con info lavorative
    var hoursPerDay = Enumerable.from(finalWdToCheck).where(i => workingInfo.includes(i.wrkdInfoID)).groupBy( g =>
        g.wrkdDay,
        element => element,
        function (key, h) {
            var result = {
                day: key,
                totalH: h.sum(w => w.wrkdActivityHour)
            }
            return result;
        }
    ).toArray();
   
    //#region Check warning per sabato, domenica e festivi per assegnare eventuali straordinari e permessi
    hoursPerDay.forEach(wi => {
        
        let wDate = new Date(wi.day);
        let iwdWarn = EDayType.WORK;

        let warnInfo : WarningInfo;
        let errorInfo : ErrorInfo;

        let warnAlert : IAlert;
        let errorAlert : IAlert;

        //se è un sabato, una domenica o un giorno festivo iwdWarn viene valorizzato
        iwdWarn = getDayType(wDate);

        //Se il giorno non è weekend o festivo, verifico il numero di ore salvate in modo tale da inserire straordinari o ore di permesso automaticamente
        if (iwdWarn === EDayType.WORK) {
            
            if (wi.totalH > 8) {

                let straoHours = wi.totalH - 8;

                warnInfo =  new WarningInfo(EWarn.OVERTIME_HOURS) 

                warnAlert = {

                    day : wDate, 
                    info : warnInfo, 
                    delta : ''+straoHours
                }

                err_war.push(warnAlert);   
            }
            else if (wi.totalH < 8) {

                let permHours = 8 - wi.totalH;

                warnInfo =  new WarningInfo(EWarn.PERMITS_HOURS);

                warnAlert = {
                    day: wDate, 
                    info: warnInfo, 
                    delta: ''+permHours
                };

                err_war.push(warnAlert);   
            }

        } else {

            warnInfo =  new WarningInfo(EWarn.WORK_HOLIDAYS) 

            warnAlert = {
                day: wDate, 
                info: warnInfo, 
                delta: ''
            }

            err_war.push(warnAlert);
        }

        //#region Check sulle specifiche 
        let distinctSpec = Enumerable.from(finalWdToCheck).where(i => i.wrkdDay === wi.day).select(r => r.wrkdInfoID).distinct().toArray();

        if (distinctSpec.length === 1) {

            if (distinctSpec[0] === EInfo.PERMIT) {

                errorInfo = new ErrorInfo(EError.PERMIT_ONLY);
                errorAlert = {
    
                    day: wDate, 
                    info: errorInfo, 
                    delta: ''
                }
                
                err_war.push(errorAlert); 
            }

        } else if (distinctSpec.length > 2) {
            
            errorInfo = new ErrorInfo(EError.MULTIPLE_INFO);
            errorAlert = {

                day: wDate, 
                info: errorInfo, 
                delta: ''+wDate
            }
            
            err_war.push(errorAlert); 

        } else if (distinctSpec.length === 2) {

            /*
            Check delle coppie permesse di specifiche (leggere checkList)
            smartworking - permesso
            trasferta - permesso
            ufficio - permesso
            */
            if ( 
                (distinctSpec[0] === 1 &&  distinctSpec[1] === 6)|| 
                (distinctSpec[0] === 6 &&  distinctSpec[1] === 1)|| 
                (distinctSpec[0] === 4 &&  distinctSpec[1] === 6)|| 
                (distinctSpec[0] === 6 &&  distinctSpec[1] === 4)|| 
                (distinctSpec[0] === 5 &&  distinctSpec[1] === 6)|| 
                (distinctSpec[0] === 6 &&  distinctSpec[1] === 5) 
            ) {} else {

                errorInfo = new ErrorInfo(EError.INC_INFO);

                errorAlert = {
                    day: wDate, 
                    info: errorInfo, 
                    delta: ''+wDate
                }
                
                err_war.push(errorAlert); 
            } 
        }
        //#endregion        
    });

    //verifico che per i giorni festivi segnati ci siano info compatibili
    finalWdToCheck.forEach(wi => {

        let wDate = new Date(wi.wrkdDay);
        let workDayType = getDayType(wDate);

        let errorInfo = new ErrorInfo(EError.HOLIDAYS_INC_INFO);

        let errorAlert = {
            day: wDate, 
            info: errorInfo, 
            delta: ''+wDate
        }

        if (workDayType !== EDayType.WORK && !workingInfo.includes(wi.wrkdInfoID)) {
            err_war.push(errorAlert); 
        }

    });       

    console.log(err_war);
    return err_war;
}

export function applyCorrection(iaArray : IAlert[], wdArray : IWorkDay[]) : IWorkDay[] {

    let wdCorrected : IWorkDay [] = wdArray;

    iaArray.forEach(ia => {

        if (ia.info.code === EWarn.PERMITS_HOURS) {

            const wd : IWorkDay = Enumerable.from(wdArray).firstOrDefault(x => x.wrkdDay === ia.day)!;
            
            const permitWD : IWorkDay = {

                wrkdUsrID: wd.wrkdUsrID,
                wrkdSqdID: 1,
                wrkdDay: wd.wrkdDay,
                wrkdActivity: 'PERMESSO',
                wrkdActivityHour: parseInt(ia.delta),
                wrkdActivityType: 'PERMESSO',
                wrkdCdc: '',
                wrkdInfoID: EInfo.PERMIT,
                wrkdInfoGrpID: EInfoGroup.INFO_PERMIT,
                wrkdID: 0
            }

            wdCorrected.push(permitWD);
        }
    })
    return wdCorrected;
}


//Metodo per la determinare se il dato giorno è weekend o festivo
function getDayType(date : Date) {

    if ((date.getDay() === 0 || date.getDay() === 6) && holidays.isHoliday(date)) {
        return EDayType.BOTH_WEEKEND_HOLIDAY
    } else if (date.getDay() === 0) {
        return EDayType.SUNDAY;
    } else if (date.getDay() === 6) {
        return EDayType.SATURDAY;
    } else if (holidays.isHoliday(date)) {
        return EDayType.HOLIDAY;
    } else {
        return EDayType.WORK;
    }
}