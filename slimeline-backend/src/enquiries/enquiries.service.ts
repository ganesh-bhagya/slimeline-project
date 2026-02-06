import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class EnquiriesService {
  constructor(
    private databaseService: DatabaseService,
    private emailService: EmailService,
  ) {}

  async findAll(status?: string) {
    const pool = this.databaseService.getPool();
    let query = 'SELECT * FROM enquiries ORDER BY created_at DESC';
    let params: any[] = [];

    if (status) {
      query = 'SELECT * FROM enquiries WHERE status = ? ORDER BY created_at DESC';
      params = [status];
    }

    const [enquiries] = await pool.execute(query, params);
    return Array.isArray(enquiries) ? enquiries : [];
  }

  async findOne(id: number) {
    const pool = this.databaseService.getPool();
    const [enquiries] = await pool.execute('SELECT * FROM enquiries WHERE id = ?', [id]);

    if (!Array.isArray(enquiries) || enquiries.length === 0) {
      throw new NotFoundException('Enquiry not found');
    }

    return enquiries[0];
  }

  async create(data: any) {
    const pool = this.databaseService.getPool();
    
    const normalizedTour = data.tour && data.tour !== 'Select Tour Country' ? data.tour : null;
    const normalizedDestination = data.destination && data.destination !== 'Select Tour Country' ? data.destination : null;
    
    const arrival = data.arrivalDate ? new Date(data.arrivalDate) : null;
    const departure = data.departureDate ? new Date(data.departureDate) : null;

    const [result] = await pool.execute(
      `INSERT INTO enquiries 
       (tour, name, email, mobile, living_country, nationality, destination, 
        arrival_date, departure_date, adults, children, flight_status, holiday_reason, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        normalizedTour,
        data.name,
        data.email,
        data.mobile || null,
        data.livingCountry || null,
        data.nationality || null,
        normalizedDestination,
        arrival ? arrival.toISOString().split('T')[0] : null,
        departure ? departure.toISOString().split('T')[0] : null,
        data.adults ? parseInt(data.adults) : null,
        data.children ? parseInt(data.children) : null,
        data.flightStatus || null,
        data.holidayReason || null,
        data.message || null,
      ]
    );

    // Get the inserted enquiry to send email
    const insertResult = result as any;
    const [enquiries] = await pool.execute('SELECT * FROM enquiries WHERE id = ?', [insertResult.insertId]);
    const enquiry = Array.isArray(enquiries) && enquiries.length > 0 ? enquiries[0] : null;

    // Send email notification (don't fail if email fails)
    if (enquiry) {
      try {
        await this.emailService.sendEnquiryEmail(enquiry);
      } catch (error) {
        console.error('Failed to send enquiry email:', error);
        // Continue even if email fails
      }
    }

    return { success: true, message: 'Enquiry submitted successfully' };
  }

  async updateStatus(id: number, status: string) {
    const pool = this.databaseService.getPool();
    await pool.execute('UPDATE enquiries SET status = ? WHERE id = ?', [status, id]);
    return { success: true };
  }

  async delete(id: number) {
    const pool = this.databaseService.getPool();
    await pool.execute('DELETE FROM enquiries WHERE id = ?', [id]);
    return { success: true };
  }
}

