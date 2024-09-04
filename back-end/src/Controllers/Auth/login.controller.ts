import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDTO } from '../../DTOs/Auth/login.dto';

@Controller('login')
export class LoginController {
  @Post()
  login(@Body() loginDTO: LoginDTO, @Res() res: Response): any {
    return res.status(HttpStatus.OK).send();
  }
}
