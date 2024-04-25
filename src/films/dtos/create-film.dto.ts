import { IsString } from 'class-validator';

export class CreateFilmDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;
}
