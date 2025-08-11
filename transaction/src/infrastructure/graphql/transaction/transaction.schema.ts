import { ObjectType, Field, ID, Float, Int, InputType } from 'type-graphql';

@ObjectType()
class TransactionStatus {
    @Field()
    name!: string;
}

@ObjectType()
class TransactionType {
    @Field()
    name!: string;
}

@ObjectType()
export class Transaction {
    @Field(type => ID)
    transactionExternalId!: string;

    @Field()
    accountExternalIdDebit!: string;

    @Field()
    accountExternalIdCredit!: string;

    @Field(type => Int)
    tranferTypeId!: number;

    @Field(type => Float)
    value!: number;

    @Field()
    createdAt!: Date;

    @Field()
    updatedAt!: Date;

    @Field(type => TransactionStatus)
    transactionStatus!: object;

    @Field(type => TransactionType)
    transactionType!: object;
}

@InputType()
export class TransactionInput {
    @Field()
    accountExternalIdDebit!: string;

    @Field()
    accountExternalIdCredit!: string;

    @Field(type => Int)
    tranferTypeId!: number;

    @Field(type => Float)
    value!: number;
}