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
    mrController.getUsrInfo(req, res, n);
});

// getUsrWrkDay: recupero le attività dell'utente per il mese selezionato nel componente MonthComboBox
app.get('/getUsrWrkDay/:usrID/:month', (req: Request, res: Response, n: NextFunction) => {
    mrController.getUsrWorkDay(req, res, n);
})

// getMonth: recupero i mesi in cui l'utente ha registrato delle attività per il componente MonthComboBox
app.get('/getUsrMonths/:usrID', (req: Request, res: Response, n: NextFunction) => {
    mrController.getUsrMonth(req, res, n);
});

// getSquad: recupero tutte le squad per il componente SquadCell
app.get('/getSquad', (req: Request, res: Response, n: NextFunction) => {
    mrController.getSquad(req, res, n);
});

app.get('/getFirstWDIDAvailable/:usrID', (req: Request, res: Response, n: NextFunction) => {
    mrController.getFirstWDIDAvailable(req, res, n);
});

// saveWorkDays: inserimento nuove righe
app.post('/saveWorkDays', (req: Request, res: Response, n: NextFunction) => {
    mrController.saveWD(req, res, n);
});

app.post('/applyCorrection', (req: Request, res: Response) => {

})