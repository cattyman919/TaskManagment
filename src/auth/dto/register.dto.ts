import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class registerDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  password: string;
}
