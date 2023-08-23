import { Injectable } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  async register(registerData: registerDto) {
    return await this.userService.createUser(registerData);
  }
}
