import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    connectedUser: User,
  ): Promise<Event> {
    // on integre notre organisateur a l'event
    const eventCreation = {
      ...createEventDto,
      organisateur: connectedUser,
    };
    const newEventCreated = await this.eventRepository.save(eventCreation);
    return await this.eventRepository.findOneBy({ id: newEventCreated.id });
  }

  async findAll(connectedUser: User): Promise<Event[]> {
    const eventFound = await this.eventRepository.findBy({
      organisateur: {
        id: connectedUser.id,
      },
    });

    return eventFound;
  }

  async findOne(id: string, connectedUser: User): Promise<Event> {
    const eventFound = await this.eventRepository.findOneBy({ id });
    if (!eventFound) {
      throw new NotFoundException(`pas d'event avec l'id : ${id}`);
    }
    if (
      eventFound.organisateur.id !== connectedUser.id &&
      connectedUser.role !== 'admin'
    ) {
      throw new UnauthorizedException(
        ' vous ne pouvez pas consulter un event que vous avez pas creer',
      );
    }
    return eventFound;
  }

  async findAllEventByChild(childId: string): Promise<Event[]> {
    const eventFound = await this.eventRepository.findBy({
      participants: {
        id: childId,
      },
    });
    if (eventFound.length === 0) {
      throw new NotFoundException("pas d'event");
    }
    return eventFound;
  }
  async update(
    id: string,
    updateEventDto: UpdateEventDto,
    connectedUser: User,
  ): Promise<Event> {
    const upEvent = await this.findOne(id, connectedUser);

    upEvent.name = updateEventDto.name;
    upEvent.address = updateEventDto.address;
    upEvent.postalCode = updateEventDto.postalCode;
    upEvent.city = updateEventDto.city;
    upEvent.date = updateEventDto.date;
    upEvent.time = updateEventDto.time;
    upEvent.description = updateEventDto.description;
    upEvent.category = updateEventDto.category;

    await this.eventRepository.save(upEvent);
    return await this.eventRepository.findOneBy({ id });
  }

  async remove(id: string, connectedUser: User): Promise<string> {
    await this.findOne(id, connectedUser);
    await this.eventRepository.delete({ id });

    return `l'event avec l'id ${id} à été supprimé`;
  }
}
