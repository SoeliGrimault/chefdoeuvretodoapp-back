import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { ChildrenModule } from './children/children.module';
import { DocumentModule } from './document/document.module';
import { CategoryModule } from './category/category.module';
import * as dotenv from 'dotenv';
import { User } from './user/entities/user.entity';
import { Category } from './category/entities/category.entity';
import { Child } from './children/entities/child.entity';
import { Document } from './document/entities/document.entity';
import { Event } from './event/entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config({
  path: '.env',
});
@Module({
  imports: [
    // -----------------------------------------------on connect la BDD------------------------------------------------//
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Category, Child, Document, Event, User],
      synchronize: process.env.MODE === 'DEV' ? true : false,
    }),
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
