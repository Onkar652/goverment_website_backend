// src/auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtStrategy } from './jwt.strategy'; // Import the JwtStrategy

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtStrategy: JwtStrategy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      // Use the validate method from the strategy to validate the user
      return this.jwtStrategy.validate({ role: 'admin', sub: 'adminId' }).then(user => !!user); // Use JWT payload check for 'admin'
    }
    return false; // Token not found, deny access
  }
}
