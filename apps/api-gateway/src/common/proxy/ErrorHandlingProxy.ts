import { ClientTCP, RpcException } from '@nestjs/microservices';

export class ErrorHandlingProxy extends ClientTCP {
  serializeError(err: Error) {
    console.log('must be called', err);
    return new RpcException(err);
  }
}