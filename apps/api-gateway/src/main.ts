import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { RpcExceptionFilter } from './common/filters/RpcExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setVersion('0.0.1')
    .addTag('Intellitrans')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useWebSocketAdapter(new IoAdapter(app));
  app.useGlobalFilters(new RpcExceptionFilter());
  // TODO not in production
  app.enableCors();

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('PORT');

  await app.listen(port);
}
bootstrap();
