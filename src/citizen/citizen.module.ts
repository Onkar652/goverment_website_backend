import { Module } from '@nestjs/common';
import { CitizenService } from './citizen.service';
import { CitizenController } from './citizen.controller';
import {Upload} from './entities/citizen.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Upload])],
  controllers: [CitizenController],
  providers: [CitizenService],
})
export class CitizenModule {}
