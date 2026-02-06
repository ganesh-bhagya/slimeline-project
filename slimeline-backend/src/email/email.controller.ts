import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/email-settings')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getSettings() {
    const settings = await this.emailService.getEmailSettings();
    return { settings };
  }

  @Post()
  @UseGuards(AuthGuard)
  async updateSettings(@Body() body: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    password: string;
    from_email: string;
    from_name: string;
  }) {
    if (!body.host || !body.user || !body.password || !body.from_email || !body.from_name) {
      throw new Error('Missing required fields');
    }
    return await this.emailService.updateEmailSettings(body);
  }
}


