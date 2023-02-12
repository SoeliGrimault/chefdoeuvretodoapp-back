import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RoleEnumType } from 'src/user/entities/user.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
@UseGuards(AuthGuard())
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    if (!createCategoryDto.name)
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':name')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  findOne(@Param('name') name: string) {
    return this.categoryService.findOne(name);
  }

  @Patch(':name')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  update(
    @Param('name') name: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    if (!updateCategoryDto.name)
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return this.categoryService.update(name, updateCategoryDto);
  }

  @Delete(':name')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(RoleEnumType.ADMIN)
  remove(@Param('name') name: string) {
    return this.categoryService.remove(name);
  }
}
