import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { ApolloServer } from '@apollo/server';
import { koaMiddleware } from '@as-integrations/koa';
import sequelize from './infrastructure/orm/sequelize/postgresql/connection';
import TransactionStatus from './infrastructure/orm/sequelize/postgresql/models/transactionStatus.model';
import TransactionType from './infrastructure/orm/sequelize/postgresql/models/transactionType.model';
import { buildGraphQLSchema } from './infrastructure/graphql/schema';
import { TransactionStatusConsumer } from './infrastructure/kafka/consumers/transactionStatus.consumer';

async function startServer() {

  // Configurar para la gestión de secretos
  const config = {
    brokers: ['localhost:9092'],
    topicTransaction: 'topic_transaction',
    topicTransactionStatus: 'topic_transaction_status'
  };

  const server = new Koa();
  server.use(bodyParser());

  // Configurar el servidor Apollo
  const apolloServer = new ApolloServer({ 
    schema: await buildGraphQLSchema()
  });

  // Iniciar el servidor Apollo
  await apolloServer.start();

  // Aplicar middleware de Apollo a la aplicación Koa
  server.use(
    koaMiddleware(apolloServer, {
      context: async ({ ctx }) => ({ config, ctx })
    })
  )

  // Consumidor de Kafka
  await TransactionStatusConsumer(config)
    .subscribe()
    .catch(console.error);

  // Configurar el puerto en el que escuchará el servidor
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Servidor GraphQL corriendo en http://localhost:${PORT}/graphql`);
  });
}

// Generar data de Prueba
(async () => {
  try {
      await sequelize.authenticate();
      console.log('Se conecto correctamente con la base de datos');
      await sequelize.sync({ alter: true });

      // Temp data
      const transactionStatusCount = await TransactionStatus.count();
      if (transactionStatusCount === 0) {
        await TransactionStatus.bulkCreate([
          { name: 'Pending' },
          { name: 'Approved' },
          { name: 'Rejected' }
        ]);
      }

      const transactionTypeCount = await TransactionType.count();
      if (transactionTypeCount === 0) {
        await TransactionType.bulkCreate([
          { name: 'Banking' },
          { name: 'Interbank' }
        ]);
      }

      console.log('Se sincronizaron todos los modelos correctamente');
      await startServer();
  } catch (error) {
      console.error('Se desconecto la base de datos:', error);
  }
})();