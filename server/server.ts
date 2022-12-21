import express, { Express, NextFunction, Request, Response } from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import * as mrSqlConnector from "./utils/mysql_utils/mysql.connector.js"
import * as mrController from "./utils/mrController.js";

const PORT = process.env.PORT || 3001;

const app: Express = express();

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

mrSqlConnector.init()

app.listen(PORT, () => {
  console.log('Server listening on ' + PORT);
});


// checkUsr: verifica dell'esistenza dell'utente
app.get('/checkUsr/:email/:pwd', (req: Request, res: Response, n: NextFunction) => {
  mrController.getUserInfo( req, res, n);
});

// getUsrWrkDay: recupero le attività dell'utente per il mese selezionato nel componente MonthComboBox
app.get('/getUsrWrkDay/:usrID/:month', (req: Request, res: Response, n:NextFunction) => {
  mrController.getUserWorkDay( req, res, n);
})

// getUsrMonth: recupero i mesi in cui l'utente ha registrato delle attività
app.get('/getUsrMonth/:usrID', (req: Request, res: Response) => {

  // pool.query("select usrID, usrEmail, usrName, max(month(wrkdDay)) as lastMonth from usr u left join work_day wd on wd.wrkdUsrID = u.usrID where usrID = " + req.params.usrID + " group by usrID", (err, result) => {
  //   if (err) {
  //     console.log("ERROR CHECKUSR: " + err);
  //   } else {
  //     //console.log(result);
  //     res.send(result);
  //   }
  // })
});

// setTimeName: setto le impostazioni delle date del db in italiano (per avere il nome del mese)
app.get('/setTimeName', (req: Request, res: Response) => {

  // pool.query("SET lc_time_names = 'it_IT'", (err, result) => {
  //   if (err) {
  //     console.log("ERROR setTimeName: " + err);
  //   } else {
  //     //console.log(result);
  //     res.send(result);
  //   }
  // })
});

// getMonth: recupero i mesi in cui l'utente ha registrato delle attività per il componente MonthComboBox
app.get('/getMonths/:usrID', (req: Request, res: Response) => {

  // pool.query("select distinct month(wrkdDay) as monthNumb, monthname(wrkdDay) as monthName from work_day where wrkdUsrID = " + req.params.usrID + "", (err, result) => {
  //   if (err) {
  //     console.log("ERROR getMonths: " + err);
  //   } else {
  //     //console.log(result);
  //     res.send(result);
  //   }
  // })
});



// console.log('getUsrWrkDay --> '+query);

// pool.query<IWorkDay>(query, (err:QueryError, result:WorkDay[]) => {
//   if (err) {
//     console.log("ERROR getMonths: "+err);
//   } else {

//     let processedDate = new Map();

//     result.forEach( (row: { [x: string]: any; }) => {

//       if (!processedDate.has(row['wrkdDay'])) {

//         let dayTable = [];
//         dayTable.push(row);

//         processedDate.set(row['wrkdDay'], dayTable);
//       } else {

//         let tempArray = processedDate.get(row['wrkdDay']);
//         tempArray.push(row);
//         processedDate.set(row['wrkdDay'], tempArray);
//       }

//     });

//     const jsonData = [...processedDate];

//     res.send(jsonData);

// getSquad: recupero tutte le squad per il componente SquadCell
app.get('/getSquad', (req: Request, res: Response) => {

  // pool.query("select sqdID, sqdName from squad", (err, result) => {
  //   if (err) {
  //     console.log("ERROR getSquad: " + err);
  //   } else {
  //     //console.log(result);
  //     res.send(result);
  //   }
  // }
  // )
});

// insertWorkDays: inserimento nuove righe
app.post('/insertWorkDays', (req: Request, res: Response) => {

  // let query = 'insert into work_day (wrkdUsrID, wrkdDay, wrkdInfoID, wrkdActivity, wrkdActivityType, wrkdActivityHour, wrkdSqdID, wrkdCdc) values ?'
  // let values = [];
  // let data : WorkDay [] = req.body.data.newWorkDays

  // let err_war = checkWorkItem(data);

  // if (err_war.length > 0) {

  //   let toJson = 
  //   {
  //     typo:'err_war',
  //     errWar:err_war
  //   }

  //   res.send(JSON.stringify(toJson));

  // } else {

  //   Array.from(data).forEach( wd => {

  //     values.push ([
  //       wd.wrkdUsrID, wd.wrkdDay, wd.wrkdInfoID, wd.wrkdActivity, wd.wrkdActivityType, wd.wrkdActivityHour, wd.wrkdSqdID, wd.wrkdCdc
  //     ]);
  //   });

  //   console.log(values);

  // pool.query(query, [values], function (err, result) {
  //   if (err) throw err;
  //   console.log("Number of records inserted: " + result.affectedRows);
  // });

}

);


