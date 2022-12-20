import { execute } from './mysql_utils/mysql.connector.js';
import {IUser} from './interface/MRServerInterface.js';
import {mrQuery} from './mrQuery.js';

/**
 * Get active team records
 *
 * @param req Express Request
 * @param res Express Response
 */
export const getUserInfo = async (email: IUser['usrEmail'], pwd: IUser['usrPwd']) => {
    return execute<IUser>(mrQuery.GetUserInfo, [email, pwd]);
};