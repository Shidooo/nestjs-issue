import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AModule } from './controllers/offers/a.module';

@Module({
  imports: [
    AModule,
    // configuration service for environment variables
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().integer().default(3004),
        HOST: Joi.string().default('127.0.0.1'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
