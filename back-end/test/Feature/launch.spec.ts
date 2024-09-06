import * as request from 'supertest';
import { app } from '../setup';
import { Model, now } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from '../../src/Schemas/user.schema';
import { Launch, LaunchDocument } from '../../src/Schemas/launch.schema';

describe('Launch resources', () => {
  let userModel: Model<UserDocument>;
  let launchModel: Model<LaunchDocument>;

  beforeAll(() => {
    userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
    launchModel = app.get<Model<LaunchDocument>>(getModelToken(Launch.name));
  });

  describe('getUserLaunches', () => {
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

      await launchModel.deleteMany();
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
        date: now(),
        status: true,
        user: user._id,
      });
      await launchDb.save();

      const response = await request(app.getHttpServer()).get('/joe/launches');

      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('postUserLaunch', () => {
    it('should be an user can launch a rocket', async () => {
      await userModel.deleteMany();
      const userDb = new userModel({ name: 'joe', age: 21 });
      const user = await userDb.save();

      await launchModel.deleteMany();
      let launch = {
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
        date: now(),
        status: null,
      };

      await request(app.getHttpServer())
        .post('/joe/launches')
        .send(launch)
        .expect(201);
    });

    it('should be an user create a launch', async () => {
      await userModel.deleteMany();
      const userDb = new userModel({ name: 'joe', age: 21 });
      const user = await userDb.save();

      await launchModel.deleteMany();
      let launch = {
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
        date: now(),
        status: null,
      };

      await request(app.getHttpServer()).post('/joe/launches').send(launch);

      let launches = await launchModel.find().exec();

      expect(launches.length).toBe(1);
    });
  });

  describe('putUserLaunchProfit', () => {
    it('should be access the profit update route', async () => {
      await request(app.getHttpServer())
        .put('/joe/launches')
        .send({ profit: 10 })
        .expect(200);
    });
  });
});
