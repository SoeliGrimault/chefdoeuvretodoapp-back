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
} from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  create(@Body() createChildDto: CreateChildDto) {
    if (!createChildDto.name)
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return this.childrenService.create(createChildDto);
  }

  @Get()
  findAll() {
    return this.childrenService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.childrenService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateChildDto: UpdateChildDto) {
    if (!updateChildDto.name)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    return this.childrenService.update(name, updateChildDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.childrenService.remove(name);
  }
}
