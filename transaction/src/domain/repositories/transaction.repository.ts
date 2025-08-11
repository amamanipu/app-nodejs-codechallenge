export interface TransactionRepository {
    findByPk(transactionExternalId: string): Promise<any>;
    create(transaction: any): Promise<any>
    update(transactionExternalId: string, transaction: any): Promise<any>
}