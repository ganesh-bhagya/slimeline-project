import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class UploadService {
  private readonly baseUrl: string;

  constructor() {
    // Get base URL from environment or construct it
    const port = process.env.PORT || 3001;
    const host = process.env.HOST || 'localhost';
    const protocol = process.env.PROTOCOL || 'http';
    this.baseUrl = process.env.BASE_URL || `${protocol}://${host}:${port}`;
  }

  /**
   * Convert image path to full URL
   */
  private getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    
    // If already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If starts with /, it's a root path, prepend base URL
    if (imagePath.startsWith('/')) {
      return `${this.baseUrl}${imagePath}`;
    }
    
    // Otherwise, assume it's a relative path from public directory
    return `${this.baseUrl}/${imagePath}`;
  }

  async uploadFile(file: Express.Multer.File, uploadPath: string = 'public/assets/images/packages'): Promise<{ path: string; url: string }> {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error('Invalid file type. Only images are allowed.');
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error('File size too large. Maximum size is 10MB.');
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.originalname.split('.').pop();
    const filename = `${timestamp}-${randomString}.${extension}`;

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), uploadPath);
    await fs.mkdir(uploadDir, { recursive: true });

    // Save file
    const filepath = path.join(uploadDir, filename);
    await fs.writeFile(filepath, file.buffer);

    // Return both the path and the full URL
    const publicPath = `/assets/images/packages/${filename}`;
    return {
      path: publicPath,
      url: this.getImageUrl(publicPath)
    };
  }
}

