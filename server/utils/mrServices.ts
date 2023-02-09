import { execute } from './mysql_utils/mysql.connector.js';
import {ISquad, IUser, IUsrMonth, IWorkDay} from './interface/MRServerInterface.js';
import {mrQuery} from './mrQuery.js';
import moment from 'moment';


/**
 * Get active team records
 *
 * @param req Express Request
 * @param res Express Response
 */
export const getUserInfo = async (email: IUser['usrEmail'], pwd: IUser['usrPwd']) => {
    return execute<IUser>(mrQuery.GetUsrInfo, [email, pwd]);
};

export const getUserWorkDay = async (usrID: Number, month: Number) : Promise<IWorkDay[]> => {
    return execute<IWorkDay[]>(mrQuery.GetUsrWorkDay, [usrID, month]);
};

export const setTimeName = async () => {
    return execute(mrQuery.SetTimeName, []);
};

export const getUsrMonth = async (usrID: Number) : Promise<IUsrMonth[]> => {
    return execute<IUsrMonth[]>(mrQuery.GetUsrMonth, [usrID]);
};


export const getSquad = async () : Promise<ISquad[]> => {
    return execute<ISquad[]>(mrQuery.GetSquad, []);
};

export const getFirstWDIDAvailable = async (usrID: number) : Promise<number> => {
    return execute<number>(mrQuery.GetFirstWDIDAvailable, [usrID]);
};

export const AddNewWD = async (newWD : IWorkDay []) : Promise<number> => {

    const values = newWD.map(nwd => [
        moment(nwd.wrkdDay).format('YYYY-MM-DD HH:mm:ss'),
        nwd.wrkdInfoID,
        nwd.wrkdUsrID,
        nwd.wrkdActivity,
        nwd.wrkdActivityType,
        nwd.wrkdActivityHour,
        nwd.wrkdSqdID,
        nwd.wrkdCdc 
    ]);

    return execute<number>(mrQuery.AddNewWD, [values]);
}