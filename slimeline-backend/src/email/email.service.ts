import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor(
    private configService: ConfigService,
    private databaseService: DatabaseService,
  ) {}

  async getTransporter(): Promise<nodemailer.Transporter | null> {
    try {
      // Get email settings from database
      const pool = this.databaseService.getPool();
      const [settings] = await pool.execute(
        'SELECT * FROM email_settings WHERE id = 1'
      );

      if (!Array.isArray(settings) || settings.length === 0) {
        console.warn('Email settings not configured');
        return null;
      }

      const emailSettings = settings[0] as any;

      if (!emailSettings.host || !emailSettings.user || !emailSettings.password) {
        console.warn('Email settings incomplete');
        return null;
      }

      // Create transporter if settings exist
      // Port 465 requires secure: true, port 587 uses STARTTLS
      const port = emailSettings.port || 587;
      const isSecurePort = port === 465;
      const secure = isSecurePort || (emailSettings.secure === 1 || emailSettings.secure === true);

      this.transporter = nodemailer.createTransport({
        host: emailSettings.host,
        port: port,
        secure: secure, // true for 465, false for other ports
        auth: {
          user: emailSettings.user,
          pass: emailSettings.password,
        },
        tls: {
          // Do not fail on invalid certificates
          rejectUnauthorized: false,
        },
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000, // 10 seconds
        socketTimeout: 10000, // 10 seconds
      });

      return this.transporter;
    } catch (error) {
      console.error('Error creating email transporter:', error);
      return null;
    }
  }

  async getEmailSettings() {
    const pool = this.databaseService.getPool();
    const [settings] = await pool.execute(
      'SELECT * FROM email_settings WHERE id = 1'
    );

    if (!Array.isArray(settings) || settings.length === 0) {
      return null;
    }

    const emailSettings = settings[0] as any;
    // Don't return password
    return {
      id: emailSettings.id,
      host: emailSettings.host,
      port: emailSettings.port,
      secure: emailSettings.secure,
      user: emailSettings.user,
      from_email: emailSettings.from_email,
      from_name: emailSettings.from_name,
    };
  }

  async updateEmailSettings(settings: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    password: string;
    from_email: string;
    from_name: string;
  }) {
    const pool = this.databaseService.getPool();
    
    // Check if settings exist
    const [existing] = await pool.execute(
      'SELECT * FROM email_settings WHERE id = 1'
    );

    if (Array.isArray(existing) && existing.length > 0) {
      // Update existing
      await pool.execute(
        `UPDATE email_settings 
         SET host = ?, port = ?, secure = ?, user = ?, password = ?, from_email = ?, from_name = ?
         WHERE id = 1`,
        [
          settings.host,
          settings.port,
          settings.secure ? 1 : 0,
          settings.user,
          settings.password,
          settings.from_email,
          settings.from_name,
        ]
      );
    } else {
      // Insert new
      await pool.execute(
        `INSERT INTO email_settings 
         (id, host, port, secure, user, password, from_email, from_name)
         VALUES (1, ?, ?, ?, ?, ?, ?, ?)`,
        [
          settings.host,
          settings.port,
          settings.secure ? 1 : 0,
          settings.user,
          settings.password,
          settings.from_email,
          settings.from_name,
        ]
      );
    }

    // Reset transporter to reload settings
    this.transporter = null;
    return { success: true };
  }

  async sendEnquiryEmail(enquiryData: any) {
    const transporter = await this.getTransporter();
    if (!transporter) {
      console.warn('Email transporter not available, skipping email send');
      return;
    }

    const settings = await this.getEmailSettings();
    if (!settings) {
      console.warn('Email settings not found');
      return;
    }

    // Get base URL from config or use default
    const baseUrl = this.configService.get('BASE_URL') || 'https://slimelineholidays.com';
    const logoUrl = `${baseUrl}/src/assets/images/logo.webp`;

    const html = this.getEnquiryEmailTemplate(enquiryData, logoUrl);

    try {
      await transporter.sendMail({
        from: `"${settings.from_name}" <${settings.from_email}>`,
        to: settings.from_email, // Send to admin email
        replyTo: enquiryData.email,
        subject: `New Enquiry: ${enquiryData.tour || enquiryData.destination || 'Travel Package'}`,
        html,
      });
    } catch (error) {
      console.error('Error sending enquiry email:', error);
      throw error;
    }
  }

  async sendContactEmail(contactData: { name: string; email: string; subject: string; message: string }) {
    const transporter = await this.getTransporter();
    if (!transporter) {
      console.warn('Email transporter not available, skipping email send');
      return;
    }

    const settings = await this.getEmailSettings();
    if (!settings) {
      console.warn('Email settings not found');
      return;
    }

    // Get base URL from config or use default
    const baseUrl = this.configService.get('BASE_URL') || 'https://slimelineholidays.com';
    const logoUrl = `${baseUrl}/src/assets/images/logo.webp`;

    const html = this.getContactEmailTemplate(contactData, logoUrl);

    try {
      await transporter.sendMail({
        from: `"${settings.from_name}" <${settings.from_email}>`,
        to: settings.from_email, // Send to admin email
        replyTo: contactData.email,
        subject: `Contact Form: ${contactData.subject}`,
        html,
      });
    } catch (error) {
      console.error('Error sending contact email:', error);
      throw error;
    }
  }

  private getEnquiryEmailTemplate(enquiryData: any, logoUrl: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Enquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); padding: 30px; text-align: center;">
              <img src="${logoUrl}" alt="Slimeline Holidays" style="max-width: 200px; height: auto; margin-bottom: 10px;" />
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Travel Enquiry</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                You have received a new travel enquiry. Please find the details below:
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Name:</strong>
                    <span style="color: #333333; font-size: 14px; margin-left: 10px;">${enquiryData.name || 'N/A'}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Email:</strong>
                    <span style="color: #333333; font-size: 14px; margin-left: 10px;"><a href="mailto:${enquiryData.email}" style="color: #4CAF50; text-decoration: none;">${enquiryData.email || 'N/A'}</a></span>
                  </td>
                </tr>
                ${enquiryData.mobile ? `
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Mobile:</strong>
                    <span style="color: #333333; font-size: 14px; margin-left: 10px;"><a href="tel:${enquiryData.mobile}" style="color: #4CAF50; text-decoration: none;">${enquiryData.mobile}</a></span>
                  </td>
                </tr>
                ` : ''}
                ${enquiryData.tour ? `
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Tour:</strong>
                    <span style="color: #333333; font-size: 14px; margin-left: 10px;">${enquiryData.tour}</span>
                  </td>
                </tr>
                ` : ''}
                ${enquiryData.destination ? `
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Destination:</strong>
                    <span style="color: #333333; font-size: 14px; margin-left: 10px;">${enquiryData.destination}</span>
                  </td>
                </tr>
                ` : ''}
                ${enquiryData.arrival_date ? `
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Arrival Date:</strong>
                    <span style="color: #333333; font-size: 14px; margin-left: 10px;">${new Date(enquiryData.arrival_date).toLocaleDateString()}</span>
                  </td>
                </tr>
                ` : ''}
                ${enquiryData.departure_date ? `
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Departure Date:</strong>
                    <span style="color: #333333; font-size: 14px; margin-left: 10px;">${new Date(enquiryData.departure_date).toLocaleDateString()}</span>
                  </td>
                </tr>
                ` : ''}
                ${enquiryData.adults ? `
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Adults:</strong>
                    <span style="color: #333333; font-size: 14px; margin-left: 10px;">${enquiryData.adults}</span>
                  </td>
                </tr>
                ` : ''}
                ${enquiryData.children ? `
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Children:</strong>
                    <span style="color: #333333; font-size: 14px; margin-left: 10px;">${enquiryData.children}</span>
                  </td>
                </tr>
                ` : ''}
                ${enquiryData.living_country ? `
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Living Country:</strong>
                    <span style="color: #333333; font-size: 14px; margin-left: 10px;">${enquiryData.living_country}</span>
                  </td>
                </tr>
                ` : ''}
                ${enquiryData.nationality ? `
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Nationality:</strong>
                    <span style="color: #333333; font-size: 14px; margin-left: 10px;">${enquiryData.nationality}</span>
                  </td>
                </tr>
                ` : ''}
                ${enquiryData.flight_status ? `
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Flight Status:</strong>
                    <span style="color: #333333; font-size: 14px; margin-left: 10px;">${enquiryData.flight_status}</span>
                  </td>
                </tr>
                ` : ''}
                ${enquiryData.holiday_reason ? `
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Holiday Reason:</strong>
                    <span style="color: #333333; font-size: 14px; margin-left: 10px;">${enquiryData.holiday_reason}</span>
                  </td>
                </tr>
                ` : ''}
                ${enquiryData.message ? `
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Message:</strong>
                    <p style="color: #333333; font-size: 14px; margin: 10px 0 0 0; line-height: 1.6;">${enquiryData.message.replace(/\n/g, '<br>')}</p>
                  </td>
                </tr>
                ` : ''}
              </table>
              
              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
                This enquiry was submitted through the Slimeline Holidays website. Please respond to the customer at your earliest convenience.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #666666; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} Slimeline Holidays. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  }

  private getContactEmailTemplate(contactData: { name: string; email: string; subject: string; message: string }, logoUrl: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); padding: 30px; text-align: center;">
              <img src="${logoUrl}" alt="Slimeline Holidays" style="max-width: 200px; height: auto; margin-bottom: 10px;" />
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                You have received a new message through the contact form. Please find the details below:
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Name:</strong>
                    <span style="color: #333333; font-size: 14px; margin-left: 10px;">${contactData.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Email:</strong>
                    <span style="color: #333333; font-size: 14px; margin-left: 10px;"><a href="mailto:${contactData.email}" style="color: #4CAF50; text-decoration: none;">${contactData.email}</a></span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Subject:</strong>
                    <span style="color: #333333; font-size: 14px; margin-left: 10px;">${contactData.subject}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;">
                    <strong style="color: #4CAF50; font-size: 14px;">Message:</strong>
                    <p style="color: #333333; font-size: 14px; margin: 10px 0 0 0; line-height: 1.6;">${contactData.message.replace(/\n/g, '<br>')}</p>
                  </td>
                </tr>
              </table>
              
              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
                This message was submitted through the Slimeline Holidays contact form. Please respond to the customer at your earliest convenience.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #666666; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} Slimeline Holidays. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  }
}

