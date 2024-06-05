import { Kafka } from "kafkajs";
import { TransactionService } from "../../../application/services/transaction.service";
import { TransactionRepositoryImpl } from "../../orm/sequelize/postgresql/repositories/transaction.repository";

const transactionRepository = new TransactionRepositoryImpl;
const transactionService = new TransactionService(transactionRepository);

export const TransactionStatusConsumer = (config: any) => {
    const kafka = new Kafka({
        brokers: config.brokers
    });

    const processData = async (message: any) => {
        try {
            if (message === null) throw new Error('Mensaje nulo');
            const obj = JSON.parse(message);
            await transactionService.update(obj.transactionExternalId, {
                statusId: obj.statusId
            })
        } catch (error: any) {
            console.error(error);
        }
    }

    const subscribe = async () => {
        const consumer = kafka.consumer({
            groupId: config.topicTransactionStatus,
        });

        await consumer.connect();
        await consumer.subscribe({
            topic: config.topicTransactionStatus,
            fromBeginning: true,
        });

        await consumer.
            run({
                eachMessage: async ({ message }) => {
                    const data = message.value?.toString() ?? null;
                    await processData(data);
                }
            })
            .catch(console.error);

        console.info('Se suscribio correctamente al topico: ' + config.topicTransactionStatus);
    }

    return { subscribe };
}