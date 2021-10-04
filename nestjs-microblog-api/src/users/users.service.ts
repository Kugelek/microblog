import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtTokenPayload } from './jwt-token-payload';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(credentialsDto: CredentialsDto): Promise<void> {
    return this.userRepository.register(credentialsDto);
  }

  async signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.isPasswordCorrect(
      credentialsDto,
    );
    if (!username) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    const jwtPayload: JwtTokenPayload = { username };
    const accessToken = await this.jwtService.sign(jwtPayload);
    return { accessToken };
  }
}
