import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { Child } from './entities/child.entity';

@Injectable()
export class ChildrenService {
  //on ajoute le constructor
  constructor(
    // a quoi sert le inject et le private
    @InjectRepository(Child)
    private childRepository: Repository<Child>,
  ) {}
  // a quoi sert la dependence?
  async create(
    createChildDto: CreateChildDto,
    connectedUser: User,
  ): Promise<Child> {
    const newChild = { ...createChildDto, parent: connectedUser };
    return await this.childRepository.save(newChild);
  }

  async findAll(connectedUser: User): Promise<Child[]> {
    console.log('userconnected', connectedUser);
    // je souhaite recuperer uniquement mes enfants
    const childFound = await this.childRepository.findBy({
      parent: {
        id: connectedUser.id,
      },
    });
    if (childFound.length === 0) {
      throw new NotFoundException("pas d'enfant trouvé!");
    }
    return childFound;
  }

  async findOne(id: string, connectedUser: User): Promise<Child> {
    const childFound = await this.childRepository.findOneBy({
      id,
    });

    if (!childFound) {
      throw new NotFoundException(
        `Il n'y a pas d'enfant avec l'id: ${id}, tu peux en faire un pour dans 9 mois!!!`,
      );
    }

    if (childFound.parent.id !== connectedUser.id) {
      throw new UnauthorizedException(
        'vous ne pouvez pas trouver un enfant pas a vous',
      );
    }
    return childFound;
  }

  async update(
    id: string,
    updateChildDto: UpdateChildDto,
    connectedUser: User,
  ): Promise<Child> {
    const upChild = await this.findOne(id, connectedUser);

    upChild.name = updateChildDto.name;
    return await this.childRepository.save(upChild);
  }

  async remove(id: string, connectedUser: User): Promise<string> {
    await this.findOne(id, connectedUser);

    await this.childRepository.delete({ id });

    return `tu as supprimé ${id} correctement`;
  }
}
