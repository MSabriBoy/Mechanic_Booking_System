# 🔧 Mechanic Booking System

A full-stack web application designed to simplify and digitize the vehicle service booking process. The system allows users to manage mechanic service appointments through an organized platform instead of relying on traditional paper-based or Excel-based records.

## 🚀 Project Overview

The **Mechanic Booking System** is a MERN Stack application built to streamline workshop operations, manage service bookings, and provide role-based access to different users.

It focuses on making the booking process more organized, accessible, and efficient for customers and mechanics.

## ✨ Key Features

- **User Authentication:** Secure user authentication using JWT.
- **Role-Based Access Control:** Different access permissions based on user roles.
- **Booking Management:** Create, view, update, and manage service bookings.
- **Dashboard:** Organized interface for managing booking activities.
- **Input Validation:** Server-side validation to ensure accurate data.
- **Security:** Password hashing, request sanitization, security headers, and rate limiting.
- **Responsive Interface:** User-friendly frontend experience.
- **Error Handling:** Structured handling of application errors and API responses.

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs

### Security & Backend Utilities
- Helmet
- CORS
- Morgan
- Compression
- Express Rate Limit
- Cookie Parser
- Express Validator
- sanitize-html

### Development Tools
- Git & GitHub
- Postman
- ESLint
- Nodemon
- VS Code

## 📁 Project Structure

```text
mechanic-booking-system/
│
├── client/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── context/
│       ├── utils/
│       └── constants/
│
├── server/
│   └── src/
│       ├── config/
│       ├── constants/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       ├── validators/
│       ├── app.js
│       └── server.js
│
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/MSabriBoy/Mechanic_Booking_System.git
```

```bash
cd mechanic-booking-system
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the server directory:

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secure_random_secret
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173

ADMIN_NAME=Your Admin Name
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=CreateYourOwnStrongPassword
```

Add any other environment variables required by your backend configuration.

Start the backend server:

```bash
npm run dev
```

For production:

```bash
npm start
```

### 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
```

Create a `.env` file if required by your frontend configuration:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The frontend and backend will now run locally.

*Note: Adjust environment variable names and API URLs according to your actual project configuration.*

## 🔐 Demo Login Credentials

Use the following section to provide access to your demo accounts.

| Role | Email | Password |
|---|---|---|
| Admin | admin@example.com | Admin@monty_boi89 |
| Mechanic | staff3@example.com | 12345678 |

## 🔒 Security Implementation

- JWT-based authentication.
- Password hashing using bcryptjs.
- Role-based authorization middleware.
- HTTP security headers using Helmet.
- API rate limiting.
- Input validation and sanitization.
- Environment-based secret management.
- CORS configuration.

## 🎯 Project Objectives

- Digitize the traditional mechanic booking process.
- Simplify service appointment management.
- Improve workshop booking organization.
- Implement secure authentication and authorization.
- Build a scalable full-stack application using MERN technologies.

## 👨‍💻 Developer

**Rihan Sabri**

Full Stack Developer | MERN Stack

GitHub: https://github.com/MSabriBoy

⭐ If you find this project useful, consider giving it a star!
