import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getAll() {
    return await this.authService.getAllUsers();
  }
  @Post('register')
  async registerUser(@Body() registerData: registerDto) {
    return await this.authService.register(registerData);
  }

  @Post('login')
  async loginUser() {}
}
