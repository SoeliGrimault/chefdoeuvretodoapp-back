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
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto, organisateur: User) {
    if (
      !createEventDto.name ||
      !createEventDto.date ||
      !createEventDto.time ||
      !createEventDto.category
    )
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return this.eventService.create(createEventDto, organisateur);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    if (
      !updateEventDto.name &&
      !updateEventDto.address &&
      !updateEventDto.postalCode &&
      !updateEventDto.city &&
      !updateEventDto.date &&
      !updateEventDto.time &&
      !updateEventDto.description &&
      !updateEventDto.category &&
      !updateEventDto.participants
    )
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
