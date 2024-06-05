import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';
import { v4 as uuidv4 } from 'uuid';
import TransactionStatus from './transactionStatus.model';
import TransactionType from './transactionType.model';

class Transaction extends Model {
    public transactionExternalId!: string;
    public accountExternalIdDebit!: string;
    public accountExternalIdCredit!: string;
    public tranferTypeId!: number;
    public value!: number;
    public statusId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Transaction.init(
    {
        transactionExternalId: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
            primaryKey: true,
        },
        accountExternalIdDebit: {
            type: DataTypes.UUID
        },
        accountExternalIdCredit: {
            type: DataTypes.UUID
        },
        tranferTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        statusId: {
            type: DataTypes.INTEGER,
            // defaultValue: 1, // Pending
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Transaction',
        tableName: 'transaction'
    }
);

Transaction.belongsTo(TransactionStatus, { foreignKey: 'statusId', as: 'transactionStatus' });
Transaction.belongsTo(TransactionType, { foreignKey: 'tranferTypeId', as: 'transactionType' });

export default Transaction;