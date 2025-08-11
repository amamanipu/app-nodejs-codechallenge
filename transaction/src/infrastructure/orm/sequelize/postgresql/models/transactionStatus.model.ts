import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';

class TransactionStatus extends Model {
    public statusId!: number;
    public name!: string;
}

TransactionStatus.init(
    {
        statusId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'TransactionStatus',
        tableName: 'transactionStatus',
        timestamps: false,
    }
);

export default TransactionStatus;