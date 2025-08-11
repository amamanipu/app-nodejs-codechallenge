import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { Transaction, TransactionInput  } from './transaction.schema'
import { Inject, Service } from 'typedi';
import { TransactionProducer } from '../../kafka/producers/transaction.producer';
import { TransactionService } from '../../../application/services/transaction.service';
import { STATUS } from '../../../common/constants';

@Service()
@Resolver()
class TransactionResolver {
    constructor(@Inject() private transactionService: TransactionService) {}

    @Query(() => Transaction)
    async transaction(@Arg('transactionExternalId') id: string) : Promise<Transaction | null> {
        return this.transactionService.findById(id);
    }

    @Mutation(() => Transaction)
    async createTransaction(@Arg('TransactionInput') transaction: TransactionInput, @Ctx() ctx: any) : Promise<Transaction | null> {
        const data = await this.transactionService.create({ ...transaction, statusId: STATUS.Pending });
        await TransactionProducer(ctx.config).send({
            transactionExternalId: data.transactionExternalId,
            value: transaction.value,
        });
        return data;
    }
};

export default TransactionResolver;