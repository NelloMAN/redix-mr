import express, { Express, NextFunction, Request, Response } from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import * as mrSqlConnector from "./utils/mysql_utils/mysql.connector.js"
import * as mrController from "./utils/mrController.js";
import * as mrUtils from "./utils/mrUtils.js"
import { IWorkDay, IAlert } from "./utils/interface/MRServerInterface.js";

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

app.get('/getFirstWDIDAvailable/:usrID', (req: Request, res: Response, n : NextFunction) => {
  mrController.getFirstWDIDAvailable( req, res, n);
});

// saveWorkDays: inserimento nuove righe
app.post('/saveWorkDays', (req: Request, res: Response) => {

  let newWorkDays : IWorkDay [] = req.body.newWorkDays;

  /*
  Setto la proprietà wrkdID di tutti gli elementi della lista
  newWorkDays(creandone una nuova ovvero newZeroIdWD) in modo tale 
  da distingure i record da inserire da quelli da updateare prima
  che vengano concatenati per fare il check
  */ 
  let newZeroIdWD : IWorkDay [] = newWorkDays.map((item) => ({...item,value: item.wrkdID * 0,}));

  let changeWorkDays : IWorkDay [] = req.body.changeWorkDays;
  let deletedWorkDaysID : number [] = req.body.deletedWorkDaysID

  /*
  Verifico se all'interno della lista degli id dei record cancellati c'è qualche record anche modificato. 
  Se si rimuovo il record dagli elementi modificati per poi cancellarlo definitivamente
  */
  let changeWorkDaysDef : IWorkDay [] = changeWorkDays.filter(x => deletedWorkDaysID.indexOf(x.wrkdID) === -1);

  let wdToCheck : IWorkDay [] = newZeroIdWD.concat(changeWorkDaysDef);

  let err_war : IAlert[] = mrUtils.checkWorkItem(newZeroIdWD, changeWorkDaysDef);

  if (err_war.length > 0) {

    let toJson = {
      typo:'err_war',
      errWar:err_war,
      wdToSave: wdToCheck
    }

    res.send(JSON.stringify(toJson));
  } //else {

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

app.post('/applyCorrection', (req: Request, res: Response) => {


})