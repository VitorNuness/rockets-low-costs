import * as request from 'supertest';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { app } from '../../setup';
import { User, UserDocument } from '../../../src/Schemas/user.schema';

describe('LoginController', () => {
  let userModel: Model<UserDocument>;

  beforeAll(() => {
    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should require a name', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ name: '' })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('O nome deve ser preenchido.');
      });
  });

  it('should name must be a string', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({ name: 0 })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('O nome deve ser um texto.');
      });
  });

  it('should be find an user by name in database', async () => {
    await userModel.deleteMany();

    const userDb = new userModel({ name: 'Joe', age: 21 });
    await userDb.save();

    const response = await request(app.getHttpServer())
      .post('/login')
      .send({ name: 'Joe' })
      .expect(200);

    expect(response.body).toHaveProperty('name', 'Joe');
    expect(response.body).toHaveProperty('age', 21);
  });

  test('response not found if user name dont exists in database', async () => {
    await userModel.deleteMany();

    await request(app.getHttpServer())
      .post('/login')
      .send({ name: 'Joe' })
      .expect(404);
  });
});
