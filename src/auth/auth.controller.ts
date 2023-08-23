import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { LocalAuthGuard } from '@AuthGuards/local-auth.guard';
import { Request } from '@nestjs/common';
import { JwtAuthGuard } from '@AuthGuards/jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
  @Post('register')
  registerUser(@Body() registerData: registerDto) {
    return this.authService.register(registerData);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  loginUser(@Request() req) {
    return this.authService.login(req, req.user);
  }
}
