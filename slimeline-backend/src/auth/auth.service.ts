import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const pool = this.databaseService.getPool();
    const [users] = await pool.execute(
      'SELECT * FROM admin_users WHERE username = ? OR email = ?',
      [username, username]
    );

    if (!Array.isArray(users) || users.length === 0) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = users[0] as any;
    
    // Simple password check (in production, use bcrypt.compare)
    const isValidPassword = password === user.password;

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    // Generate JWT token
    const token = this.jwtService.sign(payload);

    return {
      success: true,
      user: payload,
      token, // Return the JWT token
    };
  }

  async validateToken(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token);
      
      // Optionally verify user still exists in database
      const pool = this.databaseService.getPool();
      const [users] = await pool.execute(
        'SELECT id FROM admin_users WHERE id = ?',
        [payload.id]
      );

      if (!Array.isArray(users) || users.length === 0) {
        throw new UnauthorizedException('User no longer exists');
      }

      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

