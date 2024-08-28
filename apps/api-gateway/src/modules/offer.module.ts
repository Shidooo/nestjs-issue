import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // microservices registration
    ClientsModule.registerAsync([
      {
        name: 'SVC-TRIP',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
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
  controllers: [],
})
export class DriverOfferModule {}
