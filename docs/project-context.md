# 🐾 SEVANA - MASTER PROJECT CONTEXT

Version: 1.0
Project Status: Active Development
Architecture: Production Ready
Last Updated: July 2026

---

# 1. PROJECT OVERVIEW

Sevana is a community-driven Animal Rescue Platform designed to connect volunteers, NGOs, veterinarians, and citizens to rescue injured, abandoned, or lost animals.

The platform enables users to:

- Report injured animals
- Rescue animals
- Track rescue progress
- Contact nearby veterinarians
- Contact NGOs
- Donate
- Earn XP and badges
- Build a volunteer community

This project is being developed as a production-quality portfolio and university capstone project.

---

# 2. TECH STACK

## Frontend

- React
- Vite
- React Router
- Axios
- Context API
- CSS Modules / Modern CSS

## Backend

- Node.js
- Express.js
- PostgreSQL
- Redis
- JWT Authentication
- bcrypt
- Zod Validation

## Infrastructure

- Docker
- Docker Compose
- PostgreSQL 16
- Redis 7

## Media

- Cloudinary (planned)

## Version Control

- Git
- GitHub

---

# 3. PROJECT ARCHITECTURE

Backend Architecture:

Routes
↓

Controllers
↓

Services
↓

Repositories
↓

Database

Business logic NEVER exists inside routes.

SQL NEVER exists inside controllers.

Repositories ONLY communicate with PostgreSQL.

Services contain business logic.

Controllers handle request/response only.

---

# 4. BACKEND FOLDER STRUCTURE

src/

config/

controllers/

middleware/

repositories/

routes/

services/

validators/

utils/

models/

server.js

database/

migrations/

migrate.js

seed.sql

---

# 5. FRONTEND STRUCTURE

src/

pages/

components/

hooks/

context/

layouts/

services/

api/

styles/

assets/

App.jsx

main.jsx

---

# 6. DATABASE STATUS

Database Engine

PostgreSQL

Running inside Docker.

Redis also running.

Database schema consists of 17 SQL migrations.

Migration tracking is implemented using:

schema_migrations

Current migration runner:

✅ Tracks executed migrations

✅ Uses SHA256 checksum

✅ Uses transactions

✅ Skips executed migrations

✅ Production-ready

Running:

npm run migrate

produces:

Database is up to date.

No duplicate migration errors.

---

# 7. COMPLETED DATABASE MODULES

Users

Animal Reports

Rescue

Vet

NGO

Donations

Notifications

XP

Indexes

Constraints

Functions

Media

Rescue Updates

Achievements

Badges

Migration Tracking

---

# 8. USER ROLES

user

volunteer

vet

ngo

admin

---

# 9. DATABASE DESIGN

Users table

↓

Vets table

NGOs table

Animal Reports

Report Media

Rescue Updates

XP

Achievements

Badges

Notifications

Donations

The schema is considered COMPLETE.

Do not redesign database tables unless required by a new feature.

---

# 10. API RESPONSE FORMAT

Every endpoint MUST return:

Success

{
    "success": true,
    "message": "...",
    "data": {}
}

Failure

{
    "success": false,
    "message": "...",
    "errors": [...]
}

Never return inconsistent response formats.

---

# 11. AUTHENTICATION

JWT Authentication

bcrypt Password Hashing

Protected Routes

Role Middleware

/me endpoint

Refresh Token (optional)

Authentication is the first backend module to implement.

---

# 12. VALIDATION

Every request uses Zod.

Never trust frontend validation.

Validate on backend.

---

# 13. SECURITY RULES

Password hashing:

bcrypt

JWT Secret via .env

Parameterized SQL queries only.

Never concatenate SQL.

Never expose passwords.

Validate all inputs.

Sanitize uploaded files.

No secrets inside GitHub.

---

# 14. GIT STRATEGY

Never work directly on main.

Branches:

backend-auth

backend-report

backend-rescue

frontend-auth

frontend-report

frontend-dashboard

feature/*

Merge into main only after testing.

---

# 15. TEAM STRUCTURE

Developer 1

Backend Lead

Responsibilities

Express

Database

Controllers

Services

Repositories

Authentication

Redis

Docker

Cloudinary

Security

Deployment

Developer 2

Frontend Lead

Responsibilities

React

Pages

Components

Hooks

Context

Axios

UI

Forms

Responsive Design

API Integration

ChatGPT

Acts as

Technical Lead

Architect

Reviewer

Debugger

API Designer

---

# 16. FOLDER OWNERSHIP

Backend Developer edits:

controllers

services

repositories

routes

middleware

validators

database

Frontend Developer edits:

pages

components

hooks

styles

layouts

context

Do not edit each other's folders unless discussed.

---

# 17. DEVELOPMENT WORKFLOW

For every feature:

1.
Design

↓

2.
Backend API

↓

3.
API Testing

↓

4.
Frontend Integration

↓

5.
End-to-End Testing

↓

6.
Git Commit

↓

7.
Merge

No feature is considered complete until tested end-to-end.

---

# 18. CURRENT ROADMAP

Phase 1

Authentication

Register

Login

JWT

Profile

Logout

Protected Routes

Phase 2

Animal Reports

Create Report

Nearby Reports

Status Update

Image Upload

Filtering

Phase 3

Rescue Workflow

Accept Rescue

Timeline

Volunteer Assignment

Completion

Phase 4

Profile

User Dashboard

My Reports

My Rescues

XP

Achievements

Phase 5

Notifications

Nearby Rescue Alerts

Rescue Accepted

Rescue Completed

Phase 6

Leaderboard

XP

Badges

Top Volunteers

Phase 7

Vet Module

Nearby Vets

Vet Profiles

Phase 8

NGO Module

Nearby NGOs

NGO Profiles

Phase 9

Donations

Campaigns

History

Payment Integration (future)

---

# 19. PROJECT RULES

Never duplicate business logic.

Never duplicate SQL.

Never duplicate validation.

Never create inconsistent APIs.

Follow Repository Pattern.

Follow Service Layer.

Use transactions where needed.

Every feature must be production-ready.

---

# 20. CURRENT PROJECT STATUS

Infrastructure

✅ Complete

Docker

✅ Complete

Redis

✅ Complete

PostgreSQL

✅ Complete

Database Schema

✅ Complete

Migration Tracking

✅ Complete

Authentication

⏳ Pending

Animal Reports

⏳ Pending

Rescue Module

⏳ Pending

Frontend Integration

⏳ Pending

Deployment

⏳ Pending

---

# 21. DEVELOPMENT GOAL

Within the next 4 days, complete a production-quality MVP that includes:

Authentication

Animal Reports

Rescue Workflow

User Dashboard

Notifications

Leaderboard

Vet Module

NGO Module

Donations (basic MVP)

The application should be fully functional, secure, demo-ready, and suitable for academic evaluation and portfolio presentation.

---

# 22. IMPORTANT NOTES FOR ANY AI ASSISTANT

You are assisting on the Sevana project.

Do NOT redesign the architecture.

Do NOT modify the database schema unless required.

Follow the Repository Pattern.

Follow the Service Layer.

Keep backend and frontend responsibilities separate.

Always maintain consistent API responses.

Prioritize security, maintainability, scalability, and clean code.

Every code suggestion should align with the architecture described in this document.