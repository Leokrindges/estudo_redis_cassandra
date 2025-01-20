import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedRootModule } from './feed/feed/feed.module';
import { KafkaRootModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FeedRootModule,
    KafkaRootModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
