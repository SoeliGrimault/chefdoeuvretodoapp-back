import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  async create(createChildDto: CreateChildDto): Promise<Child> {
    return await this.childRepository.save(createChildDto);
  }

  async findAll(): Promise<Child[]> {
    return await this.childRepository.find();
  }

  async findOne(name: string): Promise<Child> {
    const childFound = await this.childRepository.findOneBy({ name });
    if (!childFound) {
      throw new NotFoundException(
        `Il n'y a pas d'enfant avec le nom : ${name}, tu peux en faire un pour dans 9 mois!!!`,
      );
    }
    return childFound;
  }

  async update(name: string, updateChildDto: UpdateChildDto): Promise<Child> {
    const upChild = await this.findOne(name);
    upChild.name = updateChildDto.name;
    if (!upChild) {
      throw new NotFoundException(
        `Il n'y a pas d'enfant avec le nom: ${name}, je ne peux pas l'updater!`,
      );
    }
    return await this.childRepository.save(upChild);
  }

  async remove(name: string): Promise<string> {
    const resultRemove = await this.childRepository.delete({ name });
    if (resultRemove.affected === 0) {
      throw new NotFoundException(`pas d'enfant avec ce nom la: ${name}! oops`);
    }
    return `tu as supprimé ${name} correctement`;
  }
}
