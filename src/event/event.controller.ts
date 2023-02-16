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
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('event')
@UseGuards(AuthGuard())
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(
    @Body()
    createEventDto: CreateEventDto,
    @GetUser() connectedUser: User,
  ) {
    if (
      !createEventDto.name ||
      !createEventDto.date ||
      !createEventDto.time ||
      !createEventDto.category
    )
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return this.eventService.create(createEventDto, connectedUser);
  }

  @Get()
  findAll(@GetUser() connectedUser: User) {
    return this.eventService.findAll(connectedUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() connectedUser: User) {
    return this.eventService.findOne(id, connectedUser);
  }
  @Get('child/:id')
  findAllEventByChild(@Param('id') childId: string) {
    return this.eventService.findAllEventByChild(childId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @GetUser() connectedUser: User,
  ) {
    if (
      !updateEventDto.name &&
      !updateEventDto.address &&
      !updateEventDto.postalCode &&
      !updateEventDto.city &&
      !updateEventDto.date &&
      !updateEventDto.time &&
      !updateEventDto.description &&
      !updateEventDto.category
    )
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return this.eventService.update(id, updateEventDto, connectedUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() connectedUser: User) {
    return this.eventService.remove(id, connectedUser);
  }
}
