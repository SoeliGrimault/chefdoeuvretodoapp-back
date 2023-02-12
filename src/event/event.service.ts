import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from 'src/event/entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}
  async create(
    createEventDto: CreateEventDto,
    organisateur: User,
  ): Promise<Event> {
    // on integre notre organisateur a l'event
    const eventCreation = {
      ...createEventDto,
      organisateur,
    };
    return await this.eventRepository.save(eventCreation);
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async findOne(id: string): Promise<Event> {
    const eventFound = await this.eventRepository.findOneBy({ id });
    if (!eventFound) {
      throw new NotFoundException(`pas d'event avec l'id : ${id}`);
    }
    return eventFound;
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const upEvent = await this.findOne(id);
    const {
      name,
      address,
      postalCode,
      city,
      date,
      time,
      description,
      category,
    } = updateEventDto;

    upEvent.name = name;
    upEvent.address = address;
    upEvent.postalCode = postalCode;
    upEvent.city = city;
    upEvent.date = date;
    upEvent.time = time;
    upEvent.description = description;
    upEvent.category = category;

    if (!upEvent) {
      throw new NotFoundException(`pas d'event avec cet id: ${id}`);
    }
    return await this.eventRepository.save(upEvent);
  }

  async remove(id: string): Promise<string> {
    const resultRemove = await this.eventRepository.delete({ id });
    if (resultRemove.affected === 0) {
      throw new NotFoundException(`pas de category ${name} trouvée.`);
    }
    return `l'event avec l'id ${id} à été supprimé`;
  }
}
