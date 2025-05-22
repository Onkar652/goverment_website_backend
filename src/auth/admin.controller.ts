// src/auth/admin.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from './admin.guard';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  @Get('dashboard')
  getDashboard() {
    return { message: 'Welcome to the Admin Dashboard' };
  }
}
