import { Container } from 'typedi';
import { TransactionRepositoryImpl } from './infrastructure/orm/sequelize/postgresql/repositories/transaction.repository';

// Register repository in the DI container
export function registerRepositories() : void {
    Container.set('TransactionRepository', new TransactionRepositoryImpl);
}