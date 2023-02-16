import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}
  async create(
    createDocumentDto: CreateDocumentDto,
    connectedUser: User,
  ): Promise<Document> {
    const newDoc = {
      ...createDocumentDto,
      user: connectedUser,
    };
    return await this.documentRepository.save(newDoc);
  }

  async findAll(connectedUser: User): Promise<Document[]> {
    const docFound = await this.documentRepository.findBy({
      user: {
        id: connectedUser.id,
      },
    });
    if (docFound.length === 0) {
      throw new NotFoundException('pas de doc trouvé');
    }
    return docFound;
  }

  async findOne(id: string, connectedUser: User): Promise<Document> {
    const documentFound = await this.documentRepository.findOneBy({ id });
    if (!documentFound) {
      throw new NotFoundException(`il n'y a pas de doc avec ce nom ${id}`);
    }
    if (
      documentFound.user.id !== connectedUser.id &&
      connectedUser.role !== 'admin'
    ) {
      throw new UnauthorizedException(
        'vous ne pouvez pas consulter un doc que vous avez pas creer',
      );
    }
    return documentFound;
  }
  async findAllDocByChild(childId: string): Promise<Document[]> {
    const docFound = await this.documentRepository.findBy({
      children: {
        id: childId,
      },
    });
    if (docFound.length === 0) {
      throw new NotFoundException('pas de doc Martins');
    }
    return docFound;
  }

  async update(
    id: string,
    updateDocumentDto: UpdateDocumentDto,
    connectedUser: User,
  ): Promise<Document> {
    const upDocument = await this.findOne(id, connectedUser);
    upDocument.name = updateDocumentDto.name;
    upDocument.category = updateDocumentDto.category;

    await this.documentRepository.save(upDocument);
    return await this.documentRepository.findOneBy({ id });
  }

  async remove(id: string, connectedUser: User): Promise<string> {
    await this.findOne(id, connectedUser);
    await this.documentRepository.delete({ id });

    return `This action removes ${id} document`;
  }
}
