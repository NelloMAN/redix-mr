import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../mysql_utils/vars.config.js';
import WorkDay from './WorkDay.js';

class Info extends Model {
    public infoID!: number;
    public infoName!: string;
    public infoGrpID!: number;
}

Info.init({
    infoID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    infoName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    infoGrpID: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    }
}, 
{
    sequelize,
    tableName: 'info'
});

Info.sync();

export default Info;
