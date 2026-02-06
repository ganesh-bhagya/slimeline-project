import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/packages')
export class PackagesController {
  constructor(private packagesService: PackagesService) {}

  @Get()
  async findAll(@Query('admin') admin: string, @Query('slug') slug: string) {
    if (slug) {
      return { package: await this.packagesService.findBySlug(slug) };
    }
    const adminOnly = admin === 'true';
    return { packages: await this.packagesService.findAll(adminOnly) };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return { package: await this.packagesService.findOne(id) };
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() data: any) {
    if (!data.name || !data.slug || !data.country || !data.days) {
      throw new Error('Missing required fields');
    }
    const result = await this.packagesService.create(data);
    return { success: true, package: result };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    const result = await this.packagesService.update(id, data);
    return { success: true, package: result };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.packagesService.delete(id);
    return { success: true };
  }
}
