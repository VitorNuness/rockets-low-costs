import * as request from 'supertest';
import { app } from '../setup';
import { Model, now } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from '../../src/Schemas/user.schema';
import { Launch, LaunchDocument } from '../../src/Schemas/launche.schema';

describe('Launch resources', () => {
  let userModel: Model<UserDocument>;
  let launchModel: Model<LaunchDocument>;

  beforeAll(() => {
    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
    launchModel = app.get<Model<LaunchDocument>>(getModelToken(Launch.name));
  });

  it('should access missions endpoint', async () => {
    await userModel.deleteMany();
    const userDb = new userModel({ name: 'joe', age: 21 });
    await userDb.save();
    return request(app.getHttpServer()).get('/joe/launches').expect(200);
  });

  it('should be get user launches', async () => {
    await userModel.deleteMany();
    const userDb = new userModel({ name: 'joe', age: 21 });
    const user = await userDb.save();

    const launchDb = new launchModel({
      rocket: {
        name: 'Falcon 9',
        status: true,
        cost: 50000000,
        image: 'falcon9.png',
      },
      mission: {
        missionId: 1,
        name: 'Starlink 1',
        year: '2024',
      },
      profit: 5,
      total: 60000000,
      data: now(),
      user: user._id,
    });
    await launchDb.save();

    const response = await request(app.getHttpServer()).get('/joe/launches');

    expect(Array.isArray(response.body)).toBeTruthy();
  });
});
