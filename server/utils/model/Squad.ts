import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../mysql_utils/vars.config.js';

class Squad extends Model {
    public sqdID!: number;
    public sqdName!: string;
}

Squad.init({
    sqdID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    sqdName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, 
{
    sequelize,
    tableName: 'squad'
});

Squad.sync();

export default Squad;
