import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    // environment variables
    NestConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().integer().default(3000),
        SVC_TRIP_HOST: Joi.string().default('127.0.0.1'),
        SVC_TRIP_PORT: Joi.number().integer().default(3004),
      }),
    }),
  ],
})
export class ConfigModule {}
