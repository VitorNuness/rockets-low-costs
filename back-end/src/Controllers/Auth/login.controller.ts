import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginDTO } from '../../DTOs/Auth/login.dto';
import { UserService } from '../../Services/user.service';
import { User } from '../../Schemas/user.schema';

@Controller('login')
export class LoginController {
    constructor(private userService: UserService) {}

    @Post()
      @HttpCode(200)
  async login(@Body() loginDTO: LoginDTO): Promise<User> {
        const user = await this.userService.findUserByName(loginDTO.name);
        if (!user) {
            throw new HttpException('Este nome não está cadastrado.', HttpStatus.NOT_FOUND);
        }
    return user;
  }
}
