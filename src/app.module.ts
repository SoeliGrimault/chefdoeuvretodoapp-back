import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { ChildrenModule } from './children/children.module';
import { DocumentModule } from './document/document.module';
import { CategoryModule } from './category/category.module';
import * as dotenv from 'dotenv';

@Module({
  imports: [
    UserModule,
    EventModule,
    ChildrenModule,
    DocumentModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
