
import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    const serviceAccountPath = path.join(process.cwd(), 'firebase_config.json');
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'assignemt-2e201.firebasestorage.app',
      });
    }
  }

  async uploadFile(file: Express.Multer.File, folder = 'uploads'): Promise<{ filePath: string; publicUrl: string }> {
    try {
      const bucket = admin.storage().bucket();

      const ext = path.extname(file.originalname);
      const uniqueFileName = `${folder}/${uuidv4()}${ext}`;
      const fileUpload = bucket.file(uniqueFileName);

      await fileUpload.save(file.buffer, {
        metadata: { contentType: file.mimetype },
        public: true,
      });

      // Make file publicly accessible
      await fileUpload.makePublic();

      return {
        filePath: uniqueFileName,
        publicUrl: fileUpload.publicUrl(),
      };
    } catch (error) {
      console.error('Firebase upload error:', error);
      throw new InternalServerErrorException('Failed to upload file to Firebase');
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    const bucket = admin.storage().bucket();
    const file = bucket.file(filePath);

    try {
      await file.delete();
      console.log(`✅ File ${filePath} deleted successfully.`);
    } catch (error) {
      console.error('❌ Error deleting file:', error);
      throw new InternalServerErrorException('Failed to delete file from Firebase');
    }
  }
}