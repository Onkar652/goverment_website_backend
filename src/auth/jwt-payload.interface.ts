// src/auth/jwt-payload.interface.ts
export interface JwtPayload {
    role: string;  // Add the role to the payload
    sub: string;   // User identifier or any other identifier
  }
  