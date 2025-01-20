import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports: [
        ClientsModule.register([
        {
            name: 'KAFKA_PRODUCER',
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: 'nestjs-consumer-server',
                    brokers: ['kafka:9092'],
                },
                consumer: {
                    groupId: 'nestjs-consumer-server',
                },
            }
    }])],
    exports: [
        ClientsModule
    ]
})
export class KafkaRootModule {}