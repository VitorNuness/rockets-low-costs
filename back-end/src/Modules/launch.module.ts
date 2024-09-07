import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LaunchController } from '../Controllers/launch.controller';
import { Launch, LaunchSchema } from '../Schemas/launch.schema';
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
  controllers: [LaunchController],
  providers: [LaunchService, UserService],
  exports: [LaunchService],
})
export class LaunchModule {}
