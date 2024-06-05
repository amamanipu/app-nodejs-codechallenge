import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';

class TransactionType extends Model {
    public statusId!: number;
    public name!: string;
}

TransactionType.init(
    {
        tranferTypeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'TransactionType',
        tableName: 'transactionType',
        timestamps: false,
    }
);

export default TransactionType;