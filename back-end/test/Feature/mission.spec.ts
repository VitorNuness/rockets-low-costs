import * as request from 'supertest';
import { app } from '../setup';
import { Model, now } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from '../../src/Schemas/user.schema';
import { Launch, LaunchDocument } from '../../src/Schemas/launch.schema';

describe('Mission resources', () => {
  let userModel: Model<UserDocument>;
  let launchModel: Model<LaunchDocument>;

  beforeAll(() => {
    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
    launchModel = app.get<Model<LaunchDocument>>(getModelToken(Launch.name));
  });

  it('should access missions endpoint', () => {
    return request(app.getHttpServer()).get('/user/missions').expect(200);
  });

  test('can get available missions for user', async () => {
    await userModel.deleteMany();
    await launchModel.deleteMany();

    const userDb = new userModel({ name: 'joe', age: 21 });
    const user = await userDb.save();

    const launchDb = new launchModel({
      rocket: {
        name: 'Falcon 9',
        engine: 'mmmm',
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
      date: now(),
      user: user._id,
    });
    await launchDb.save();

    const response = await request(app.getHttpServer())
      .get(`/${user.name}/missions`)
      .expect(200);

    response.body.map((m: any) =>
      expect(m.mission_name).not.toBe('Starlink 1'),
    );
  });
});
