const Enumerable = require('linq');         //Libreria Linq
var Holidays = require('date-holidays');     //Libreria per recuperare i giorni di festività
const { Hd } = require('@material-ui/icons');

var holidays = new Holidays();
holidays.getCountries('IT');

const WarnType = {

    WORK_HOLIDAYS:0,
    OVERTIME_HOURS:1,
    PERMITS_HOURS:2
}

// Check di validità delle attività inserite
function checkWorkItem(workItems) {

    let err_war = [];

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

   
    hoursPerDay.forEach(wi => {
        
        let wDate = new Date(wi['day']);
        let iwdWarn = '';
        let straoWarn = '';

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

    });

    console.log(err_war);
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