import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/testimonials')
export class TestimonialsController {
  constructor(private testimonialsService: TestimonialsService) {}

  @Get()
  async findAll(@Query('admin') admin: string) {
    const list = await this.testimonialsService.findAll(admin === 'true');
    return { testimonials: list };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.testimonialsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body()
    body: {
      quote: string;
      author_name: string;
      author_location?: string;
      image?: string;
      gallery_images?: string[];
      sort_order?: number;
    },
  ) {
    if (!body.quote || !body.author_name) {
      throw new Error('Quote and author name are required');
    }
    return this.testimonialsService.create(body);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      quote?: string;
      author_name?: string;
      author_location?: string;
      image?: string;
      gallery_images?: string[];
      sort_order?: number;
    },
  ) {
    return this.testimonialsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.testimonialsService.delete(id);
  }
}
