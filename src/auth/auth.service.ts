import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { registerDto } from './dto/register.dto';
import { UsersService } from 'users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'users/entities/user.entity';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerData: registerDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    return await this.userService.createUser({
      ...registerData,
      password: hashedPassword,
    });
  }
  async ValidateUser(loginData: LoginDTO): Promise<User> {
    const user = await this.userService.findByEmail(loginData.email);
    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    const validCredentials = await this.verifyPassword(
      loginData.password,
      user.password,
    );
    if (!validCredentials)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);

    return await user;
  }

  async verifyPassword(plainText, hashedText) {
    return bcrypt.compare(plainText, hashedText);
  }

  // After Login Success, Generate JWT Token
  login(request: Request, user: User): User {
    const payload = { userId: user.id };
    const token = this.jwtService.sign(payload);
    const AuthCookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
    request.res.setHeader('Set-Cookie', AuthCookie);
    return user;
  }

  logoutCookie() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
