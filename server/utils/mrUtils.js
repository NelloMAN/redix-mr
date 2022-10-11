/* 
Questa classe contiene i check lato server
ovvero vengono controllati i dati inseriti dall'utente secondo alcuni criteri 
  - la presenza di sabati, domeniche e festività inserite
  - la presenza di ore in piu o in meno per un determinato giorno
  - la presenza di specifiche incogruenti (es. trasferta e malattia) 
*/ 


const Enumerable = require('linq');         //Libreria Linq
var Holidays = require('date-holidays');     //Libreria per recuperare i giorni di festività

var holidays = new Holidays('IT');

const ErrorType = {
    MULTIPLE_INFO:0,    //numero di specifiche per un singolo giorno maggiore di 2
    INCOMPATIBLE_INFO:1 //coppia di specifiche incompatibili
}

const WarnType = {

    WORK_HOLIDAYS:0,
    OVERTIME_HOURS:1,
    PERMITS_HOURS:2
}

// Check di validità delle attività inserite
function checkWorkItem(workItems) {

    //Array contenente errori e wanings
    let err_war = [];

    //Array con le ore totali per ogni giorno
    var hoursPerDay = Enumerable.from(workItems).groupBy(
        "$.wrkdDay",
        null,
        function (key, h) {
            var result = {
                day: key,
                totalH: h.sum("$.wrkdActivityHour")
            }
            return result;
        }
    ).toArray();

    //Distinct delle date inserite
    var insertedDate = Enumerable.from(workItems).distinct("$.wrkdDay").select("$.wrkdDay").toArray();
   
    //#region Check warning per sabato, domenica e festivi per assegnare eventuali straordinari e permessi
    hoursPerDay.forEach(wi => {
        
        let wDate = new Date(wi['day']);
        let iwdWarn = '';
        let straoWarn = '';
        let straoHours = 0;
        let permHours = 0;

        //verifico se è un sabato, una domenica o un giorno festivo
        iwdWarn = isWorkDay(wDate);

        //Se il giorno non è weekend o festivo, verifico il numero di ore salvate in modo tale da inserire straordinari o ore di permesso automaticamente
        if (iwdWarn === '') {
            
            if (wi['totalH'] > 8) {

                straoWarn = 'Attenzione. Il giorno '+wi['day']+' hai superato le 8 ore di lavoro. Verranno aggiunte come straordinari';
                straoHours = wi['totalH'] - 8;

                err_war.push([
                    wi, 
                    'WARNING', 
                    WarnType.OVERTIME_HOURS,
                    straoWarn,
                    straoHours
                ]);   
            }
            else if (wi['totalH'] < 8) {

                straoWarn = 'Attenzione. Il giorno '+wi['day']+' non hai raggiunto le 8 ore di lavoro. Le rimanenti verranno inserite come ore di permesso'
                permHours = 8 - wi['totalH'];

                err_war.push([
                    wi, 
                    'WARNING', 
                    WarnType.PERMITS_HOURS,
                    straoWarn,
                    permHours
                ]);   
            }

        } else {

            err_war.push([
                wi, 
                'WARNING', 
                WarnType.WORK_HOLIDAYS,
                iwdWarn,
                wDate
            ]);       
        }

        //#region Check sulle specifiche 
        const unique = (value, index, self) => {
            return self.indexOf(value) === index
        }
        let specs = Enumerable.from(workItems).where(i => i["wrkdDay"] === wi['day']).select(r => r['wrkdSpecsID']).toArray();
        let distinctSpec = specs.filter(unique);


        if (distinctSpec.length > 2) {
            
            err_war.push([
                wi, 
                'ERROR', 
                ErrorType.MULTIPLE_INFO,
                'Attenzione, aggiunte troppe specifiche per un singolo giorno',
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
                    ErrorType.INCOMPATIBLE_INFO,
                    'Attenzione, per il giorno '+wi['day']+' sono state aggiunte delle specifiche incompatibili',
                    wi['day']
                ]); 
            } 
        }
        //#endregion        

    });

    console.log(err_war);
    return err_war;
}


//Metodo per la verifica dei giorni weekend e festivi
function isWorkDay(date) {

    let message = '';

    if (date.getDay() === 0 || date.getDay() === 6 ) {
        message = date === 0 ? 'Attenzione. Il giorno inserito è una domenica' : 'Attenzione. Il giorno inserito è una sabato';
    }

    if (holidays.isHoliday(date)) {
        message = 'Attenzione. Il giorno inserito è festivo. Le ore per questo giorno verranno inserite come straordinari';
    }

    return message;
}

module.exports = {checkWorkItem};