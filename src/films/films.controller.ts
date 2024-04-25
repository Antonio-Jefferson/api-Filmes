import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { Film } from './entities/film.entity';
import { CreateFilmDto } from './dtos/create-film.dto';
import { UpdateFilmDto } from './dtos/update-film.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  async create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  async findAll(): Promise<Film[]> {
    return this.filmsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.filmsService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(+id, updateFilmDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.filmsService.remove(+id);
  }
}
