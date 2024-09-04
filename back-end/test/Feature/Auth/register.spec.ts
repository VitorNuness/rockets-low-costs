import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { RegisterController } from '../../../src/Controllers/Auth/register.controller';

describe('RegisterController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RegisterController]
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();
  })

  describe('can register a new user', () => {
    it('should access the register route', () => {
      return request(app.getHttpServer())
        .post('/register')
        .send({name: "Joe", age: 32})
        .expect(201);
    });

    it('should require a name', () => {
      return request(app.getHttpServer())
        .post('/register')
        .send({name: '', age: 32})
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('O nome deve ser preenchido.')
        });
    });

    it('should name must be a string', () => {
      return request(app.getHttpServer())
        .post('/register')
        .send({name: 0, age: 32})
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('O nome deve ser um texto.')
        });
    });

    it('should be max of 50 characters to name', () => {
      return request(app.getHttpServer())
        .post('/register')
        .send({name: 'a'.repeat(51), age: 32})
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('O nome deve conter no máximo 50 carácteres.')
        });
    });

    it('should be min of 2 characters to name', () => {
      return request(app.getHttpServer())
        .post('/register')
        .send({name: 'a', age: 32})
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('O nome deve conter no mínimo 2 carácteres.')
        });
    });

    it('should require a age', () => {
      return request(app.getHttpServer())
        .post('/register')
        .send({name: 'Joe', age: null})
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('A idade deve ser preenchida.')
        });
    });

    it('should age must be a integer', () => {
      return request(app.getHttpServer())
        .post('/register')
        .send({name: 'Joe', age: 'four'})
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('A idade deve ser um número inteiro.')
        });
    });

    it('should be max of 110 to age', () => {
      return request(app.getHttpServer())
        .post('/register')
        .send({name: 'Joe', age: 111})
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('A idade máxima permitida são 110 anos.')
        });
    });

    it('should be min of 1 to age', () => {
      return request(app.getHttpServer())
        .post('/register')
        .send({name: 'Joe', age: 0})
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('A idade mínima permitida é 1 ano.')
        });
    });
  });

  afterAll(async () => {
    await app.close();
  })
});
