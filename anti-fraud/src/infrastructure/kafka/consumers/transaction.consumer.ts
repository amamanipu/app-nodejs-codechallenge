import { Kafka } from "kafkajs";
import { STATUS } from "../../../common/constants";
import { TransactionStatusProducer } from "../producers/transactionStatus.producer";

export const TransactionConsumer = (config: any) => {
    const kafka = new Kafka({
        brokers: config.brokers
    });

    const processData = async (message: any) => {
        try {
            if (message === null) throw new Error('Mensaje nulo');
            let event = JSON.parse(message);

            if (event.value > 0 && event.value <= 1000) {
                event.statusId = STATUS.Approved;
            } else {
                event.statusId = STATUS.Rejected;
            }

            await TransactionStatusProducer(config).send(event);
        } catch (error: any) {
            console.error(error);
        }
    }

    const subscribe = async () => {
        const consumer = kafka.consumer({
            groupId: config.topicTransaction,
        });

        await consumer.connect();
        await consumer.subscribe({
            topic: config.topicTransaction,
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

        console.info('Se suscribio correctamente al topico: ' + config.topicTransaction);
    }

    return { subscribe };
}