import { Connection, OkPacket, RowDataPacket } from "mysql2";
import { IWorkDay } from "../interface/MRServerInterface";

export class WorkDay{

    public wrkdID: number;
    public wrkdDay: Date;
    public wrkdInfoID: number;
    public wrkdUsrID: number;
    public wrkdActivity: string;
    public wrkdActivityType: string;
    public wrkdActivityHour: number;
    public wrkdSqdID: number;
    public wrkdCdc: string;
    public column: string;

    constructor(wID: number, wDay: Date, wInfoID: number, wUsrID: number, wActivity: string, wActivityType: string, wActivityHour: number, wSqdID: number, wCdc: string) {

        this.wrkdID = wID;
        this.wrkdDay = wDay;
        this.wrkdInfoID = wInfoID;
        this.wrkdUsrID = wUsrID;
        this.wrkdActivity = wActivity;
        this.wrkdActivityType = wActivityType;
        this.wrkdActivityHour = wActivityHour;
        this.wrkdSqdID = wSqdID;
        this.wrkdCdc = wCdc
        this.column = 'RowDataPacket';
    }

    readAll(connection:Connection): Promise<IWorkDay[]> {
        return new Promise((resolve, reject) => {
            connection.query<IWorkDay[]>("SELECT * FROM users", (err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    }

    readById(connection:Connection, user_id: number): Promise<IWorkDay | undefined> {
        return new Promise((resolve, reject) => {
            connection.query<IWorkDay[]>(
                "SELECT * FROM users WHERE id = ?",
                [user_id],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res?.[0])
                }
            )
        })
    }

    create(connection:Connection, user: IWorkDay): Promise<IWorkDay> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO users (email, password, admin) VALUES(?,?,?)",
                [user.email, user.password, user.admin],
                (err, res) => {
                    if (err) reject(err)
                    else
                        this.readById(connection, res.insertId)
                            .then(user => resolve(user!))
                            .catch(reject)
                }
            )
        })
    }

    update(connection:Connection, user: IWorkDay): Promise<IWorkDay | undefined> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "UPDATE users SET email = ?, password = ?, admin = ? WHERE id = ?",
                [user.email, user.password, user.admin, user.id],
                (err, res) => {
                    if (err) reject(err)
                    else
                        this.readById(connection, user.id!)
                            .then(resolve)
                            .catch(reject)
                }
            )
        })
    }

    remove(connection : Connection, user_id: number): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "DELETE FROM users WHERE id = ?",
                [user_id],
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res.affectedRows)
                }
            )
        })
    }
}