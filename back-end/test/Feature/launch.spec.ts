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
          engine: 'mmmm',
          status: true,
          cost: 50000000,
          image: 'falcon9.png',
        },
        mission: {
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
          engine: 'mmmm',
          status: true,
          cost: 50000000,
          image: 'falcon9.png',
        },
        mission: {
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
          engine: 'mmmm',
          status: true,
          cost: 50000000,
          image: 'falcon9.png',
        },
        mission: {
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

    it('should be cant launch and store profit with inactive rocket', async () => {
      await userModel.deleteMany();
      const userDb = new userModel({ name: 'joe', age: 21 });
      const user = await userDb.save();

      await launchModel.deleteMany();
      let launch = {
        rocket: {
          name: 'Falcon 9',
          engine: 'mmmm',
          status: false,
          cost: 50000000,
          image: 'falcon9.png',
        },
        mission: {
          name: 'Starlink 1',
          year: '2024',
        },
        profit: 5,
        date: now(),
        status: null,
      };

      await request(app.getHttpServer()).post('/joe/launches').send(launch);

      let launchDB = await launchModel.findOne({ user: user._id }).exec();

      expect(launchDB.status).toBeFalsy();
      expect(launchDB.total).toBeNull();
      expect(launchDB.profit).toBeNull();
    });
  });

  describe('putUserLaunchProfit', () => {
    it('should be access the profit update route', async () => {
      await userModel.deleteMany();
      const userDb = new userModel({ name: 'joe', age: 21 });
      const user = await userDb.save();

      await launchModel.deleteMany();
      let launchDb = new launchModel({
        rocket: {
          name: 'Falcon 9',
          engine: 'mmmm',
          status: true,
          cost: 50000000,
          image: 'falcon9.png',
        },
        mission: {
          name: 'Starlink 1',
          year: '2024',
        },
        profit: 5,
        date: now(),
        status: true,
        user: userDb._id,
      });
      await launchDb.save();

      await request(app.getHttpServer())
        .put('/joe/launches')
        .send({ launchId: launchDb._id, profit: 10 })
        .expect(200);
    });

    it('should be update a launch profit', async () => {
      await userModel.deleteMany();
      const userDb = new userModel({ name: 'joe', age: 21 });
      const user = await userDb.save();

      await launchModel.deleteMany();
      let launchDb = new launchModel({
        rocket: {
          name: 'Falcon 9',
          engine: 'mmmm',
          status: true,
          cost: 50000000,
          image: 'falcon9.png',
        },
        mission: {
          name: 'Starlink 1',
          year: '2024',
        },
        profit: 5,
        date: now(),
        status: true,
        user: userDb._id,
      });
      await launchDb.save();

      await request(app.getHttpServer())
        .put('/joe/launches')
        .send({ launchId: launchDb._id, profit: 10 });

      let launch = await launchModel.findById(launchDb._id).exec();

      expect(launch.profit).toBe(10);
      expect(launch.total).toBe(launch.rocket.cost * (1 + 10 / 100));
    });

    it('should be delete a launch profit with receive a null profit from request', async () => {
      await userModel.deleteMany();
      const userDb = new userModel({ name: 'joe', age: 21 });
      const user = await userDb.save();

      await launchModel.deleteMany();
      let launchDb = new launchModel({
        rocket: {
          name: 'Falcon 9',
          engine: 'mmmm',
          status: true,
          cost: 50000000,
          image: 'falcon9.png',
        },
        mission: {
          name: 'Starlink 1',
          year: '2024',
        },
        profit: 5,
        date: now(),
        status: true,
        user: userDb._id,
      });
      await launchDb.save();

      await request(app.getHttpServer())
        .put('/joe/launches')
        .send({ launchId: launchDb._id, profit: null });

      let launch = await launchModel.findById(launchDb._id).exec();

      expect(launch.profit).toBe(null);
      expect(launch.total).toBe(null);
    });
  });
});
