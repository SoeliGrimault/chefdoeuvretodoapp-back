import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller('children')
@UseGuards(AuthGuard())
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  create(
    @Body() createChildDto: CreateChildDto,
    @GetUser() connectedUser: User,
  ) {
    if (!createChildDto.name)
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return this.childrenService.create(createChildDto, connectedUser);
  }

  @Get()
  findAll(@GetUser() connectedUser: User) {
    return this.childrenService.findAll(connectedUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() connectedUser: User) {
    return this.childrenService.findOne(id, connectedUser);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChildDto: UpdateChildDto,
    @GetUser() connectedUser: User,
  ) {
    if (!updateChildDto.name)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    return this.childrenService.update(id, updateChildDto, connectedUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() connectedUser: User) {
    return this.childrenService.remove(id, connectedUser);
  }
}
