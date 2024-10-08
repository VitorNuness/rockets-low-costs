import * as request from 'supertest';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { app } from '../../setup';
import { User, UserDocument } from '../../../src/Schemas/user.schema';

describe('RegisterController', () => {
  let userModel: Model<UserDocument>;

  beforeAll(() => {
    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should access the register route', () => {
    return request(app.getHttpServer())
      .post('/register')
      .send({ name: 'Joe', age: 32 })
      .expect(201);
  });

  it('should require a name', () => {
    return request(app.getHttpServer())
      .post('/register')
      .send({ name: '', age: 32 })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('O nome deve ser preenchido.');
      });
  });

  it('should name must be a string', () => {
    return request(app.getHttpServer())
      .post('/register')
      .send({ name: 0, age: 32 })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('O nome deve ser um texto.');
      });
  });

  it('should be max of 50 characters to name', () => {
    return request(app.getHttpServer())
      .post('/register')
      .send({ name: 'a'.repeat(51), age: 32 })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain(
          'O nome deve conter no máximo 50 carácteres.',
        );
      });
  });

  it('should be min of 2 characters to name', () => {
    return request(app.getHttpServer())
      .post('/register')
      .send({ name: 'a', age: 32 })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain(
          'O nome deve conter no mínimo 2 carácteres.',
        );
      });
  });

  it('should require a age', () => {
    return request(app.getHttpServer())
      .post('/register')
      .send({ name: 'Joe', age: null })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('A idade deve ser preenchida.');
      });
  });

  it('should age must be a integer', () => {
    return request(app.getHttpServer())
      .post('/register')
      .send({ name: 'Joe', age: 'four' })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain(
          'A idade deve ser um número inteiro.',
        );
      });
  });

  it('should be max of 110 to age', () => {
    return request(app.getHttpServer())
      .post('/register')
      .send({ name: 'Joe', age: 111 })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain(
          'A idade máxima permitida são 110 anos.',
        );
      });
  });

  it('should be min of 1 to age', () => {
    return request(app.getHttpServer())
      .post('/register')
      .send({ name: 'Joe', age: 0 })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('A idade mínima permitida é 1 ano.');
      });
  });

  it('should be store an user in database', async () => {
    request(app.getHttpServer())
      .post('/register')
      .send({ name: 'Joe', age: 32 })
      .expect(201);

    const user = await userModel.findOne({ name: 'joe' }).exec();
    expect(user).not.toBeNull();
    expect(user.name).toBe('joe');
    expect(user.age).toBe(32);

    const countUsers = await userModel.countDocuments().exec();
    expect(countUsers).toBe(1);
  });

  test('dont create an user if name already exist in database', async () => {
    await userModel.deleteMany();

    const userDb = new userModel({ name: 'Joe', age: 21 });
    await userDb.save();

    request(app.getHttpServer())
      .post('/register')
      .send({ name: 'Joe', age: 32 })
      .expect(400);

    const user = await userModel.findOne({ name: 'Joe' }).exec();
    expect(user.age).toBe(21);
  });
});
