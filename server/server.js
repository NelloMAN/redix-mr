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

// function CheckUsr(email, pwd){
  
//   await connection.query("SELECT * FROM usr where usrEmail = '"+email+"' and usrPwd = '"+pwd+"'",(err, data) => {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     // rows fetch
//     console.log(JSON.stringify(data));
//     return JSON.stringify(data);
//   });
// }


// CheckUsr = (email, pwd) =>{
//   return new Promise((resolve, reject)=>{
//       connection.query("SELECT * FROM usr where usrEmail = '"+email+"' and usrPwd = '"+pwd+"'",  (error, elements, fields)=>{
//           if(error){
//               return reject(error);
//           }
//           return elements;
//       });
//   });
// };