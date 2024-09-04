import { Module } from '@nestjs/common';
import { RegisterController } from './Controllers/Auth/register.controller';

@Module({
  imports: [],
  controllers: [RegisterController],
  providers: [],
})
export class AppModule {}
