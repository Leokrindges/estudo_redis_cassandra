import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedRootModule } from './feed/feed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FeedRootModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
