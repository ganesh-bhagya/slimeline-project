import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool: mysql.Pool;

  constructor(private configService: ConfigService) {
    this.pool = mysql.createPool({
      host: this.configService.get<string>('DB_HOST', 'localhost'),
      user: this.configService.get<string>('DB_USER', 'root'),
      password: this.configService.get<string>('DB_PASSWORD', 'root'),
      database: this.configService.get<string>('DB_NAME', 'slimelineholidays'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  getPool(): mysql.Pool {
    return this.pool;
  }

  async onModuleInit() {
    await this.initializeDatabase();
  }

  private async initializeDatabase() {
    try {
      // Create packages table
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS packages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          country VARCHAR(100) NOT NULL,
          days INT NOT NULL,
          image TEXT,
          price DECIMAL(10, 2),
          stars INT DEFAULT 4,
          description TEXT,
          itinerary TEXT,
          inclusion TEXT,
          summary TEXT,
          images TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // Create admin_users table
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS admin_users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(100) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // Create enquiries table
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS enquiries (
          id INT AUTO_INCREMENT PRIMARY KEY,
          tour VARCHAR(255),
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          mobile VARCHAR(50),
          living_country VARCHAR(100),
          nationality VARCHAR(100),
          destination VARCHAR(255),
          arrival_date DATE,
          departure_date DATE,
          adults INT,
          children INT,
          flight_status VARCHAR(50),
          holiday_reason TEXT,
          message TEXT,
          status VARCHAR(50) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // Create contacts table
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          subject VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          status VARCHAR(50) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // Create testimonials table
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS testimonials (
          id INT AUTO_INCREMENT PRIMARY KEY,
          quote TEXT NOT NULL,
          author_name VARCHAR(255) NOT NULL,
          author_location VARCHAR(255) DEFAULT NULL,
          image TEXT DEFAULT NULL,
          gallery_images TEXT DEFAULT NULL,
          sort_order INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // Add gallery_images to existing testimonials tables (safe to run multiple times)
      try {
        await this.pool.query(
          'ALTER TABLE testimonials ADD COLUMN gallery_images TEXT DEFAULT NULL',
        );
      } catch {
        // Column already exists, ignore
      }

      // Create email_settings table
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS email_settings (
          id INT PRIMARY KEY DEFAULT 1,
          host VARCHAR(255),
          port INT DEFAULT 587,
          secure TINYINT(1) DEFAULT 0,
          user VARCHAR(255),
          password VARCHAR(255),
          from_email VARCHAR(255),
          from_name VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // Create default admin user
      const [existingAdmin] = await this.pool.execute(
        'SELECT id FROM admin_users WHERE username = ?',
        ['admin']
      );

      if (!Array.isArray(existingAdmin) || existingAdmin.length === 0) {
        await this.pool.execute(
          'INSERT INTO admin_users (username, email, password) VALUES (?, ?, ?)',
          ['admin', 'admin@slimeline.com', 'admin123']
        );
      }

      console.log('✅ Database initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing database:', error);
      throw error;
    }
  }
}

