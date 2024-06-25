import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const exceptionResponse = exception.getResponse();

    const detailedException = {
      ...(typeof exceptionResponse === 'object' && exceptionResponse),
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    this.logger.error(detailedException);

    response.status(exception.getStatus()).send(exceptionResponse);
  }
}
