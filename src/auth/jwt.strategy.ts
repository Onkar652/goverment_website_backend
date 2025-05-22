// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,  // Store this in your environment variables
    });
  }

  async validate(payload: JwtPayload) {
    // Check if the role is 'admin'
    if (payload.role === 'admin') {
      return { userId: payload.sub, role: payload.role }; // Return admin if the role matches
    }
    return null;  // If not admin, return null (Unauthorized)
  }
}
