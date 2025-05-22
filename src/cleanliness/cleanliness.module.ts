import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CleanlinessActivity } from './entities/cleanliness.entity';
import { CleanlinessController } from './cleanliness.controller';
import { CleanlinessService } from './cleanliness.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';


@Module({
  imports: [TypeOrmModule.forFeature([CleanlinessActivity])],
  controllers: [CleanlinessController],
  providers: [CleanlinessService, FirebaseService],
})
export class CleanlinessModule { }
