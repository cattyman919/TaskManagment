import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async register(registerData: registerDto) {
    return await this.userService.createUser(registerData);
  }
  async login(loginData: LoginDTO) {
    const user = await this.userService.findByEmail(loginData.email);
    if (!user)
      throw new HttpException('User Does Not Exist', HttpStatus.NOT_FOUND);
    return user;
  }
}
