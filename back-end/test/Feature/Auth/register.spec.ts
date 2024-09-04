import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { RegisterController } from '../../../src/Controllers/Auth/register.controller';

describe('RegisterController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RegisterController]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  })

  describe('can register a new user', () => {
    it('should access the register route', () => {
      return request(app.getHttpServer())
        .post('/register')
        .expect(201);
    });
  });

  afterAll(async () => {
    await app.close();
  })
});
