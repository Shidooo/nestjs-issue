import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ErrorHandlingProxy } from '@/common/proxy/ErrorHandlingProxy';
import { AController } from './a.controller';
import { AService } from '../../services/a.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'SVC-TRIP',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          customClass: ErrorHandlingProxy,
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('SVC_TRIP_HOST'),
            port: configService.get<number>('SVC_TRIP_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AController],
  providers: [AService],
  exports: [AService],
})
export class AModule {}
