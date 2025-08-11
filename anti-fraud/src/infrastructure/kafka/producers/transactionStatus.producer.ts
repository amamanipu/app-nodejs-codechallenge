import { Kafka } from 'kafkajs';

export const TransactionStatusProducer = (config: any) => {
    const kafka = new Kafka({
        brokers: config.brokers
    })

    const producer = kafka.producer();
    const send = async(message: any) => {
        await producer.connect();
        await producer.send({
            topic: config.topicTransactionStatus,
            messages: [{value: JSON.stringify(message)}],
        }).then(() => {
            console.info(`TransactionStatus :: Evento publicado: ${JSON.stringify(message)}`);
        }).catch(console.error);
        await producer.disconnect();
    };

    return { send };
}