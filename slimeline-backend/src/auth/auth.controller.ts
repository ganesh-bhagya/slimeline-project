import { Controller, Post, Get, Body, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    if (!body.username || !body.password) {
      throw new UnauthorizedException('Username and password are required');
    }

    return await this.authService.login(body.username, body.password);
  }

  @Post('logout')
  async logout() {
    // JWT is stateless, so logout is handled client-side by removing the token
    return { success: true };
  }

  @Get('check')
  @UseGuards(AuthGuard)
  async check(@Req() req: Request) {
    // If AuthGuard passes, the user is authenticated
    const user = (req as any).user;
    return {
      authenticated: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}

