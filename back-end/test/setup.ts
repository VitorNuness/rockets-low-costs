import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AuthModule } from '../src/Modules/auth.module';
import { MissionModule } from '../src/Modules/mission.module';
import { LaunchModule } from 'src/Modules/launch.module';

let mongo: MongoMemoryServer;
let app: INestApplication;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);

  const moduleRef = await Test.createTestingModule({
    imports: [
      AuthModule,
      MissionModule,
      LaunchModule,
      MongooseModule.forRoot(uri),
    ],
    providers: [],
    controllers: [],
  }).compile();

  app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
  await app.close();
});

export { app };
