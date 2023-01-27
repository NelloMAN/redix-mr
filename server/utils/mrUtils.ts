/* 
Questa classe contiene i check lato server
ovvero vengono controllati i dati inseriti dall'utente secondo alcuni criteri 
  - la presenza di sabati, domeniche e festività inserite
  - la presenza di ore in piu o in meno per un determinato giorno
  - la presenza di specifiche incogruenti (es. trasferta e malattia) 
*/ 

import Enumerable from "linq";
import { Alert } from "./class/Alert.js";
import { IWorkDay, IAlert } from "./interface/MRServerInterface.js";
import { DayType, WorkingInfo, ErrorEnum, WarnEnum } from './mrEnum.js';
import { WarningInfo } from "./class/WarningInfo.js";
import { ErrorInfo } from "./class/ErrorInfo.js";
import dateHolidays from 'date-holidays';


    //Libreria per recuperare i giorni di festività
var holidays = new dateHolidays('IT');

let workingInfo = [WorkingInfo.OFFICE, WorkingInfo.SMARTWORKING, WorkingInfo.WORK_TRIP];

// Check di validità delle attività inserite
export function checkWorkItem(workDaysArray : IWorkDay[]) : IAlert [] {

    //Array contenente errori e wanings
    let err_war : IAlert [] = [];

    //Array con le ore totali per ogni giorno con info lavorative
    var hoursPerDay = Enumerable.from(workDaysArray).where(i => workingInfo.includes(i.wrkdInfoID)).groupBy( g =>
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
        let iwdWarn = DayType.WORK;

        let warnInfo : WarningInfo;
        let errorInfo : ErrorInfo;

        let warnAlert : IAlert;
        let errorAlert : IAlert;

        //se è un sabato, una domenica o un giorno festivo iwdWarn viene valorizzato
        iwdWarn = getDayType(wDate);

        //Se il giorno non è weekend o festivo, verifico il numero di ore salvate in modo tale da inserire straordinari o ore di permesso automaticamente
        if (iwdWarn === DayType.WORK) {
            
            if (wi.totalH > 8) {

                let straoHours = wi.totalH - 8;

                warnInfo =  new WarningInfo(WarnEnum.OVERTIME_HOURS) 

                warnAlert = {

                    day : wDate, 
                    info : warnInfo, 
                    delta : ''+straoHours
                }

                err_war.push(warnAlert);   
            }
            else if (wi.totalH < 8) {

                let permHours = 8 - wi.totalH;

                warnInfo =  new WarningInfo(WarnEnum.PERMITS_HOURS);

                warnAlert = {
                    day: wDate, 
                    info: warnInfo, 
                    delta: ''+permHours
                };

                err_war.push(warnAlert);   
            }

        } else {

            warnInfo =  new WarningInfo(WarnEnum.WORK_HOLIDAYS) 

            warnAlert = {
                day: wDate, 
                info: warnInfo, 
                delta: ''
            }

            err_war.push(warnAlert);
               
        }

        //#region Check sulle specifiche 
        // const unique = (value, index, self) => {
        //     return self.indexOf(value) === index
        // }
        let distinctSpec = Enumerable.from(workDaysArray).where(i => i.wrkdDay === wi.day).select(r => r.wrkdInfoID).distinct().toArray();
        // let distinctSpec = infos.filter(unique);


        if (distinctSpec.length > 2) {
            
            errorInfo = new ErrorInfo(ErrorEnum.MULTIPLE_INFO);
            errorAlert = {

                day: wDate, 
                info: errorInfo, 
                delta: ''+wDate
            }
            
            err_war.push(errorAlert); 

        } else if (distinctSpec.length === 2) {

            //Check delle coppie permesse di specifiche (leggere checkList)
            if ( 
                (distinctSpec[0] === 1 &&  distinctSpec[1] === 6)|| 
                (distinctSpec[0] === 6 &&  distinctSpec[1] === 1)|| 
                (distinctSpec[0] === 4 &&  distinctSpec[1] === 6)|| 
                (distinctSpec[0] === 6 &&  distinctSpec[1] === 4)|| 
                (distinctSpec[0] === 5 &&  distinctSpec[1] === 6)|| 
                (distinctSpec[0] === 6 &&  distinctSpec[1] === 5) 
            ) {} else {

                errorInfo = new ErrorInfo(ErrorEnum.INC_INFO);

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
    workDaysArray.forEach(wi => {

        let wDate = new Date(wi.wrkdDay);
        let workDayType = getDayType(wDate);

        let errorInfo = new ErrorInfo(ErrorEnum.HOLIDAYS_INC_INFO);

        let errorAlert = {
            day: wDate, 
            info: errorInfo, 
            delta: ''+wDate
        }

        if (workDayType !== DayType.WORK && !workingInfo.includes(wi.wrkdInfoID)) {
            err_war.push(errorAlert); 
        }

    });       

    console.log(err_war);
    return err_war;
}


//Metodo per la determinare se il dato giorno è weekend o festivo
function getDayType(date : Date) {

    if ((date.getDay() === 0 || date.getDay() === 6) && holidays.isHoliday(date)) {
        return DayType.BOTH_WEEKEND_HOLIDAY
    } else if (date.getDay() === 0) {
        return DayType.SUNDAY;
    } else if (date.getDay() === 6) {
        return DayType.SATURDAY;
    } else if (holidays.isHoliday(date)) {
        return DayType.HOLIDAY;
    } else {
        return DayType.WORK;
    }
}