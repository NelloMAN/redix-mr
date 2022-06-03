const express = require('express')
const cors = require('cors');
const mysql = require('mysql');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'redixmr2022!_',
  database: 'redix_mr'
})

app.listen(PORT, () => {
  console.log('Server listening on '+PORT);
});

app.get('/checkUsr/:email/:pwd', (req, res) => {

  connection.query("SELECT usrID FROM usr where usrEmail = '"+req.params.email+"' and usrPwd = '"+req.params.pwd+"'", (err, result) => {
    if (err) {
      console.log("ERROR CHECKUSR: "+err);
    } else {
      //console.log(result);
      res.send(result);
    }
  })
});

app.get('/getUsrMonth/:usrID', (req, res) => {

  connection.query("select usrID, usrEmail, usrName, max(month(wrkdDay)) as lastMonth from usr u left join work_day wd on wd.wrkdUsrID = u.usrID where usrID = "+req.params.usrID+" group by usrID", (err, result) => {
    if (err) {
      console.log("ERROR CHECKUSR: "+err);
    } else {
      //console.log(result);
      res.send(result);
    }
  })
});

app.get('/setTimeName', (req, res) => {

  connection.query("SET lc_time_names = 'it_IT'", (err, result) => {
    if (err) {
      console.log("ERROR setTimeName: "+err);
    } else {
      //console.log(result);
      res.send(result);
    }
  })
});

app.get('/getMonths/:usrID', (req, res) => {

  connection.query("select distinct month(wrkdDay) as monthNumb, monthname(wrkdDay) as monthName from work_day where wrkdUsrID = "+req.params.usrID+"", (err, result) => {
    if (err) {
      console.log("ERROR getMonths: "+err);
    } else {
      //console.log(result);
      res.send(result);
    }
  })


  app.get('/getUsrWrkDay/:usrID/:month', (req, res) => {

    let query = 'select wrkdID, date_format(wrkdDay, "%Y-%m-%d") as wrkdDay, wrkdSpecsID, wrkdUsrID, wrkdActivity, wrkdActivityType, wrkdActivityHour, sqdName, wrkdCdc from work_day w inner join squad s on s.sqdID = w.wrkdSqdID where wrkdUsrID = '+req.params.usrID+' and month(wrkdDay) = '+req.params.month+' order by wrkdDay asc';

    console.log('getUsrWrkDay --> '+query);                

    connection.query(query, (err, result) => {
      if (err) {
        console.log("ERROR getMonths: "+err);
      } else {

        let processedDate = new Map();

        result.forEach(row => {

          if (!processedDate.has(row['wrkdDay'])) {

            let dayTable = [];
            dayTable.push(row);

            processedDate.set(row['wrkdDay'], dayTable);
          } else {

            let tempArray = processedDate.get(row['wrkdDay']);
            tempArray.push(row);
            processedDate.set(row['wrkdDay'], tempArray);
          }

        });

        const jsonData = [...processedDate];

        res.send(jsonData);
      }
    })
  })

});