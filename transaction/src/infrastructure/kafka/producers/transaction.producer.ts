import { Kafka } from 'kafkajs';

export const TransactionProducer = (config: any) => {
    const kafka = new Kafka({
        brokers: config.brokers
    })

    const producer = kafka.producer();
    const send = async(message: any) => {
        await producer.connect();
        await producer.send({
            topic: config.topicTransaction,
            messages: [{value: JSON.stringify(message)}],
        }).then(() => {
            console.info(`Transaction :: Evento publicado: ${JSON.stringify(message)}`);
        }).catch(console.error);
        await producer.disconnect();
    };

    return { send };
}