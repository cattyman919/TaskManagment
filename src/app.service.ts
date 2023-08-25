import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'users/users.service';
import { Request } from 'express';
@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async CheckUser(req: Request): Promise<string> {
    const token = req.cookies.Authentication;

    if (!token) return 'NULL';

    // Verify token from cookies
    const { userId } = this.jwtService.verify(token);

    // Get the user
    const user = await this.userService.findById(userId);

    if (user) return user.username;

    return 'NULL';
  }
}
