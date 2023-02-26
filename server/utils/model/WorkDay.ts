import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../mysql_utils/vars.config.js';

class WorkDay extends Model {
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
    tableName: 'work_day'
});

WorkDay.sync();

export default WorkDay;
