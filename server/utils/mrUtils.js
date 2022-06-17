import Enumerable from 'linq'; 

// Check di validità delle attività inserite
export function checkWorkItem(workItems) {

    let err_war = [];

    //verifico se è un sabato o una domenica
    workItems.array.forEach(wi => {
        
        if (wi.wrkdDay.getDay() === 0 || wi.wrkdDay.getDay() === 6 ) {
            err_war.push([wi, 'WARNING', wi.wrkdDay.getDay() === 0 ? 'Attenzione. Il giorno inserito è una domenica' : 'Attenzione. Il giorno inserito è una sabato']);
        }
    });

    var hoursPerDay = Enumerable.from(workItems).groupBy(
        "$.wrkdDay",
        null,
        function (key, h) {
            var result = {
                day: key,
                totalH: h.sum("$.wrkdActivityHour")
            }
            return result;
        }).toArray();
}