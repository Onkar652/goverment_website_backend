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
import { CleanlinessActivity } from './cleanliness/entities/cleanliness.entity'; // Import the CleanlinessActivity entity
import { OfficeAmenitiesModule } from './office_amenities/office_amenities.module';
import { OfficeAmenity } from './office_amenities/entities/office_amenity.entity'; // Import the OfficeAmenity entity
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Iphone@123',
      database: 'train_reservation',
      entities: [Upload, Survey,Complaint,File,CleanlinessActivity,OfficeAmenity],  // Add Survey entity here
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CitizenModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Serve static files from the 'uploads' directory
      serveRoot: '/uploads', // This is the base URL for serving static files
    }),
    SurveyModule,
    ComplaintsModule,
    FilesModule,
    AuthModule,
    CleanlinessModule,
    OfficeAmenitiesModule,
  ],
  controllers: [AppController , AdminController], // Add AdminController here
  providers: [AppService],
})
export class AppModule {}
