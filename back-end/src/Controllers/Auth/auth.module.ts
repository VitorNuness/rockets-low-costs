import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../Schemas/user.schema';
import { UserService } from '../../Services/user.service';
import { RegisterController } from './register.controller';
import { LoginController } from './login.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [RegisterController, LoginController],
  providers: [UserService],
})
export class AuthModule {}
