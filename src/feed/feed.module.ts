import { Module } from "@nestjs/common";
import { FeedService } from "./feed.service";
import { FeedRepository } from "./repositories/feed.repository";

@Module({
    imports: [],
    controllers: [],
    providers: [
        FeedService,
        FeedRepository
    ],
})

export class FeedRootModule {}