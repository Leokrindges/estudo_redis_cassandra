import { Inject, Injectable } from "@nestjs/common";
import { FeedRepository } from "./repositories/feed.repository";
import { Producer } from "@nestjs/microservices/external/kafka.interface";
import { HttpClient, HttpResponse } from "src/infra/htp-client";
import { Position } from "src/interfaces/feed/position";

@Injectable()
export class FeedService {
    constructor(
        private readonly feedRepository: FeedRepository,
         @Inject('KAFKA_PRODUCER') private kafkaProducer: Producer 
    ) {}

    async getPositions() {
        const positions = await HttpClient<Position[]>(
            `${process.env.NEXT_PUBLIC_URL_API_BACKEND}/position`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
                refresh: true,
            },
            ).then((res: HttpResponse<Position[]>) => {
                if (!res.ok) throw new Error();
                const body = res.body;
                return body;
            }); 

        this.kafkaProducer.send({
            topic: 'like-events',
            messages: [{value: JSON.stringify(positions)}],
        })
        return positions
    }
}