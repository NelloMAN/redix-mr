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

  connection.query("SELECT * FROM usr where usrEmail = '"+req.params.email+"' and usrPwd = '"+req.params.pwd+"'", (err, result) => {
    if (err) {
      console.log("ERROR CHECKUSR: "+err);
    } else {
      console.log(result);
      res.send(result);
    }
  })
});

app.get('/setTimeName', (req, res) => {

  connection.query("SET lc_time_names = 'it_IT'", (err, result) => {
    if (err) {
      console.log("ERROR setTimeName: "+err);
    } else {
      console.log(result);
      res.send(result);
    }
  })
});

app.get('/getMonths/:usrID', (req, res) => {

  connection.query("select distinct monthname(wrkdDay) as monthName from work_day where wrkdUsrID = "+req.params.usrID+"", (err, result) => {
    if (err) {
      console.log("ERROR getMonths: "+err);
    } else {
      console.log(result);
      res.send(result);
    }
  })
});