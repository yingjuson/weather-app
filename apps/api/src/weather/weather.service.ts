import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Observable, catchError, map } from 'rxjs';
import { WeatherInfoDto } from './dto/weather-info.dto';

@Injectable()
export class WeatherService {
  private logger = new Logger();

  constructor(private httpService: HttpService) {}

  getWeatherByAddress(address: string): Observable<WeatherInfoDto> {
    this.logger.log(`Getting weather info by address: ${address}`);

    const weatherInfo = this.httpService
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${address}&units=metric&appid=e3eb16ae49594bb986d1ee0b7be61b23`,
      )
      .pipe(
        map((response) => ({
          main: response.data.weather[0].main,
          description: response.data.weather[0].description,
          temperature: response.data.main.temp,
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed,
        })),
        catchError((err) => {
          this.logger.debug(err.config);
          throw new HttpException(
            {
              message: 'AxiosError',
              error: err.response.statusText,
              statusCode: err.response.status,
            },
            err.response.status,
          );
        }),
      );

    return weatherInfo;
  }

  getWeatherByCoords(
    latitude: string | number,
    longitude: string | number,
  ): Observable<WeatherInfoDto> {
    this.logger.log(
      `Getting weather info by coordinates. Latitude: ${latitude} Longitude: ${longitude}`,
    );

    const weatherInfo = this.httpService
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e3eb16ae49594bb986d1ee0b7be61b23`,
      )
      .pipe(
        map((response) => ({
          main: response.data.weather[0].main,
          description: response.data.weather[0].description,
          temperature: response.data.main.temp,
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed,
        })),
        catchError((err) => {
          this.logger.debug(err.config);
          throw new HttpException(
            {
              message: 'AxiosError',
              error: err.response.statusText,
              statusCode: err.response.status,
            },
            err.response.status,
          );
        }),
      );

    return weatherInfo;
  }
}
