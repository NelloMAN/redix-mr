import { execute } from './mysql_utils/mysql.connector.js';
import {ISquad, IUser, IUsrMonth, IWorkDay} from './interface/MRServerInterface.js';
import {mrQuery} from './mrQuery.js';

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