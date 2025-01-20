import { Injectable } from "@nestjs/common";
import { Kafka } from "kafkajs";

@Injectable()
export class KafkaService {
    private kafka = new Kafka({
        brokers: ['kafka:9092'],
        clientId: 'nestjs-consumer-server'
    })

    private producer = this.kafka.producer()
    constructor() {
        this.conect()
    }

    async conect(){
        await this.producer.connect()
    }

    async sendLikeEvent(payload: any) {
        await this.producer.send({
            topic: 'like-events',
            messages: [{value: JSON.stringify(payload)}],         
        })
    }

    async disconnect() {
        await this.producer.disconnect()
    }
}