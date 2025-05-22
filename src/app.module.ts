import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitizenModule } from './citizen/citizen.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './citizen/entities/citizen.entity';
import { Survey } from './survey/entities/survey.entity';  
import { Complaint } from './complaints/entities/complaint.entity'; 
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SurveyModule } from './survey/survey.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { FilesModule } from './files/files.module';
import { File } from './files/entities/file.entity';
import { AuthModule } from './auth/auth.module';
import { AdminController } from './auth/admin.controller';
import { CleanlinessModule } from './cleanliness/cleanliness.module';
import { CleanlinessActivity } from './cleanliness/entities/cleanliness.entity';
import { OfficeAmenitiesModule } from './office_amenities/office_amenities.module';
import { OfficeAmenity } from './office_amenities/entities/office_amenity.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Use environment variables for DB config
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('Hostname'),
        port: parseInt(configService.get<string>('Port') ?? (() => { throw new Error('Database port is not defined in environment variables'); })(), 10),
        username: configService.get<string>('Username'),
        password: configService.get<string>('Password'),
        database: configService.get<string>('Database'),
        entities: [
          Upload,
          Survey,
          Complaint,
          File,
          CleanlinessActivity,
          OfficeAmenity,
        ],
        synchronize: true, // set to false in production and use migrations
      }),
    }),

    // Serve uploaded files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

    CitizenModule,
    SurveyModule,
    ComplaintsModule,
    FilesModule,
    AuthModule,
    CleanlinessModule,
    OfficeAmenitiesModule,
  ],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule {}
