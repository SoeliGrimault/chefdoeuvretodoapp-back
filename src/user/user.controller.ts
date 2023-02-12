import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { RoleEnumType, User } from './entities/user.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  @Get('event/organisateur/:id')
  findCreatedEvents(@Param('id') userId: string) {
    return this.userService.findCreatedEvents(userId);
  }
  @Get('children/parent/:id')
  findCreatedChild(@Param('id') userId: string) {
    return this.userService.findCreatedChild(userId);
  }

  @Patch(':email')
  update(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() connectedUser: User,
  ) {
    if (
      !updateUserDto.email &&
      !updateUserDto.password &&
      !updateUserDto.name &&
      !updateUserDto.picture &&
      !updateUserDto.role
    )
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return this.userService.patch(email, updateUserDto, connectedUser);
  }

  @Delete(':email')
  @UseGuards(RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }
}
