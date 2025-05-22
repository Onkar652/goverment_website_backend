import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import {CleanlinessController}from '../cleanliness/cleanliness.controller';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
