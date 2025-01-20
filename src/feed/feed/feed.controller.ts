import { Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FeedService } from "./feed.service";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { KafkaMessage, Producer } from "@nestjs/microservices/external/kafka.interface";

@ApiTags('feed')
@Controller('feed')
export class FeedController {
    constructor(
        private readonly feedService: FeedService,
    ) {}

    @Get()
    async getPositions() {
        return this.feedService.getPositions();
    }

    @MessagePattern('like-events')
    consumer(@Payload() message: KafkaMessage) {
        console.log(message.value);
    }
}
