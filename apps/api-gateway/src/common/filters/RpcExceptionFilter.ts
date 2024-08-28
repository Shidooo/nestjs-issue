import { Catch, RpcExceptionFilter as IRpcExceptionFilter, ArgumentsHost, HttpException, InternalServerErrorException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements IRpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const nestedException = exception.getError();

    if (nestedException instanceof HttpException) {
      response
        .status(nestedException.getStatus())
        .json(nestedException.getResponse());
    } else {
      const internalServerErrorException = new InternalServerErrorException();
      response
        .status(internalServerErrorException.getStatus())
        .json(internalServerErrorException.getResponse());
     }
  }
}
