import { Module } from "@nestjs/common";
import { FeedService } from "./feed.service";
import { FeedRepository } from "./repositories/feed.repository";
import { FeedController } from "./feed.controller";

@Module({
    imports: [],
    controllers: [FeedController],
    providers: [
        FeedService,
        FeedRepository
    ],
})

export class FeedRootModule {}