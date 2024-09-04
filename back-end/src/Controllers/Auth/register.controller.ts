import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDTO } from "../../../src/DTOs/Auth/register_user.dto";

@Controller('register')
export class RegisterController {
    @Post()
    register(@Body() registerUserDTO: RegisterUserDTO): void {
        return;
    }
}
