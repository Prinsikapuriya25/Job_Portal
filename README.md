# 🚀 CareerConnect

### Full-Stack Job Portal & Recruitment Platform

CareerConnect is a modern MERN Stack Job Portal designed to connect Job Seekers and Recruiters through a secure, scalable, and user-friendly recruitment platform. The application provides role-based access control, job management, application tracking, resume uploads, company profile management, and cloud-based file storage.

---

## 🌟 Overview

CareerConnect streamlines the hiring process by enabling recruiters to post and manage jobs while allowing candidates to search, apply, and track applications through an intuitive dashboard.

---

## ✨ Features

| Feature Category | Functionality |
|------------------|--------------|
| 🔐 Authentication | JWT-based Login & Registration |
| 👥 Role Management | Role-Based Access Control (Job Seeker & Recruiter) |
| 💼 Job Management | Create, Update, Delete, and Manage Job Listings |
| 🔎 Job Search | Search and Filter Jobs by Keywords and Categories |
| 📄 Resume Management | Upload, View, and Manage Resumes |
| ☁️ Cloud Storage | Cloudinary Integration for Resume & Logo Storage |
| 🏢 Company Profiles | Create and Manage Company Information |
| 📝 Job Applications | Apply for Jobs and Track Application Status |
| 📊 Recruiter Dashboard | Manage Jobs, Applicants, and Hiring Activities |
| 👨‍💻 Candidate Dashboard | View Applied Jobs and Profile Information |
| 🔒 Security | Password Hashing with bcrypt.js and Protected Routes |
| 🔗 REST APIs | Scalable Backend APIs using Express.js and MongoDB |
| 📱 Responsive Design | Mobile-Friendly UI using React.js and Tailwind CSS |
| ⚡ State Management | Centralized State Management using Redux Toolkit |
| 🚀 Deployment Ready | MongoDB Atlas, Cloudinary, Vercel, and Render Support |

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt.js
- RESTful APIs

### Database
- MongoDB
- Mongoose ODM

### Cloud & Deployment
- Cloudinary
- MongoDB Atlas
- Vercel
- Render

---

## 📂 Project Structure

```bash
CareerConnect/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── store/
│   │   └── utils/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
└── README.md
```

---

## 🔑 Core Modules

### 👨‍💻 Job Seeker Module
- Register and Login
- Browse Available Jobs
- Search & Filter Jobs
- Apply for Jobs
- Upload Resume
- Track Applications
- Manage Profile

### 🏢 Recruiter Module
- Register and Login
- Create Company Profile
- Post Jobs
- Edit/Delete Jobs
- View Applicants
- Manage Applications
- Recruiter Dashboard

### 🔐 Authentication Module
- JWT Authentication
- Role-Based Access Control (RBAC)
- Protected Routes
- Password Encryption using bcrypt.js

### ☁️ File Management Module
- Resume Upload
- Company Logo Upload
- Cloudinary Integration
- Secure Cloud Storage

---

## 📊 Database Collections

| Collection | Description |
|------------|------------|
| Users | Stores candidate and recruiter accounts |
| Companies | Stores recruiter company details |
| Jobs | Stores job listings |
| Applications | Stores candidate applications |
| Resumes | Stores uploaded resume information |

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Prinsikapuriyas25/careerconnect.git
cd careerconnect
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd server
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## ▶️ Run the Application

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

---

## 📈 API Highlights

### Authentication APIs
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/profile`

### Job APIs
- GET `/api/jobs`
- POST `/api/jobs`
- PUT `/api/jobs/:id`
- DELETE `/api/jobs/:id`

### Application APIs
- POST `/api/applications/apply`
- GET `/api/applications`
- GET `/api/applications/:id`

### Company APIs
- POST `/api/company`
- GET `/api/company`
- PUT `/api/company/:id`

---

## 🔒 Security Features

- JWT Authentication
- Protected Routes
- Role-Based Access Control (RBAC)
- Password Hashing using bcrypt.js
- Input Validation
- Secure File Upload Handling

---

## 📸 Key Highlights

✅ Full-Stack MERN Architecture

✅ JWT Authentication & Authorization

✅ Role-Based Access Control (RBAC)

✅ Cloudinary File Storage

✅ Resume Upload & Management

✅ Recruiter & Candidate Dashboards

✅ Redux Toolkit State Management

✅ RESTful API Architecture

✅ Responsive UI Design

✅ Production-Ready Project Structure

---

## 🎯 Future Enhancements

- AI-Based Resume Screening
- Email Notifications
- Interview Scheduling
- Real-Time Chat System
- Job Recommendation Engine
- Advanced Analytics Dashboard

---



---

### Made with ❤️ using MERN Stack
