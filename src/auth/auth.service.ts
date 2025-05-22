// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  private readonly adminUsername = process.env.ADMIN_USERNAME ;//admin
  private readonly adminPassword = process.env.ADMIN_PASSWORD ; //iphone@123// Secure this in real apps

  constructor(private jwtService: JwtService) {}

  async validateAdmin(username: string, password: string): Promise<boolean> {
    return username === this.adminUsername && password === this.adminPassword;
  }

  async login(username: string, password: string) {
    const isValid = await this.validateAdmin(username, password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { username, role: 'admin' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
