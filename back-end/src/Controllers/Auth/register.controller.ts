import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { RegisterUserDTO } from '../../../src/DTOs/Auth/register_user.dto';
import { User } from '../../../src/Schemas/user.schema';
import { UserService } from '../../Services/user.service';

@Controller('register')
@Injectable()
export class RegisterController {
  constructor(private userService: UserService) {}

  @Post()
  async register(@Body() registerUserDTO: RegisterUserDTO): Promise<User> {
    const user = await this.userService.store(registerUserDTO);
    return user;
  }
}
