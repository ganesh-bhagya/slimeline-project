-- SQL script to update Slimeline Holidays database
-- Run this on your production database

-- Create email_settings table for storing SMTP configuration
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
);

-- Note: The email_settings table will be empty initially
-- Configure it through the admin panel at /admin/email-settings
-- after running this migration


