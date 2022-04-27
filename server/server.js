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
  user: 'dbuser',
  password: 's3kreee7',
  database: 'my_db'
})

connection.connect()

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get('/checkUsr/:email/:pwd', (req, res) => {

  console.log('email: '+req.params.email+' - pwd: '+req.params.pwd);

  connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err
  
    //console.log('The solution is: ', rows[0].solution)
  });

  res.send('da qui chiami il db');
});

connection.end();