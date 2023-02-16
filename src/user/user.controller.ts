import {
  Controller,
  Get,
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
import { AuthGuard } from '@nestjs/passport';

@Controller('user') // /user
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // GET /user
  @UseGuards(RolesGuard) // embauche un vigil sur cet accès
  @Roles(RoleEnumType.ADMIN) // donne la liste des types invités autorisés
  findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string, @GetUser() connectedUser: User) {
    return this.userService.findOne(email, connectedUser);
  }

  // @Get('event/organisateur/:id')
  // findCreatedEvents(
  //   @Param('id') userId: string,
  //   @GetUser() connectedUser: User,
  // ) {
  //   return this.userService.findCreatedEvents(userId, connectedUser);
  // }

  // @Get('parent/:id')
  // findCreatedChild(
  //   @Param('id') userId: string,
  //   @GetUser() connectedUser: User,
  // ) {
  //   return this.userService.findCreatedChild(userId, connectedUser);
  // }

  // @Get('document/user/:id')
  // findCreatedDoc(@Param('id') userId: string, @GetUser() connectedUser: User) {
  //   return this.userService.findCreatedDoc(userId, connectedUser);
  // }

  @Patch(':email')
  update(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() connectedUser: User,
  ) {
    if (
      // !updateUserDto.email &&
      // !updateUserDto.password &&
      !updateUserDto.name &&
      !updateUserDto.picture
    )
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return this.userService.update(email, updateUserDto, connectedUser);
  }

  @Delete(':email')
  @UseGuards(RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }
}
