🛠️ Government Website – Backend
This is the backend server for the Government Website Frontend, built with NestJS, PostgreSQL, TypeORM, and Firebase for image storage.

🚀 Live Frontend
🔗 https://goverment-website-k16c.vercel.app

⚙️ Tech Stack
Backend Framework: NestJS

ORM: TypeORM

Database: PostgreSQL

Cloud Storage: Firebase (for uploading and serving photos)

Language: TypeScript

📦 Features
User creation and authentication

Admin routes for posting content

Image upload to Firebase Storage

PostgreSQL + TypeORM models and migrations

RESTful APIs with NestJS controllers/services

🧑‍💻 Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/goverment-website-backend.git
cd goverment-website-backend
2. Install dependencies
bash
Copy
Edit
npm install
3. Setup environment variables
Create a .env file in the root and add:

env
Copy
Edit
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=yourdbname

FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_STORAGE_BUCKET=your-bucket-url
4. Run the app
bash
Copy
Edit
npm run start:dev
📂 Folder Structure
bash
Copy
Edit
/src
  /auth
  /users
  /admin
  /uploads
  /common
  main.ts
  app.module.ts
🧪 Sample API Routes
POST /users – Create user

POST /auth/login – Login user

POST /uploads/image – Upload photo to Firebase

GET /admin/data – Admin data fetch

🗃️ Database
Uses PostgreSQL

Connected via TypeORM

Includes relations, migrations, and seeding (if applicable)

🖼️ Firebase
Used to store and serve image uploads

Integrated via Firebase Admin SDK

📄 License
MIT

