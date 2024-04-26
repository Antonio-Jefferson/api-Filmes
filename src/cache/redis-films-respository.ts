import { Injectable } from '@nestjs/common';
import { Film } from '../films/entities/film.entity';
import { RedisService } from 'src/config/redis';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RedisFilmsRepository {
  constructor(
    private readonly redis: RedisService,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async findMany(): Promise<Film[]> {
    const cacheFilms = await this.redis.get('films');

    if (!cacheFilms) {
      const films = await this.filmRepository.find();

      await this.redis.set('films', JSON.stringify(films), 'EX', 20);
      console.log('\x1b[33m%\x1b[0m', 'From Cache');
      return films;
    }
    console.log('\x1b[36m%\x1b[0m', 'From Cache');

    return JSON.parse(cacheFilms);
  }
}
