import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PackagesService {
  private readonly baseUrl: string;

  constructor(private databaseService: DatabaseService) {
    // Get base URL from environment or construct it
    const port = process.env.PORT || 3001;
    const host = process.env.HOST || 'localhost';
    const protocol = process.env.PROTOCOL || 'http';
    this.baseUrl = process.env.BASE_URL || `${protocol}://${host}:${port}`;
  }

  /**
   * Convert image path to full URL
   */
  private getImageUrl(imagePath: string | null | undefined): string {
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

  private parseJsonField(field: any, defaultValue: any = null): any {
    if (field && typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch (e) {
        return defaultValue;
      }
    }
    return field || defaultValue;
  }

  private parsePackage(pkg: any) {
    pkg.images = this.parseJsonField(pkg.images, []);
    pkg.itinerary = this.parseJsonField(pkg.itinerary, []);

    if (pkg.inclusion !== undefined) {
      pkg.inclusion = this.parseJsonField(pkg.inclusion, {
        included: [],
        excluded: [],
        booking_information: '',
        cancellation_policy: '',
      });
    } else if (pkg.included !== undefined || pkg.excluded !== undefined) {
      pkg.inclusion = {
        included: this.parseJsonField(pkg.included, []),
        excluded: this.parseJsonField(pkg.excluded, []),
        booking_information: '',
        cancellation_policy: '',
      };
    } else {
      pkg.inclusion = {
        included: [],
        excluded: [],
        booking_information: '',
        cancellation_policy: '',
      };
    }

    if (pkg.summary !== undefined) {
      pkg.summary = this.parseJsonField(pkg.summary, {
        description: '',
        activities: [],
        locations: [],
      });
    } else {
      pkg.summary = {
        description: '',
        activities: [],
        locations: [],
      };
    }

    if (!pkg.name && pkg.title) {
      pkg.name = pkg.title;
    }

    // Convert all image paths to full URLs
    // Main image
    pkg.image = this.getImageUrl(pkg.image);

    // Images array
    if (Array.isArray(pkg.images)) {
      pkg.images = pkg.images.map((img: any) => {
        if (typeof img === 'string') {
          return this.getImageUrl(img);
        }
        if (img && img.url) {
          return { ...img, url: this.getImageUrl(img.url) };
        }
        return img;
      });
    }

    // Itinerary images
    if (Array.isArray(pkg.itinerary)) {
      pkg.itinerary = pkg.itinerary.map((day: any) => {
        const updatedDay = { ...day };
        
        // Day image
        if (day.image) {
          updatedDay.image = this.getImageUrl(day.image);
        }
        
        // Highlight images
        if (Array.isArray(day.highlight)) {
          updatedDay.highlight = day.highlight.map((highlight: any) => {
            if (highlight && highlight.img) {
              return { ...highlight, img: this.getImageUrl(highlight.img) };
            }
            return highlight;
          });
        }
        
        return updatedDay;
      });
    }

    return pkg;
  }

  async findAll(adminOnly: boolean = false) {
    const pool = this.databaseService.getPool();
    const [packages] = await pool.execute('SELECT * FROM packages ORDER BY created_at DESC');
    
    if (!Array.isArray(packages)) {
      return [];
    }

    return packages.map(pkg => this.parsePackage(pkg));
  }

  async findOne(id: number) {
    const pool = this.databaseService.getPool();
    const [packages] = await pool.execute('SELECT * FROM packages WHERE id = ?', [id]);

    if (!Array.isArray(packages) || packages.length === 0) {
      throw new NotFoundException('Package not found');
    }

    return this.parsePackage(packages[0]);
  }

  async findBySlug(slug: string) {
    const pool = this.databaseService.getPool();
    const [packages] = await pool.execute('SELECT * FROM packages WHERE slug = ?', [slug]);

    if (!Array.isArray(packages) || packages.length === 0) {
      throw new NotFoundException('Package not found');
    }

    return this.parsePackage(packages[0]);
  }

  async create(data: any) {
    const pool = this.databaseService.getPool();
    
    // Handle inclusion field - split into included/excluded for database
    const included = data.inclusion?.included || [];
    const excluded = data.inclusion?.excluded || [];
    
    const [result] = await pool.execute(
      `INSERT INTO packages 
       (title, slug, country, days, image, price, description, itinerary, included, excluded, summary, images)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name || data.title,
        data.slug,
        data.country,
        data.days,
        data.image || null,
        data.price || null,
        data.description || null,
        data.itinerary ? JSON.stringify(data.itinerary) : null,
        included.length > 0 ? JSON.stringify(included) : null,
        excluded.length > 0 ? JSON.stringify(excluded) : null,
        data.summary ? JSON.stringify(data.summary) : null,
        data.images ? JSON.stringify(data.images) : null,
      ]
    );

    const insertResult = result as any;
    return { id: insertResult.insertId, ...data };
  }

  async update(id: number, data: any) {
    const pool = this.databaseService.getPool();
    
    // Handle inclusion field - split into included/excluded for database
    const included = data.inclusion?.included || [];
    const excluded = data.inclusion?.excluded || [];
    
    await pool.execute(
      `UPDATE packages
       SET title = ?, slug = ?, country = ?, days = ?, image = ?, price = ?,
           description = ?, itinerary = ?, included = ?, excluded = ?, summary = ?, images = ?
       WHERE id = ?`,
      [
        data.name || data.title,
        data.slug,
        data.country,
        data.days,
        data.image || null,
        data.price || null,
        data.description || null,
        data.itinerary ? JSON.stringify(data.itinerary) : null,
        included.length > 0 ? JSON.stringify(included) : null,
        excluded.length > 0 ? JSON.stringify(excluded) : null,
        data.summary ? JSON.stringify(data.summary) : null,
        data.images ? JSON.stringify(data.images) : null,
        id,
      ]
    );

    return this.findOne(id);
  }

  async delete(id: number) {
    const pool = this.databaseService.getPool();
    await pool.execute('DELETE FROM packages WHERE id = ?', [id]);
  }
}

