import { Controller, ForbiddenException } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller('a')
export class AController {

  constructor() {}

  @MessagePattern({ entity: 'b', action: 'a' })
  public async a(): Promise<any> {
    throw new RpcException(new ForbiddenException('Forbcasxadden'));
  }
}
