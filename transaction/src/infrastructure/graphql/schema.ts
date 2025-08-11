import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { registerRepositories } from '../../container';
import TransactionResolver from './transaction/transaction.resolver';

export async function buildGraphQLSchema(): Promise<any> {
  // Registrar repositorios
  registerRepositories();

  // Registrar los resolvers y container
  const schema = await buildSchema({
    resolvers: [TransactionResolver],
    container: Container,
  });

  return schema;
}