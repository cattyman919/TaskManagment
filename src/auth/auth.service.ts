import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { registerDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async register(registerData: registerDto) {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    return await this.userService.createUser({
      ...registerData,
      password: hashedPassword,
    });
  }
  async login(loginData: LoginDTO) {
    const user = await this.userService.findByEmail(loginData.email);
    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    const validCredentials = await this.verifyPassword(
      loginData.password,
      user.password,
    );
    if (!validCredentials)
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    return user;
  }

  async verifyPassword(plainText, hashedText) {
    return bcrypt.compare(plainText, hashedText);
  }
}
