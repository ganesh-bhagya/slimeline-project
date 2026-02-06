import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TestimonialsService {
  constructor(private databaseService: DatabaseService) {}

  private parseGalleryImages(val: unknown): string[] {
    if (val == null || val === '') return [];
    if (Array.isArray(val)) return val;
    try {
      const parsed = typeof val === 'string' ? JSON.parse(val) : val;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  async findAll(admin = false) {
    const pool = this.databaseService.getPool();
    const query =
      'SELECT * FROM testimonials ORDER BY sort_order ASC, id ASC';
    const [rows] = await pool.execute(query);
    const list = Array.isArray(rows) ? rows : [];
    return list.map((row: any) => ({
      ...row,
      gallery_images: this.parseGalleryImages(row.gallery_images),
    }));
  }

  async findOne(id: number) {
    const pool = this.databaseService.getPool();
    const [rows] = await pool.execute(
      'SELECT * FROM testimonials WHERE id = ?',
      [id],
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      throw new NotFoundException('Testimonial not found');
    }

    const row = rows[0] as any;
    return {
      ...row,
      gallery_images: this.parseGalleryImages(row.gallery_images),
    };
  }

  async create(data: {
    quote: string;
    author_name: string;
    author_location?: string;
    image?: string;
    gallery_images?: string[];
    sort_order?: number;
  }) {
    const pool = this.databaseService.getPool();
    const sortOrder = data.sort_order ?? 0;
    const galleryJson =
      data.gallery_images?.length > 0
        ? JSON.stringify(data.gallery_images)
        : null;
    await pool.execute(
      'INSERT INTO testimonials (quote, author_name, author_location, image, gallery_images, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
      [
        data.quote,
        data.author_name,
        data.author_location ?? null,
        data.image ?? null,
        galleryJson,
        sortOrder,
      ],
    );
    return { success: true, message: 'Testimonial created successfully' };
  }

  async update(
    id: number,
    data: {
      quote?: string;
      author_name?: string;
      author_location?: string;
      image?: string;
      gallery_images?: string[];
      sort_order?: number;
    },
  ) {
    const pool = this.databaseService.getPool();
    await this.findOne(id); // ensure exists

    const updates: string[] = [];
    const values: any[] = [];

    if (data.quote !== undefined) {
      updates.push('quote = ?');
      values.push(data.quote);
    }
    if (data.author_name !== undefined) {
      updates.push('author_name = ?');
      values.push(data.author_name);
    }
    if (data.author_location !== undefined) {
      updates.push('author_location = ?');
      values.push(data.author_location);
    }
    if (data.image !== undefined) {
      updates.push('image = ?');
      values.push(data.image);
    }
    if (data.gallery_images !== undefined) {
      updates.push('gallery_images = ?');
      values.push(
        data.gallery_images?.length > 0
          ? JSON.stringify(data.gallery_images)
          : null,
      );
    }
    if (data.sort_order !== undefined) {
      updates.push('sort_order = ?');
      values.push(data.sort_order);
    }

    if (updates.length === 0) {
      return { success: true, message: 'Nothing to update' };
    }

    values.push(id);
    await pool.execute(
      `UPDATE testimonials SET ${updates.join(', ')} WHERE id = ?`,
      values,
    );
    return { success: true, message: 'Testimonial updated successfully' };
  }

  async delete(id: number) {
    const pool = this.databaseService.getPool();
    await this.findOne(id);
    await pool.execute('DELETE FROM testimonials WHERE id = ?', [id]);
    return { success: true };
  }
}
