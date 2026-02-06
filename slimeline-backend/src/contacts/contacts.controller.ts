import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Query('status') status: string) {
    return { contacts: await this.contactsService.findAll(status) };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return { contact: await this.contactsService.findOne(id) };
  }

  @Post()
  async create(@Body() data: { name: string; email: string; subject: string; message: string }) {
    if (!data.name || !data.email || !data.subject || !data.message) {
      throw new Error('Name, email, subject, and message are required');
    }
    return await this.contactsService.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: { status: string }) {
    if (!body.status) {
      throw new Error('Status is required');
    }
    return await this.contactsService.updateStatus(id, body.status);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.contactsService.delete(id);
  }
}

