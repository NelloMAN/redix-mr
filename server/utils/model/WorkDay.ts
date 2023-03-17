import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../mysql_utils/vars.config.js';
import Info from './Info.js';

export interface IWorkDayModel {
    wrkdID: number;
    wrkdDay: Date;
    wrkdInfoID: number;
    wrkdUsrID: number;
    wrkdActivity: string;
    wrkdActivityType: string;
    wrkdActivityHour: number;
    wrkdSqdID: number;
    wrkdCdc: string;
    //campi opzionali
    wrkdInfoGrpID?:number;
    firstWDIDAvailable?:number;
    monthName?:string;
    monthNumb?:number;
}

class WorkDay extends Model<IWorkDayModel> implements IWorkDayModel {
    public wrkdID!: number;
    public wrkdDay!: Date;
    public wrkdInfoID!: number;
    public wrkdUsrID!: number;
    public wrkdActivity!: string;
    public wrkdActivityType!: string;
    public wrkdActivityHour!: number;
    public wrkdSqdID!: number;
    public wrkdCdc!: string;
}

WorkDay.init({
    wrkdID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    wrkdDay: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    wrkdInfoID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    wrkdUsrID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    wrkdActivity: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    wrkdActivityType: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    wrkdActivityHour: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    wrkdSqdID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    wrkdCdc: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, 
{
    sequelize,
    tableName: 'work_day',
    timestamps: false
});

WorkDay.belongsTo(Info, {foreignKey:'wrkdInfoID'})
WorkDay.sync();

export default WorkDay;
