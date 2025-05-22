
// import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
// import * as admin from 'firebase-admin';
// import * as fs from 'fs';
// import * as path from 'path';
// import { v4 as uuidv4 } from 'uuid';

// @Injectable()
// export class FirebaseService implements OnModuleInit {
//   onModuleInit() {
//     const serviceAccountPath = path.join(process.cwd(), 'firebase_config.json');
//     const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

//     if (admin.apps.length === 0) {
//       admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//         storageBucket: 'assignemt-2e201.firebasestorage.app',
//       });
//     }
//   }

//   async uploadFile(file: Express.Multer.File, folder = 'uploads'): Promise<{ filePath: string; publicUrl: string }> {
//     try {
//       const bucket = admin.storage().bucket();

//       const ext = path.extname(file.originalname);
//       const uniqueFileName = `${folder}/${uuidv4()}${ext}`;
//       const fileUpload = bucket.file(uniqueFileName);

//       await fileUpload.save(file.buffer, {
//         metadata: { contentType: file.mimetype },
//         public: true,
//       });

//       // Make file publicly accessible
//       await fileUpload.makePublic();

//       return {
//         filePath: uniqueFileName,
//         publicUrl: fileUpload.publicUrl(),
//       };
//     } catch (error) {
//       console.error('Firebase upload error:', error);
//       throw new InternalServerErrorException('Failed to upload file to Firebase');
//     }
//   }

//   async deleteFile(filePath: string): Promise<void> {
//     const bucket = admin.storage().bucket();
//     const file = bucket.file(filePath);

//     try {
//       await file.delete();
//       console.log(`✅ File ${filePath} deleted successfully.`);
//     } catch (error) {
//       console.error('❌ Error deleting file:', error);
//       throw new InternalServerErrorException('Failed to delete file from Firebase');
//     }
//   }
// }

import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    const serviceAccount = {
      type: 'service_account',
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
    };

    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });
      console.log('✅ Firebase initialized');
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

      await fileUpload.makePublic();

      return {
        filePath: uniqueFileName,
        publicUrl: fileUpload.publicUrl(),
      };
    } catch (error) {
      console.error('❌ Firebase upload error:', error);
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
