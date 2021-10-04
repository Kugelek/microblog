import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  register(
    @Body(ValidationPipe) credentialsDto: CredentialsDto,
  ): Promise<void> {
    return this.usersService.register(credentialsDto);
  }

  @Post('/login')
  signIn(
    @Body(ValidationPipe) credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.usersService.signIn(credentialsDto);
  }
}
