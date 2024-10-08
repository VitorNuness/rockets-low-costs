import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../Modules/auth.module';
import { LaunchModule } from './launch.module';
import { MissionModule } from './mission.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/rockets_low_costs'),
    AuthModule,
    LaunchModule,
    MissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
