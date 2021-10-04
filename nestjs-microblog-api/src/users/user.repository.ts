import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(credentialsDto: CredentialsDto): Promise<void> {
    const { username, password } = credentialsDto;

    const salt = await bcrypt.genSalt();
    const user = new User();

    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);

    try {
      await user.save();
    } catch (err) {
      if (err.code === '23505')
        throw new ConflictException('duplicated username');
      else throw new InternalServerErrorException();
    }
  }
  async isPasswordCorrect(authCredentials: CredentialsDto): Promise<string> {
    const { username, password } = authCredentials;

    const user = await this.findOne({ username });

    if (user && (await user.isPasswordCorrect(password))) {
      return user.username;
    } else return null;
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
