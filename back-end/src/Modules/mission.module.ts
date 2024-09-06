import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionController } from '../Controllers/mission.controller';
import { MissionService } from '../Services/mission.service';
import { Launch, LaunchSchema } from '../Schemas/launche.schema';
import { LaunchService } from '../Services/launch.service';
import { UserService } from '../Services/user.service';
import { User, UserSchema } from '../Schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Launch.name, schema: LaunchSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [MissionController],
  providers: [MissionService, LaunchService, UserService],
  exports: [MissionService],
})
export class MissionModule {}
