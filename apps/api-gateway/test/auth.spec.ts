import request from 'supertest';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '@/controllers/auth/auth.module';
import { ConfigModule } from '@/modules/config.module';
import { AuthLoginInput } from '@/controllers/auth/inputs/auth-login';
import { Tokens } from '@/models';

describe('App Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        ConfigModule,
        //RouterModule.register([
        //  { path: 'v1', module: AuthModule },
        //]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/login (POST)', () => {
    const requestBody: AuthLoginInput = {
      email: faker.internet.email(),
      password: faker.internet.password(), // normally hashed
    };

    const expectedResponse: Tokens = {
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    };

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(requestBody)
      .expect(200)
      .expect(expectedResponse);
  });
});
