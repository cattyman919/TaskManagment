import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { registerDto } from './dto/register.dto';
import { UsersService } from 'users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerData: registerDto) {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    return await this.userService.createUser({
      ...registerData,
      password: hashedPassword,
    });
  }
  async ValidateUser(loginData: LoginDTO) {
    const user = await this.userService.findByEmail(loginData.email);
    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    const validCredentials = await this.verifyPassword(
      loginData.password,
      user.password,
    );
    if (!validCredentials)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);

    return user;
  }

  async verifyPassword(plainText, hashedText) {
    return bcrypt.compare(plainText, hashedText);
  }

  async logout() {
    return;
  }
}
