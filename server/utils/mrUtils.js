const Enumerable = require('linq'); 

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
        let satsunWarn = '';
        let straoWarn = '';

         //verifico se è un sabato o una domenica
        if (wDate.getDay() === 0 || wDate.getDay() === 6 ) {
            satsunWarn = wDate === 0 ? 'Attenzione. Il giorno inserito è una domenica' : 'Attenzione. Il giorno inserito è una sabato';
        }

        //verifica delle ore inserite in modo tale da inserire straordinari o ore di permesso
        if (wi['totalH'] > 8) {
            straoWarn = 'Attenzione. Il giorno '+wi['day']+' hai superato le 8 ore di lavoro. Verranno aggiunte come straordinari';
        }
        else if (wi['totalH'] < 8) {
            straoWarn = 'Attenzione. Il giorno '+wi['day']+' non hai raggiunto le 8 ore di lavoro. Le rimanenti verranno inserite come ore di permesso'
        }

        if (satsunWarn !== '' || straoWarn !== '') {
            err_war.push([
                wi, 
                'WARNING', 
                satsunWarn,
                straoWarn
            ]);
        }

    });

    


    console.log(hoursPerDay);
}


module.exports = {checkWorkItem};