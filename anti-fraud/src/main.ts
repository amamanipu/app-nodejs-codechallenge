import { TransactionConsumer } from "./infrastructure/kafka/consumers/transaction.consumer";

async function startServer() {

  // Configurar desde secrets manager
  const config = {
    brokers: ['localhost:9092'],
    topicTransaction: 'topic_transaction',
    topicTransactionStatus: 'topic_transaction_status'
  };

    // Consumidor de Kafka
  await TransactionConsumer(config)
      .subscribe()
      .catch(console.error);
}

startServer();