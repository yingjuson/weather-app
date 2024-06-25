import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Observable } from 'rxjs';
import { WeatherInfoDto } from './dto/weather-info.dto';
import { AddressParams } from './dto/address-params.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get() // GET /weather?address=value
  @UsePipes(ValidationPipe)
  async getLocationWeather(
    @Query()
    query: AddressParams,
  ): Promise<Observable<WeatherInfoDto>> {
    return this.weatherService.getWeatherByAddress(query?.address);
  }
}
