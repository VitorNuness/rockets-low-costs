import { Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  @Post()
  login(@Res() res: Response): any {
    return res.status(HttpStatus.OK).send();
  }
}
