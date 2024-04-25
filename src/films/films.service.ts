import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { CreateFilmDto } from './dtos/create-film.dto';
import { UpdateFilmDto } from './dtos/update-film.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const existingFilm = await this.filmRepository.findOne({
      where: { name: createFilmDto.name },
    });
    if (existingFilm) {
      throw new ConflictException('A film with this name already exists.');
    }
    const film = this.filmRepository.create(createFilmDto);
    return this.filmRepository.save(film);
  }

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  async findOne(id: number): Promise<Film> {
    const film = await this.filmRepository.findOne({ where: { id } });

    if (!film) {
      throw new NotFoundException('film not found');
    }

    return film;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto): Promise<Film> {
    const film = await this.filmRepository.findOne({ where: { id } });
    if (!film) {
      throw new NotFoundException('film not found');
    }

    // Atualiza apenas os campos definidos no DTO
    Object.assign(film, updateFilmDto);
    return this.filmRepository.save(film);
  }

  async remove(id: number): Promise<void> {
    const film = await this.filmRepository.findOne({ where: { id } });
    if (!film) {
      throw new NotFoundException('film not found');
    }

    await this.filmRepository.delete(id);
  }
}
