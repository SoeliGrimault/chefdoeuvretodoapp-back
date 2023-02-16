import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { Document } from 'src/document/entities/document.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.save(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(name: string): Promise<Category> {
    const categoryFound = await this.categoryRepository.findOneBy({ name });
    if (!categoryFound) {
      throw new NotFoundException(
        `Il n'y a pas de categorie avec le nom : ${name} essaye encore!!!`,
      );
    }
    return categoryFound;
  }

  // async findDocumentByCateg(
  //   userId: string,
  //   connectedUser: User,
  // ): Promise<Document[]> {
  //   // On vérifie d'abord si le user existe
  //   const userFound = await this.userRepository.findOneBy({ id: userId });
  //   if (!userFound) {
  //     throw new NotFoundException(`pas d'utilisateur avec l'id : ${userId}`);
  //   }
  //   const foundDocs = await this.documentRepository.findBy({
  //     user: userFound,
  //   });

  //   return foundDocs;
  // }
  async update(
    name: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const upCategory = await this.findOne(name);
    upCategory.name = updateCategoryDto.name;
    if (!upCategory) {
      throw new NotFoundException(
        `Il n'y a pas de categorie avec le nom: ${name}`,
      );
    }
    return await this.categoryRepository.save(upCategory);
  }

  async remove(name: string): Promise<string> {
    const resultRemove = await this.categoryRepository.delete({ name });
    if (resultRemove.affected === 0) {
      throw new NotFoundException(`pas de category ${name} trouvée.`);
    }
    return `La catégorie ${name} a été supprimée correctement `;
  }
}
