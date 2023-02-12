import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Child } from 'src/children/entities/child.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Child)
    private childRepository: Repository<Child>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(email: string): Promise<User> {
    const userFound = await this.userRepository.findOneBy({ email });
    if (!userFound) {
      throw new NotFoundException(
        `pas d'utilisateur avec cet email : ${email}`,
      );
    }
    return userFound;
  }

  async findCreatedEvents(userId: string): Promise<Event[]> {
    //  Ce code est une fonction JavaScript asynchrone
    //   qui trouve les événements créés par un utilisateur en utilisant son identifiant. La fonction retourne un tableau d'objets "Event" en tant que promesse.
    const userFound = await this.userRepository.findOneBy({ id: userId });
    // Si l'utilisateur n'est pas trouvé, une exception "NotFoundException"
    // est levée avec un message spécifiant que l'utilisateur n'a pas été trouvé avec l'identifiant donné
    if (!userFound) {
      throw new NotFoundException(`pas d'utilisateur avec l'id : ${userId}`);
    }

    const foundEvents = await this.eventRepository
      // méthode "createQueryBuilder" pour construire une requête qui récupère les
      //  événements associés à l'utilisateur en utilisant son identifiant.
      .createQueryBuilder('event')
      // La méthode "leftJoinAndSelect" est utilisée pour joindre et sélectionner
      // des informations supplémentaires sur les organisateurs des événements,
      //  les participants et les catégories. La clause "where" est utilisée pour
      //  filtrer les événements par l'identifiant de l'utilisateur.
      //  Enfin, la méthode "getMany"
      // est utilisée pour exécuter la requête et
      // récupérer le résultat sous forme de tableau d'objets "Event".
      .leftJoinAndSelect('event.organisateur', 'organisateur')
      .leftJoinAndSelect('event.participants', 'participants')
      .leftJoinAndSelect('event.category', 'category')
      .where('organisateur.id = :id', { id: userId })
      .getMany();
    return foundEvents;
  }

  async findCreatedChild(userId: string): Promise<Child[]> {
    // On vérifie d'abord si le user existe
    const userFound = await this.userRepository.findOneBy({ id: userId });
    if (!userFound) {
      throw new NotFoundException(`pas d'utilisateur avec l'id : ${userId}`);
    }

    const foundChild = await this.childRepository
      .createQueryBuilder('children')
      .leftJoinAndSelect('children.parent', 'parent')
      .where('user.id = :id', { id: userId })
      .getMany();
    return foundChild;
  }

  async patch(
    email: string,
    updateUserDto: UpdateUserDto,
    connectedUser: User,
  ): Promise<User> {
    const upUser = await this.userRepository.findOneBy({ email: email });
    if (!upUser) {
      throw new NotFoundException(`pas d'user avec cet email : ${email}`);
    }

    if (email !== connectedUser.email && connectedUser.role !== 'admin') {
      throw new MethodNotAllowedException(
        `Vous ne pouvez pas modifier les informations d'un autre utilisateur`,
      );
    }
    const {
      password,
      name,

      picture,
    } = updateUserDto;

    if (password) {
      const salt = await bcrypt.genSalt();
      console.log('génération du salt : ', salt);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log('mot de passe haché : ', hashedPassword);
      upUser.password = hashedPassword;
    }
    upUser.email = email;
    upUser.name = name;
    upUser.picture = picture;

    await this.userRepository.save(upUser);
    const updatedUser = await this.findOne(email);
    delete updatedUser.password;
    return updatedUser;
  }

  async remove(email: string): Promise<string> {
    const result = await this.userRepository.delete({ email });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas d'utilisateur avec l'email : ${email}`);
    }
    return `l'utilisateur avec l'email #${email} a disparu ! :o`;
  }
}
