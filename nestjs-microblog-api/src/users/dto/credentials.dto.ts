import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CredentialsDto {
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  username: string;
  @IsString()
  @MinLength(8)
  @MaxLength(25)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, {
    message: 'Password is not strong enough',
  })
  password: string;
}
