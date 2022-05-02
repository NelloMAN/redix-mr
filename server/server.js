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

const connection = mysql.createPool({
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

  const result = CheckUsr(req.params.email, req.params.pwd);

  console.log('result: '+result);
  res.status(200).json({elements: result});
});



CheckUsr = (email, pwd) =>{
  return new Promise((resolve, reject)=>{
      connection.query("SELECT * FROM usr where usrEmail = '"+email+"' and usrPwd = '"+pwd+"'",  (error, elements)=>{
          if(error){
              return reject(error);
          }
          return resolve(elements);
      });
  });
};