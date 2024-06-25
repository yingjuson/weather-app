import { IsString, IsInt } from 'class-validator';

export class WeatherInfoDto {
  @IsString()
  main: string;

  @IsString()
  description: string;

  @IsInt()
  humidity: number;

  @IsInt()
  windSpeed: number;

  @IsInt()
  temperature: number;
}
