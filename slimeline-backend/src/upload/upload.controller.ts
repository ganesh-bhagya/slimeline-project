import { Controller, Post, UseGuards, BadRequestException } from '@nestjs/common';
import { UploadService } from './upload.service';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFile } from '@nestjs/common';

@Controller('api/upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    try {
      const result = await this.uploadService.uploadFile(file);
      return {
        success: true,
        path: result.path,
        url: result.url,
        filename: result.path.split('/').pop(),
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Error uploading file');
    }
  }
}

