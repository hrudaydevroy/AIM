# 🎓 AIM Study Circle - Coaching Center Management System

<div align="center">

![AIM Logo](src/main/resources/static/a-i-m-high-resolution-logo.png)

**A comprehensive web-based management system for government coaching centers**

[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat&logo=java)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-6DB33F?style=flat&logo=springboot)](https://spring.io/projects/spring-boot)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-13AA52?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![React-Ready](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-yellow?style=flat)](https://developer.mozilla.org/)

</div>

---

## 📖 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

**AIM Study Circle** is a comprehensive management system designed for government coaching centers. It streamlines operations by providing dedicated modules for:

- 📚 **Student Management** - Complete student lifecycle tracking
- 📋 **Lead Management** - Convert inquiries into enrollments
- 👨‍💼 **Admin/Sales Dashboard** - Manage operations and sales metrics
- 🎥 **Video Content** - Manage educational video resources
- ✅ **Attendance Tracking** - Real-time attendance management
- 📝 **Assignment Management** - Create and track assignments
- 📄 **Notes System** - Students can save and manage study notes

The system features **dual backend architecture**: 
- **Spring Boot** (Java) - Primary REST API with security and MongoDB integration
- **Express.js** (Node.js) - Alternative backend for flexibility and real-time features

---

## ✨ Key Features

### 👥 Student Management
- Student profile management with personal, educational, and course details
- Batch and course assignment
- Online/Offline mode tracking
- Image upload for student profiles
- Student dashboard with personalized access

### 🔍 Lead Management
- Capture and manage potential student inquiries
- Lead status tracking (new, contacted, enrolled, rejected)
- Course preference tracking
- Contact information storage
- Communication history

### 📊 Admin Dashboard
- Comprehensive overview of all students and leads
- Sales and enrollment metrics
- Student and course management
- Admin account management
- System-wide statistics

### 🎓 Course Management
- Multiple course offerings (Banking, Railway, SSC, Forest, etc.)
- Course-specific content
- Batch scheduling
- Course progress tracking

### ✅ Attendance System
- Daily attendance marking
- Attendance records per student
- Batch-wise attendance reports
- Attendance history tracking

### 📝 Assignment Management
- Assignment creation and distribution
- Submission tracking
- Grading system
- Assignment history

### 📄 Notes Management
- Students can create personal notes
- Note categorization
- Search and filter functionality
- Edit and delete notes

### 🔐 Authentication & Security
- JWT-based authentication
- Role-based access control (Admin, Sales, Student)
- Password encryption with bcrypt
- Secure session management

---

## 🏗️ Architecture

### Dual Backend Approach

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (HTML/CSS/JS)                   │
│            (Served by Spring Boot on :8080)                 │
└────────────────────────┬────────────────────────────────────┘
                         │
            ┌────────────┴──────────────┐
            │                           │
      ┌─────▼──────────┐        ┌──────▼──────────┐
      │  Spring Boot   │        │   Express.js   │
      │  (Java 17)     │        │   (Node.js)    │
      │  Port: 8080    │        │   Port: 3001   │
      └─────┬──────────┘        └──────┬──────────┘
            │                          │
            └──────────────┬───────────┘
                           │
                    ┌──────▼──────┐
                    │  MongoDB    │
                    │  (Port 27017)
                    └─────────────┘
```

### Technology Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla), Responsive Design |
| **Backend** | Spring Boot 3.2.0 (Java 17), Express.js (Node.js) |
| **Database** | MongoDB (NoSQL) |
| **Authentication** | JWT (JSON Web Tokens), bcrypt |
| **API Style** | RESTful Architecture |
| **Build Tools** | Maven, npm |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required
- **Java 17+** - [Download JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- **Maven 3.8+** - [Download Maven](https://maven.apache.org/download.cgi)
- **Node.js 18+** - [Download Node.js](https://nodejs.org/)
- **MongoDB 5.0+** - [Download MongoDB Community Edition](https://www.mongodb.com/try/download/community)
- **Git** - [Download Git](https://git-scm.com/)

### Optional
- **VS Code** - [Download VS Code](https://code.visualstudio.com/)
- **Postman** - For API testing

### Verify Installation
```bash
# Check Java
java -version

# Check Maven
mvn -version

# Check Node.js
node -v
npm -v

# Check MongoDB
mongod --version
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/hrudaydevroy/AIM.git
cd AIM
```

### 2. Install Dependencies

#### Backend (Java)
```bash
# Maven will automatically download dependencies
# when you run the application (see below)
```

#### Backend (Node.js)
```bash
cd backend
npm install
cd ..
```

### 3. Database Setup

#### Start MongoDB
```bash
# Windows (if MongoDB is installed as a service)
net start MongoDB

# Or run MongoDB directly
mongod --dbpath "C:\path\to\data\folder"
```

#### Create Database
```bash
# Connect to MongoDB
mongo

# In MongoDB shell
use aim
db.createCollection("students")
db.createCollection("leads")
db.createCollection("users")
db.createCollection("assignments")
db.createCollection("attendance")
db.createCollection("notes")
db.createCollection("videos")

exit
```

---

## 🎮 Running the Application

### Option 1: Spring Boot Backend (Recommended)

#### Terminal 1: Start Spring Boot Backend
```bash
# From project root
mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

#### Terminal 2: Access Frontend
```bash
# Open browser and navigate to
http://localhost:8080
```

The frontend is automatically served by Spring Boot from `src/main/resources/static/`

### Option 2: Express.js Backend (Alternative)

#### Terminal 1: Start MongoDB
```bash
mongod
```

#### Terminal 2: Start Express Backend
```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:3001`

#### Terminal 3: Serve Frontend
```bash
cd src/main/resources/static
npx serve
```

Frontend will be available on `http://localhost:3000`

### Option 3: Development Setup (Concurrent)

```bash
# Terminal 1: Spring Boot
mvnw spring-boot:run

# Terminal 2: Node Backend (alternative)
cd backend && npm run dev

# Terminal 3: Static file serving (if needed)
cd src/main/resources/static && npx serve
```

---

## 📁 Project Structure

```
AIM/
├── src/
│   └── main/
│       ├── java/com/aim/
│       │   ├── controller/          # REST API endpoints
│       │   │   ├── AdminController.java
│       │   │   ├── AuthController.java
│       │   │   ├── StudentController.java
│       │   │   ├── LeadController.java
│       │   │   └── SalesController.java
│       │   ├── model/               # JPA Entities
│       │   │   ├── User.java
│       │   │   ├── Student.java
│       │   │   ├── Lead.java
│       │   │   └── enums/Role.java
│       │   ├── repository/          # Data access layer
│       │   │   ├── UserRepository.java
│       │   │   ├── StudentRepository.java
│       │   │   └── LeadRepository.java
│       │   ├── service/             # Business logic
│       │   │   └── StudentService.java
│       │   ├── security/            # JWT & Security
│       │   │   ├── JwtUtils.java
│       │   │   ├── JwtAuthFilter.java
│       │   │   └── UserDetailsServiceImpl.java
│       │   ├── config/              # Configuration classes
│       │   │   ├── SecurityConfig.java
│       │   │   └── DataInitializer.java
│       │   └── payload/             # DTOs
│       │       ├── request/
│       │       └── response/
│       └── resources/
│           ├── static/              # Frontend files
│           │   ├── index.html
│           │   ├── login.html
│           │   ├── register.html
│           │   ├── student-dashboard.html
│           │   ├── admin.html
│           │   ├── css/             # Stylesheets
│           │   └── js/              # JavaScript files
│           └── application.properties
├── backend/                         # Express.js Alternative Backend
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── models/                      # Mongoose schemas
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Lead.js
│   │   ├── Assignment.js
│   │   ├── Attendance.js
│   │   ├── Note.js
│   │   └── Video.js
│   ├── routes/                      # API endpoints
│   │   ├── auth.js
│   │   ├── student.js
│   │   ├── lead.js
│   │   ├── assignment.js
│   │   ├── attendance.js
│   │   ├── note.js
│   │   └── video.js
│   ├── middleware/                  # Custom middleware
│   │   └── auth.js
│   ├── server.js                    # Entry point
│   └── package.json
├── pom.xml                          # Maven dependencies
├── mvnw.cmd                         # Maven wrapper
├── data.json                        # Sample data
└── README.md                        # This file
```

---

## 🔌 API Endpoints

### Authentication Endpoints
```
POST   /api/auth/login           - Login user
POST   /api/auth/signup          - Register new user
POST   /api/auth/logout          - Logout user
```

### Student Endpoints
```
GET    /api/student/profile      - Get current student profile
GET    /api/students             - Get all students (Admin only)
POST   /api/students             - Create new student (Admin only)
PUT    /api/students/:id         - Update student (Admin only)
DELETE /api/students/:id         - Delete student (Admin only)
```

### Lead Endpoints
```
GET    /api/leads                - Get all leads
POST   /api/leads                - Create new lead
PUT    /api/leads/:id            - Update lead status
DELETE /api/leads/:id            - Delete lead
```

### Admin Endpoints
```
GET    /api/admin/dashboard      - Get dashboard statistics
GET    /api/admin/students       - Manage students
GET    /api/admin/leads          - Manage leads
```

### Sales Endpoints
```
GET    /api/sales/leads          - View assigned leads
PUT    /api/sales/leads/:id      - Update lead status
```

### Additional Endpoints (Express.js)
```
GET    /api/videos               - Get all videos
POST   /api/videos               - Create video
GET    /api/assignments          - Get assignments
POST   /api/assignments          - Create assignment
GET    /api/attendance           - Get attendance records
POST   /api/attendance           - Mark attendance
GET    /api/notes                - Get student notes
POST   /api/notes                - Create note
```

---

## 🗄️ Database Models

### User
```json
{
  "_id": ObjectId,
  "username": String,
  "email": String,
  "password": String (bcrypt encrypted),
  "role": ["admin", "sales", "student"],
  "createdAt": Date,
  "updatedAt": Date
}
```

### Student
```json
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "phone": String,
  "guardian": String,
  "institute": String,
  "qualification": String,
  "year": String,
  "cgpa": String,
  "mode": ["offline", "online"],
  "joiningDate": String,
  "batch": String,
  "course": String,
  "username": String,
  "password": String,
  "image": String (URL),
  "createdBy": String,
  "createdAt": Date
}
```

### Lead
```json
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "mobile": String,
  "course": String,
  "message": String,
  "status": ["new", "contacted", "enrolled", "rejected"],
  "createdAt": Date
}
```

### Assignment
```json
{
  "_id": ObjectId,
  "title": String,
  "description": String,
  "course": String,
  "dueDate": Date,
  "createdBy": String,
  "createdAt": Date
}
```

### Attendance
```json
{
  "_id": ObjectId,
  "studentId": ObjectId,
  "date": Date,
  "status": ["present", "absent"],
  "batch": String,
  "createdAt": Date
}
```

---

## 🎓 Courses Offered

The platform supports the following courses:

1. **Banking** - Banking awareness and preparation
2. **Railway** - Railway exam preparation
3. **SSC** - Staff Selection Commission exam prep
4. **Forest** - Forest service examination
5. **SI/Constable** - Police force recruitment

---

## 📂 Frontend Pages

### Public Pages
- **index.html** - Landing page
- **login.html** - User login
- **register.html** - User registration

### Student Pages
- **student-dashboard.html** - Personal dashboard with assignments and notes
- **course.html** - View available courses
- **enroll.html** - Course enrollment page

### Course Pages
- **banking.html** - Banking course content
- **railway.html** - Railway course content
- **ssc.html** - SSC course content
- **forest.html** - Forest course content
- **siconstable.html** - SI/Constable course content

### Admin Pages
- **admin.html** - Admin dashboard with full management

### Sales Pages
- **sales.html** - Sales dashboard with lead management

---

## 🔒 Security Features

- **JWT Authentication** - Stateless token-based authentication
- **Password Encryption** - bcrypt for secure password storage
- **Role-Based Access Control** - Different permissions for Admin, Sales, Student roles
- **Secure Headers** - CORS protection and XSS prevention
- **Input Validation** - Server-side validation of all inputs
- **MongoDB Integration** - Secure database connections

---

## 🧪 Testing the Application

### Using Postman

1. **Import the API Collection** (Optional - you can create requests manually)

2. **Test Login Endpoint**
   ```
   POST /api/auth/login
   Body: {
     "username": "admin",
     "password": "password"
   }
   ```

3. **Copy JWT Token** from response and add to Headers for subsequent requests:
   ```
   Authorization: Bearer <token>
   ```

4. **Test Student Endpoint**
   ```
   GET /api/student/profile
   Headers: Authorization: Bearer <token>
   ```

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
```
Error: MongoDB connection failed
Solution: Ensure MongoDB service is running
- Windows: net start MongoDB
- Mac: brew services start mongodb-community
- Linux: sudo systemctl start mongod
```

### Port Already in Use
```
Error: Port 8080 already in use
Solution: 
- Change port in application.properties
- Or kill the process: netstat -ano | findstr :8080 → taskkill /PID <pid> /F
```

### Missing Frontend Files
```
Problem: Static files not loading
Solution: 
- Rebuild: mvn clean install
- Check files exist in src/main/resources/static/
- Clear browser cache and restart server
```

### JWT Token Expired
```
Solution: Login again to get a fresh token
- Check token expiration in JwtUtils.java
- Default expiration: 86400000 ms (24 hours)
```

### CORS Issues
```
Solution: 
- Check SecurityConfig.java for CORS configuration
- Ensure frontend URL is whitelisted
```

---

## 📈 Performance Optimization

- **Database Indexing** - Optimized queries on frequently searched fields
- **Caching Strategy** - JWT tokens cached on client-side
- **Lazy Loading** - Frontend loads data on demand
- **Compression** - Gzip compression for API responses

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository** - `git clone https://github.com/hrudaydevroy/AIM.git`
2. **Create a feature branch** - `git checkout -b feature/YourFeature`
3. **Make your changes** - Add features or fix bugs
4. **Commit changes** - `git commit -m "Add YourFeature"`
5. **Push to branch** - `git push origin feature/YourFeature`
6. **Open a Pull Request** - Describe your changes clearly

### Code Standards
- Follow Java naming conventions (camelCase for variables, PascalCase for classes)
- Write meaningful commit messages
- Add comments for complex logic
- Test before submitting PR

---

## 📝 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👤 Author

**Hruday Kalluri**
- GitHub: [@hrudaydevroy](https://github.com/hrudaydevroy)
- Email: hrudaydevroy@gmail.com

---

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- MongoDB for the flexible database
- Express.js community for Node.js support
- All contributors who have helped with this project

---

## 📞 Support

For issues, questions, or suggestions:
1. Check existing GitHub Issues
2. Create a new Issue with detailed description
3. Contact the author directly

---

## 🗓️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Video streaming integration
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Automated email notifications
- [ ] Payment gateway integration
- [ ] Certificate generation
- [ ] Performance analytics for students

---

**Last Updated**: June 17, 2024

Made with ❤️ by Hruday Kalluri
