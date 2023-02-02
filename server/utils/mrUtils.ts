/* 
Questa classe contiene i check lato server
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

    /*
    Non è necessario verificare ogni volta i wd esistenti, ma basta 
    controllare quelli con date uguale a nuovi record inseriti quindi
    recupero dalla lista singleton quelli che hanno stessa data di 
    nuovi record inseriti
    */
    const lastSavedWDToCheck : IWorkDay[] = Enumerable.from(lastSavedWD)
                                            .where(l => Enumerable.from(workDaysArray).any(n => n.wrkdDay === l.wrkdDay))
                                            .toArray()


    const finalWdToCheck : IWorkDay [] = lastSavedWDToCheck.concat(workDaysArray);

    //Array con le ore totali per ogni giorno
    var hoursPerDay : {day:Date, totalH: number} [] = Enumerable.from(finalWdToCheck).groupBy( g =>
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

                warnAlert = {

                    day : wDate, 
                    info : new WarningInfo(EWarn.OVERTIME_HOURS) , 
                    delta : ''+straoHours
                }

                err_war.push(warnAlert);   
            }
            else if (wi.totalH < 8) {

                let permHours = 8 - wi.totalH;
                
                warnAlert = {
                    day: wDate, 
                    info: new WarningInfo(EWarn.PERMITS_HOURS), 
                    delta: ''+permHours
                };

                err_war.push(warnAlert);   
            }

        } else {

            warnAlert = {
                day: wDate, 
                info: new WarningInfo(EWarn.WORK_HOLIDAYS), 
                delta: ''
            }

            err_war.push(warnAlert);
        }

        //#region Check sulle specifiche 

        
        //Recupero le info di ogni giorno
        let distinctSpec : EInfo [] = Enumerable.from(finalWdToCheck).where(i => i.wrkdDay === wi.day).select(r => r.wrkdInfoID).distinct().toArray();

        if (distinctSpec.length === 1) {

            //Non può esistere una sola info di tipo PERMESSO per un giorno
            if (distinctSpec[0] === EInfo.PERMIT) {

                errorAlert = {
    
                    day: wDate, 
                    info: new ErrorInfo(EError.PERMIT_ONLY), 
                    delta: ''
                }
                
                err_war.push(errorAlert); 
            }

        } else if (distinctSpec.length > 2) {

            //Non ci possono essere più di 2 info per uno stesso giorno
            errorAlert = {

                day: wDate, 
                info: new ErrorInfo(EError.MULTIPLE_INFO), 
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

                errorAlert = {
                    day: wDate, 
                    info: new ErrorInfo(EError.INC_INFO), 
                    delta: ''+wDate
                }
                
                err_war.push(errorAlert); 
            } 
        }

        //Recupero le info con le relative ore per il giorno che sto processando
        var infoHours : {info: number, totalH: number} [] = Enumerable.from(finalWdToCheck).where(i => i.wrkdDay === wi.day).groupBy( g =>
            g.wrkdInfoID,
            element => element,
            function (key, h) {
                var result = {
                    info: key,
                    totalH: h.sum(w => w.wrkdActivityHour)
                }
                return result;
            }
        ).toArray();

        //Verifico che, per i giorni per i quali è stato inserito un permesso, il totale delle ore non superi le 8 ore
        if (infoHours.some(ih => ih.info === EInfo.PERMIT) && Enumerable.from(infoHours).sum(ih => ih.totalH) > 8) {

            errorAlert = {
                day: wDate, 
                info: new ErrorInfo(EError.PERMIT_AND_WORK_OVER_EIGHT), 
                delta: ''
            }
            
            err_war.push(errorAlert); 
        }

        //#endregion        
    });

    //verifico che per i giorni festivi segnati ci siano info compatibili
    finalWdToCheck.forEach(wi => {

        let wDate = new Date(wi.wrkdDay);
        let workDayType = getDayType(wDate);

        let errorAlert = {
            day: wDate, 
            info: new ErrorInfo(EError.HOLIDAYS_INC_INFO), 
            delta: ''+wDate
        }

        if (workDayType !== EDayType.WORK && !workingInfo.includes(wi.wrkdInfoID)) {
            err_war.push(errorAlert); 
        }

    });       

    console.log(err_war);
    return err_war;
}

//Applicazione delle correzioni
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