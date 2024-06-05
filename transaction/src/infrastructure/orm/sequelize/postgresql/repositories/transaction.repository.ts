import { TransactionRepository } from "../../../../../domain/repositories/transaction.repository";
import Transaction from "../models/transaction.model";
import TransactionStatus from "../models/transactionStatus.model";
import TransactionType from "../models/transactionType.model";

export class TransactionRepositoryImpl implements TransactionRepository {
    async findByPk(transactionExternalId: string): Promise<any> {
        return Transaction.findByPk(transactionExternalId, {
            include: [
                {
                    model: TransactionStatus,
                    as: 'transactionStatus'
                },
                {
                    model: TransactionType,
                    as: 'transactionType'
                }
            ],
        });
    }

    async create(transaction: any): Promise<any> {
        return Transaction.create(transaction);
    }

    async update(transactionExternalId: string, transaction: any): Promise<any> {
        return Transaction.update(transaction, {
            where: { transactionExternalId }
        });
    }
}