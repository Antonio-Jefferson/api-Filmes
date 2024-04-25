import { IsOptional, IsString } from 'class-validator';

export class UpdateFilmDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly image?: string;
}
