import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}
  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    return await this.documentRepository.save(createDocumentDto);
  }

  async findAll(): Promise<Document[]> {
    return await this.documentRepository.find();
  }

  async findOne(name: string): Promise<Document> {
    const documentFound = await this.documentRepository.findOneBy({ name });
    if (!documentFound) {
      throw new NotFoundException(`il n'y a pas de doc avec ce nom ${name}`);
    }
    return documentFound;
  }

  async update(
    name: string,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    const upDocument = await this.findOne(name);
    upDocument.name = updateDocumentDto.name;
    if (!upDocument) {
      throw new NotFoundException(`pas de docum ${name}`);
    }
    return await this.documentRepository.save(upDocument);
  }

  async remove(name: string): Promise<string> {
    const resultRemove = await this.documentRepository.delete({ name });
    if (resultRemove.affected === 0) {
      throw new NotFoundException(`pas de doc ${name}`);
    }
    return `This action removes ${name} document`;
  }
}
