import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() registerData: registerDto) {
    return await this.authService.register(registerData);
  }

  @Post('login')
  async loginUser(@Body() loginData: LoginDTO) {
    return await this.authService.login(loginData);
  }
}
