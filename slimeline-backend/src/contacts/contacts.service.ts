import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class ContactsService {
  constructor(
    private databaseService: DatabaseService,
    private emailService: EmailService,
  ) {}

  async findAll(status?: string) {
    const pool = this.databaseService.getPool();
    let query = 'SELECT * FROM contacts ORDER BY created_at DESC';
    let params: any[] = [];

    if (status) {
      query = 'SELECT * FROM contacts WHERE status = ? ORDER BY created_at DESC';
      params = [status];
    }

    const [contacts] = await pool.execute(query, params);
    return Array.isArray(contacts) ? contacts : [];
  }

  async findOne(id: number) {
    const pool = this.databaseService.getPool();
    const [contacts] = await pool.execute('SELECT * FROM contacts WHERE id = ?', [id]);

    if (!Array.isArray(contacts) || contacts.length === 0) {
      throw new NotFoundException('Contact not found');
    }

    return contacts[0];
  }

  async create(data: { name: string; email: string; subject: string; message: string }) {
    const pool = this.databaseService.getPool();
    const [result] = await pool.execute(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [data.name, data.email, data.subject, data.message]
    );

    // Send email notification (don't fail if email fails)
    try {
      await this.emailService.sendContactEmail(data);
    } catch (error) {
      console.error('Failed to send contact email:', error);
      // Continue even if email fails
    }

    return { success: true, message: 'Contact submitted successfully' };
  }

  async updateStatus(id: number, status: string) {
    const pool = this.databaseService.getPool();
    await pool.execute('UPDATE contacts SET status = ? WHERE id = ?', [status, id]);
    return { success: true, message: 'Contact updated successfully' };
  }

  async delete(id: number) {
    const pool = this.databaseService.getPool();
    await pool.execute('DELETE FROM contacts WHERE id = ?', [id]);
    return { success: true };
  }
}

