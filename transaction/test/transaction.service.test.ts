import 'reflect-metadata';
import { expect } from 'chai';
import sinon from 'sinon';
import { Container } from 'typedi';
import { TransactionService } from '../src/application/services/transaction.service';
import { TransactionRepositoryImpl } from '../src/infrastructure/orm/sequelize/postgresql/repositories/transaction.repository';

describe('TransactionService', () => {
    let transactionService: TransactionService;
    let transactionRepositoryStub: sinon.SinonStubbedInstance<TransactionRepositoryImpl>;

    beforeEach(() => {
        transactionRepositoryStub = sinon.createStubInstance(TransactionRepositoryImpl);
        Container.set('TransactionRepository', transactionRepositoryStub);
        transactionService = Container.get(TransactionService);
    });

    afterEach(() => {
        sinon.restore();
        Container.reset();
    });

    it('should find a transaction by id', async () => {
        const transactionExternalId = '9d8d5b1b-8a88-46b4-b4b9-38533a53f2ec';
        const transaction = { transactionExternalId, value: 1200 };
        
        transactionRepositoryStub.findByPk.resolves(transaction);

        const result = await transactionService.findById(transactionExternalId);

        expect(transactionRepositoryStub.findByPk.calledWith(transactionExternalId)).to.be.true;
        expect(result).to.equal(transaction);
    });

    it('should create a transaction', async () => {
        const transaction = { value: 950 };
        const createdTransaction = { transactionExternalId: '9d8d5b1b-8a88-46b4-b4b9-38533a53f2ec', ...transaction };
        
        transactionRepositoryStub.create.resolves(createdTransaction);

        const result = await transactionService.create(transaction);

        expect(transactionRepositoryStub.create.calledWith(transaction)).to.be.true;
        expect(result).to.equal(createdTransaction);
    });

    it('should update a transaction', async () => {
        const transactionExternalId = '9d8d5b1b-8a88-46b4-b4b9-38533a53f2ec';
        const transaction = { statusId: 2 };
        const updatedTransaction = { transactionExternalId, ...transaction };

        transactionRepositoryStub.update.resolves(updatedTransaction);

        const result = await transactionService.update(transactionExternalId, transaction);

        expect(transactionRepositoryStub.update.calledWith(transactionExternalId, transaction)).to.be.true;
        expect(result).to.equal(updatedTransaction);
    });
});
