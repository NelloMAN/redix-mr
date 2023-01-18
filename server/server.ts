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
  mrController.getUsrInfo( req, res, n);
});

// getUsrWrkDay: recupero le attività dell'utente per il mese selezionato nel componente MonthComboBox
app.get('/getUsrWrkDay/:usrID/:month', (req: Request, res: Response, n:NextFunction) => {
  mrController.getUsrWorkDay( req, res, n);
})

// setTimeName: setto le impostazioni delle date del db in italiano (per avere il nome del mese)
app.get('/setTimeName', (req: Request, res: Response, n : NextFunction) => {
  mrController.setTimeName(req, res, n);
});

// getMonth: recupero i mesi in cui l'utente ha registrato delle attività per il componente MonthComboBox
app.get('/getUsrMonths/:usrID', (req: Request, res: Response, n : NextFunction) => {
  mrController.getUsrMonth(req, res, n);
});

// getSquad: recupero tutte le squad per il componente SquadCell
app.get('/getSquad', (req: Request, res: Response, n : NextFunction) => {
  mrController.getSquad( req, res, n);
});

// saveWorkDays: inserimento nuove righe
app.post('/saveWorkDays', (req: Request, res: Response) => {

  let newWorkDays = req.body.newWorkDays;
  let changeWorkDays = req.body.changeWorkDays;
  let deletedWorkDaysID = req.body.changeWorkDays



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


