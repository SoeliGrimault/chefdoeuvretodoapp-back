import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserController } from 'src/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Event } from 'src/event/entities/event.entity';
import { Child } from 'src/children/entities/child.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  //1- importer dans toutes les entités le type orm module //
  imports: [TypeOrmModule.forFeature([User, Event, Child]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
