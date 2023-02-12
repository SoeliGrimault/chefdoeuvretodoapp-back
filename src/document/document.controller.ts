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
import { RolesGuard } from 'src/auth/roles.guard';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('document')
@UseGuards(AuthGuard(), RolesGuard)
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    if (!createDocumentDto.name)
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return this.documentService.create(createDocumentDto);
  }

  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.documentService.findOne(name);
  }

  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    if (!updateDocumentDto.name)
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return this.documentService.update(name, updateDocumentDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.documentService.remove(name);
  }
}
