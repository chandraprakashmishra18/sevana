# Sevana System Architecture

## Overview

Sevana is a full-stack community-driven animal rescue platform designed to connect citizens, volunteers, NGOs, and veterinary clinics to enable faster rescue operations.

The application follows a modern client-server architecture consisting of:

- React Frontend
- Express.js REST API
- PostgreSQL Database
- Cloudinary Image Storage
- JWT Authentication

---

# High-Level Architecture

```
                   +----------------------+
                   |    React Frontend    |
                   |  (Vite + React.js)   |
                   +----------+-----------+
                              |
                     HTTPS / REST API
                              |
                              ▼
                   +----------------------+
                   |   Express Backend    |
                   |   Node.js + Express  |
                   +----------+-----------+
                              |
        +---------------------+----------------------+
        |                     |                      |
        ▼                     ▼                      ▼
 Authentication         PostgreSQL            Cloudinary
    (JWT)               Database              Image Store
```

---

# Backend Folder Structure

```
src/
│
├── config/
│
├── controllers/
│
├── middleware/
│
├── routes/
│
├── validators/
│
├── utils/
│
├── db/
│
└── server.js
```

---

# Request Lifecycle

A client request flows through the backend as follows:

```
Client

   │

   ▼

Express Router

   │

   ▼

Authentication Middleware

   │

   ▼

Validation Middleware

   │

   ▼

Controller

   │

   ▼

PostgreSQL

   │

   ▼

Response
```

---

# Authentication Flow

Authentication is implemented using JSON Web Tokens (JWT).

### Register

```
Client

↓

Register API

↓

Password Hash (bcrypt)

↓

Store User

↓

Success Response
```

### Login

```
Client

↓

Login API

↓

Verify Password

↓

Generate JWT

↓

Return Access Token
```

### Protected APIs

```
Client

↓

Authorization Header

↓

JWT Verification

↓

req.user

↓

Controller
```

---

# Animal Rescue Flow

```
Citizen

↓

Create Animal Report

↓

Store Report

↓

Nearby Volunteers

↓

Volunteer Accepts Rescue

↓

Status Updates

↓

Veterinary Clinic

↓

Rescue Completed
```

---

# Image Upload Flow

Images are stored using Cloudinary.

```
Client

↓

Multipart Form Data

↓

Multer

↓

Cloudinary

↓

Image URL

↓

Database
```

---

# Nearby Search Flow

Nearby searches use PostgreSQL geospatial extensions.

```
User Location

↓

Latitude & Longitude

↓

earthdistance

↓

Nearby Results

↓

API Response
```

---

# Database Interaction

The backend communicates with PostgreSQL using the `pg` package.

Example flow:

```
Controller

↓

Parameterized SQL Query

↓

PostgreSQL

↓

Rows Returned

↓

JSON Response
```

---

# Security Architecture

The backend implements multiple layers of security:

- JWT Authentication
- Password hashing using bcrypt
- Parameterized SQL queries
- Zod request validation
- Helmet security headers
- CORS configuration
- File upload restrictions
- Environment variable management

---

# Error Handling

Errors are processed using:

- Async Handler
- Global Error Middleware
- Validation Error Handling
- PostgreSQL Error Handling

The API returns standardized JSON responses.

---

# Technology Stack

## Frontend

- React.js
- Vite
- Axios
- React Router

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL

## Authentication

- JWT
- bcrypt

## Validation

- Zod

## Image Storage

- Cloudinary
- Multer

## Development

- Docker
- Postman
- Git
- GitHub

---

# Scalability Considerations

The architecture is designed to support future enhancements, including:

- Push notifications
- Real-time rescue tracking
- AI-based animal detection
- Analytics dashboard
- Mobile application
- Admin dashboard
- WebSocket integration
- Microservice migration

---

# Deployment Architecture

```
React Frontend

↓

Hosting Platform

↓

Express Backend

↓

PostgreSQL Database

↓

Cloudinary
```

---

# Architecture Summary

| Component | Technology |
|----------|------------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| Authentication | JWT |
| Validation | Zod |
| Image Storage | Cloudinary |
| API Style | REST |
| Deployment | Docker Ready |

---

## Author

**Project:** Sevana – Community Animal Rescue Platform

**Architecture Version:** 1.0