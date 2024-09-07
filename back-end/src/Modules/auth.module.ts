import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Schemas/user.schema';
import { UserService } from '../Services/user.service';
import { RegisterController } from '../Controllers/Auth/register.controller';
import { LoginController } from '../Controllers/Auth/login.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [RegisterController, LoginController],
  providers: [UserService],
  exports: [UserService],
})
export class AuthModule {}
