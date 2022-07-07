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

    //verifico se è un sabato o una domenica
    hoursPerDay.forEach(wi => {
        
        let wDate = new Date(wi[0]);

        if (wDate.getDay() === 0 || wDate.getDay() === 6 ) {

            err_war.push([
                wi, 
                'WARNING', 
                wDate === 0 ? 'Attenzione. Il giorno inserito è una domenica' : 'Attenzione. Il giorno inserito è una sabato'
            ]);
        }
    });

    //verifica delle ore inserite in modo tale da inserire straordinari o ore di permesso


    console.log(hoursPerDay);
}


module.exports = {checkWorkItem};