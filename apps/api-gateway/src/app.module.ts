import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@/modules/config.module';
import { DriverOfferModule } from '@/modules/offer.module';
import { AModule } from './controllers/a/a.module';

@Module({
  imports: [
    DriverOfferModule,
    AModule,
    ConfigModule,
    RouterModule.register([
      { path: 'v1', module: AModule },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
