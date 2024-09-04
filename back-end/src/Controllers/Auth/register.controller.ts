import { Controller, Post } from "@nestjs/common";

@Controller('register')
export class RegisterController {
    @Post()
    register(): void {
        return;
    }
}
