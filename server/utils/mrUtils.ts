/* 
Questa classe contiene i check lato server
ovvero vengono controllati i dati inseriti dall'utente secondo alcuni criteri 
  - la presenza di sabati, domeniche e festività inserite
  - la presenza di ore in piu o in meno per un determinato giorno
  - la presenza di specifiche incogruenti (es. trasferta e malattia) 
*/ 

import Enumerable from "linq";
import { Alert } from "./class/Alert";
import { WorkDay, DateWorkDay } from "./class/MRServerInterface";
import {DayType, WorkingInfo, ErrorType, WarnType} from './mrEnum';

var Holidays = require('date-holidays');     //Libreria per recuperare i giorni di festività
var holidays = new Holidays('IT');

let workingInfo = [WorkingInfo.OFFICE, WorkingInfo.SMARTWORKING, WorkingInfo.WORK_TRIP];

// Check di validità delle attività inserite
export function checkWorkItem(dateWorkDayItems : WorkDay[]) {

    //Array contenente errori e wanings
    let err_war : Alert [] = [];

    //Array con le ore totali per ogni giorno con info lavorative
    var hoursPerDay = Enumerable.from(dateWorkDayItems).where(i => workingInfo.includes(i.wrkdInfoID)).groupBy( g =>
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
        
        let wDate = new Date(wi['day']);
        let iwdWarn = DayType.WORK;
        let straoWarn = '';
        let straoHours = 0;
        let permHours = 0;

        //se è un sabato, una domenica o un giorno festivo iwdWarn viene valorizzato
        iwdWarn = getDayType(wDate);

        //Se il giorno non è weekend o festivo, verifico il numero di ore salvate in modo tale da inserire straordinari o ore di permesso automaticamente
        if (iwdWarn === DayType.WORK) {
            
            if (wi['totalH'] > 8) {

                straoWarn = 'Il giorno '+wi['day']+' hai superato le 8 ore di lavoro. Verranno aggiunte come straordinari';
                straoHours = wi['totalH'] - 8;

                err_war.push([
                    wi, 
                    'WARNING', 
                    mrEnum.WarnType.OVERTIME_HOURS,
                    straoWarn,
                    straoHours
                ]);   
            }
            else if (wi['totalH'] < 8) {

                straoWarn = 'Il giorno '+wi['day']+' non hai raggiunto le 8 ore di lavoro. Le rimanenti verranno inserite come ore di permesso'
                permHours = 8 - wi['totalH'];

                err_war.push([
                    wi, 
                    'WARNING', 
                    mrEnum.WarnType.PERMITS_HOURS,
                    straoWarn,
                    permHours
                ]);   
            }

        } else {

            err_war.push([
                wi, 
                'WARNING', 
                WarnType.WORK_HOLIDAYS,
                'Il giorno '+wi['day']+' è festivo. Le ore per questo giorno verranno inserite come straordinari',
                wDate
            ]);       
        }

        //#region Check sulle specifiche 
        const unique = (value, index, self) => {
            return self.indexOf(value) === index
        }
        let specs = Enumerable.from(dateWorkDayItems).where(i => i["wrkdDay"] === wi['day']).select(r => r['wrkdInfoID']).toArray();
        let distinctSpec = specs.filter(unique);


        if (distinctSpec.length > 2) {
            
            err_war.push([
                wi, 
                'ERROR', 
                ErrorType.MULTIPLE_INFO,
                'Aggiunte troppe specifiche per un singolo giorno',
                wDate
            ]); 

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

                err_war.push([
                    wi, 
                    'ERROR', 
                    ErrorType.INC_INFO,
                    'Per il giorno '+wi['day']+' sono state aggiunte delle info incompatibili',
                    wi['day']
                ]); 
            } 
        }
        //#endregion        
    });

    //verifico che per i giorni festivi segnati ci siano info compatibili
    dateWorkDayItems.forEach(wi => {

        let wDate = new Date(wi['wrkdDay']);
        let workDayType = getDayType(wDate);

        if (workDayType !== DayType.WORK && !workingInfo.includes(wi['specs'])) {
            err_war.push([
                wi, 
                'ERROR', 
                ErrorType.HOLIDAYS_INC_INFO,
                'Le info inserite per il giorno '+wi['wrkdDay']+' non sono compatibili in quanto giorni festivo',
                wi['day']
            ]); 
        }

    });       

    console.log(err_war);
    return err_war;
}


//Metodo per la determinare se il dato giorno è weekend o festivo
function getDayType(date) {

    if ((date.getDay(0) || date.getDay(6)) && holidays.isHoliday(date)) {
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

module.exports = {checkWorkItem};