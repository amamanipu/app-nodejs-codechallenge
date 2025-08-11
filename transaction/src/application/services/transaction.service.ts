import { Inject, Service } from "typedi";
import { TransactionRepository } from "../../domain/repositories/transaction.repository";

@Service()
export class TransactionService {
    constructor(
        @Inject('TransactionRepository') private transactionRepository: TransactionRepository
    ) {}

    async findById(transactionExternalId: string): Promise<any> {
        return this.transactionRepository.findByPk(transactionExternalId);
    }

    async create(transaction: any): Promise<any> {
        return this.transactionRepository.create(transaction);
    }

    async update(transactionExternalId: string, transaction: any): Promise<any> {
        return this.transactionRepository.update(transactionExternalId, transaction);
    }
}