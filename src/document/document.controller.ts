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
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';

import { User } from 'src/user/entities/user.entity';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('document')
@UseGuards(AuthGuard())
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  create(
    @Body() createDocumentDto: CreateDocumentDto,
    @GetUser() connectedUser: User,
  ) {
    if (!createDocumentDto.name || !createDocumentDto.category)
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return this.documentService.create(createDocumentDto, connectedUser);
  }

  @Get()
  findAll(@GetUser() connectedUser: User) {
    return this.documentService.findAll(connectedUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() connectedUser: User) {
    return this.documentService.findOne(id, connectedUser);
  }

  @Get('child/:id')
  findAllDocByChild(@Param('id') childId: string) {
    return this.documentService.findAllDocByChild(childId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
    @GetUser() connectedUser: User,
  ) {
    if (!updateDocumentDto.name && !updateDocumentDto.category)
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return this.documentService.update(id, updateDocumentDto, connectedUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() connectedUser: User) {
    return this.documentService.remove(id, connectedUser);
  }
}
