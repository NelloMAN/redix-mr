const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('combined'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'redixmr2022!_',
  database: 'redix_mr'
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get('/checkUsr/:email/:pwd', (req, res) => {

  console.log('email: '+req.params.email+' - pwd: '+req.params.pwd);

  await connection.connect(function(err) {
    if (err) throw err;
    connection.query("SELECT * FROM usr where usrEmail = '"+req.params.email+"' and usrPwd = '"+req.params.pwd+"'", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });

  connection.end();
});