import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as process from 'process';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (!HttpStatus[httpStatus]) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    // log error (send alert etc...)

    const nestException = exception?.response?.message;
    const output =
      nestException ||
      (process.env.NODE_ENV !== 'PROD' // if no prod return full exception
        ? { errorMsg: exception?.message, stackTrace: exception?.stack }
        : 'something went wrong');

    httpAdapter.reply(ctx.getResponse(), output, httpStatus);
  }
}
