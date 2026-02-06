import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EnquiriesService } from './enquiries.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/enquiries')
export class EnquiriesController {
  constructor(private enquiriesService: EnquiriesService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Query('status') status: string) {
    return { enquiries: await this.enquiriesService.findAll(status) };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return { enquiry: await this.enquiriesService.findOne(id) };
  }

  @Post()
  async create(@Body() data: any) {
    if (!data.name || !data.email) {
      throw new Error('Name and email are required');
    }
    return await this.enquiriesService.create(data);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: { status: string }) {
    if (!body.status) {
      throw new Error('Status is required');
    }
    return await this.enquiriesService.updateStatus(id, body.status);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.enquiriesService.delete(id);
  }
}

