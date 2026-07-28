# Sevana Deployment Guide

## Overview

This document explains how to deploy the Sevana backend application for development and production environments.

The backend is built using:

- Node.js
- Express.js
- PostgreSQL
- Cloudinary
- Docker (optional)

---

# System Requirements

## Software

- Node.js (v18 or later)
- npm
- PostgreSQL (v15 or later)
- Git

Optional:

- Docker Desktop
- Postman

---

# Clone Repository

```bash
git clone https://github.com/<username>/sevana.git

cd sevana
```

---

# Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=5000

DATABASE_URL=postgresql://username:password@localhost:5432/sevana

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
```

Never commit the `.env` file to version control.

---

# Database Setup

Create the database:

```sql
CREATE DATABASE sevana;
```

Run the schema:

```bash
npm run migrate
```

Verify that all tables are created successfully before starting the server.

---

# Start Development Server

```bash
npm run dev
```

Server:

```
http://localhost:5000
```

Health Check:

```
GET /health
```

---

# Production Build

Start the application:

```bash
npm start
```

---

# Docker Deployment

If Docker is installed:

```bash
docker-compose up --build
```

To stop containers:

```bash
docker-compose down
```

---

# Cloudinary Configuration

The Upload module requires a Cloudinary account.

Configure:

- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

Uploaded images are stored in:

```
sevana/animal-reports
```

---

# PostgreSQL Extensions

Enable required extensions:

```sql
CREATE EXTENSION IF NOT EXISTS cube;

CREATE EXTENSION IF NOT EXISTS earthdistance;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

These extensions support:

- UUID generation
- Nearby location searches

---

# Verify Deployment

After deployment verify:

- Server starts successfully
- Database connection established
- JWT authentication working
- Image uploads working
- Nearby search working
- All API endpoints responding correctly

---

# Troubleshooting

## Database Connection Error

Check:

- PostgreSQL service
- DATABASE_URL
- Database permissions

---

## JWT Errors

Verify:

- JWT_SECRET exists
- Authorization header format

```
Bearer <token>
```

---

## Cloudinary Errors

Verify:

- API Key
- API Secret
- Cloud Name

---

## Port Already in Use

Change:

```env
PORT=5001
```

or terminate the existing process using the configured port.

---

# Deployment Checklist

- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] PostgreSQL running
- [ ] Database migrated
- [ ] Cloudinary configured
- [ ] Server running
- [ ] Health endpoint verified
- [ ] Authentication tested
- [ ] File uploads tested

---

# Future Production Deployment

Recommended deployment stack:

| Component | Suggested Platform |
|----------|--------------------|
| Frontend | Vercel |
| Backend | Render / Railway |
| Database | Neon PostgreSQL |
| Image Storage | Cloudinary |
| Source Control | GitHub |

---

## Deployment Summary

| Item | Status |
|------|--------|
| Backend | Deployable |
| Database | PostgreSQL |
| Authentication | JWT |
| File Upload | Cloudinary |
| Docker Support | Yes |

---

## Author

**Project:** Sevana – Community Animal Rescue Platform

**Version:** 1.0