import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../mysql_utils/vars.config.js';
import { IUser } from '../interface/MRServerInterface.js';
import WorkDay from './WorkDay.js';

class Usr extends Model {
    public usrID!: number;
    public usrEmail!: string;
    public usrName!: string;
    public usrSurname!: string;
    public usrPwd!: string;
    public usrRoleID!: number;
    public usrCurrentSqdID!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Usr.init({
    usrID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    usrEmail: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    usrName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    usrSurname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    usrPwd: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    usrRoleID: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    usrCurrentSqdID: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }
}, 
{
    sequelize,
    tableName: 'usr'
});

Usr.hasMany(WorkDay, { foreignKey: 'wrkdUsrID' });
Usr.sync();

export default Usr;
