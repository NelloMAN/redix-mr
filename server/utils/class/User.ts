import { Connection, OkPacket, RowDataPacket } from "mysql2";
import { IUser, IWorkDay } from "../interface/MRServerInterface";

export class User {

    public usrID: number;
    public usrEmail: string;
    public usrName: string;
    public usrSurname: string;
    public usrPwd: string;     

    constructor(uID: number, uEmail: string, uName: string, uSurname: string, uPwd: string) {

        this.usrID = uID;
        this.usrEmail = uEmail;
        this.usrName = uName;
        this.usrSurname = uSurname;
        this.usrPwd = uPwd;
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