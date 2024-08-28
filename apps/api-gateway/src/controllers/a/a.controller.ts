import {
  Controller,
  Patch,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { AService } from '../../services/a.service';

@Controller('a')
export class AController {

  constructor(
    private readonly aService: AService,
  ) {}

  @Patch('a')
  @ApiResponse({ status: 200, description: 'Offer paid' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Pay an offer' })
  public async a(): Promise<any> {
    const offerUpdated = await this.aService.a();
    return offerUpdated;
  }
}
