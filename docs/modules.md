# Modules Documentation

**Project:** Sevana - Animal Rescue Platform  
**Version:** 1.0  
**Last Updated:** July 2026

---

# Purpose

This document describes every module in the Sevana platform.

Each module contains:

- Objective
- Responsibilities
- Database Tables
- Backend APIs
- Frontend Screens
- Dependencies
- Future Improvements
- Current Status

This document acts as the system design blueprint for Sevana.

---

# System Overview

```

Citizen
↓

Authentication
↓

Home Dashboard
↓

Animal Reports
↓

Nearby Feed
↓

Rescue Workflow
↓

Notifications
↓

XP & Achievements
↓

Leaderboard
↓

Vet Module
↓

NGO Module
↓

Donations
↓

Admin

```

---

# Module Dependency Diagram

```

Authentication
│
├── User Profile
│
├── Animal Reports
│ │
│ ├── Image Upload
│ │
│ ├── Nearby Feed
│ │
│ ├── Rescue Workflow
│ │ │
│ │ ├── Notifications
│ │ │
│ │ ├── XP System
│ │ │
│ │ ├── Achievements
│ │ │
│ │ └── Leaderboard
│ │
│ ├── Vet Module
│ │
│ ├── NGO Module
│ │
│ └── Donations

```

---

# Module 1

## Authentication

### Objective

Securely authenticate users and manage access.

### Features

- Register
- Login
- Logout
- JWT
- Protected Routes
- Current User
- Role Authorization

### Backend

Routes

```

POST /auth/register

POST /auth/login

GET /auth/me

POST /auth/logout

```

Database

```

users

```

Frontend

- Login Page
- Register Page

Dependencies

None

Status

🟡 In Development

---

# Module 2

## User Profile

### Objective

Manage user information.

Features

- Edit Profile
- View Profile
- Profile Photo
- Volunteer Statistics
- XP Display

Database

```

users

```

Frontend

- Profile Screen

Dependencies

Authentication

Status

🟡 Pending

---

# Module 3

## Animal Reports

### Objective

Allow citizens to report injured or abandoned animals.

Features

- Create Report
- Upload Images
- GPS Location
- Animal Type
- Description
- Status

Database

```

animal_reports

report_media

```

Backend APIs

```

POST /reports

GET /reports

GET /reports/:id

PATCH /reports/:id

DELETE /reports/:id

```

Frontend

- Report Screen
- Report Details

Dependencies

Authentication

Status

🟡 Pending

---

# Module 4

## Nearby Feed

### Objective

Display nearby rescue reports.

Features

- Nearby Reports
- Filtering
- Search
- Categories

Database

```

animal_reports

```

Backend

Nearby Search

Location Search

Pagination

Frontend

- Home Feed

Dependencies

Animal Reports

Status

🟡 Pending

---

# Module 5

## Rescue Workflow

### Objective

Coordinate rescue operations.

Features

- Accept Rescue
- Assign Volunteer
- Rescue Timeline
- Complete Rescue

Database

```

rescue_updates

animal_reports

users

```

Backend

```

POST /rescues/accept

PATCH /rescues/complete

GET /rescues

```

Frontend

- Rescue Dashboard
- Rescue Timeline

Dependencies

Animal Reports

Authentication

Status

🟡 Pending

---

# Module 6

## Notifications

### Objective

Notify users about important events.

Features

- New Nearby Report
- Rescue Accepted
- Rescue Completed
- Achievement Unlocked

Database

```

notifications

```

Backend

Notification Service

Frontend

Notification Center

Dependencies

Authentication

Status

🟡 Pending

---

# Module 7

## XP System

### Objective

Reward volunteer activity.

Features

- XP Points
- Reward Calculation
- XP History

Database

```

xp_transactions

```

Frontend

Profile

Leaderboard

Dependencies

Rescue Workflow

Status

🟡 Pending

---

# Module 8

## Achievements

### Objective

Reward milestones.

Features

- Badges
- Achievement Unlocks
- Progress Tracking

Database

```

achievements

badges

user_achievements

```

Frontend

Achievements Page

Dependencies

XP

Status

🟡 Pending

---

# Module 9

## Leaderboard

### Objective

Rank volunteers.

Features

- Weekly Ranking
- Monthly Ranking
- All-Time Ranking

Database

```

xp_transactions

users

```

Frontend

Leaderboard Screen

Dependencies

XP

Status

🟡 Pending

---

# Module 10

## Veterinarian Module

### Objective

Help users locate nearby veterinarians.

Features

- Nearby Vets
- Vet Details
- Contact Information

Database

```

vets

```

Backend

Nearby Search

Frontend

Vet Finder

Dependencies

Authentication

Status

🟡 Pending

---

# Module 11

## NGO Module

### Objective

Display nearby NGOs.

Features

- NGO Directory
- NGO Profiles
- Contact Details

Database

```

ngos

```

Frontend

NGO Screen

Dependencies

Authentication

Status

🟡 Pending

---

# Module 12

## Donations

### Objective

Support rescue organizations.

Features

- Donation Campaigns
- Campaign Details
- Donation History

Database

```

donations

```

Backend

Donation APIs

Frontend

Donation Screen

Dependencies

Authentication

Status

🟡 Pending

---

# Module 13

## Admin Dashboard

### Objective

Manage the entire platform.

Features

- User Management
- Report Moderation
- Analytics
- Volunteer Monitoring
- NGO Management
- Vet Management

Database

All Tables

Frontend

Admin Dashboard

Dependencies

All Modules

Status

🔵 Future Release

---

# Module Relationships

Authentication

↓

User Profile

↓

Animal Reports

↓

Nearby Feed

↓

Rescue Workflow

↓

Notifications

↓

XP

↓

Achievements

↓

Leaderboard

↓

Vet Module

↓

NGO Module

↓

Donations

↓

Admin Dashboard

---

# API Summary

Authentication

4 APIs

Animal Reports

5 APIs

Rescue

3 APIs

Notifications

4 APIs

Profile

4 APIs

Vet

3 APIs

NGO

3 APIs

Donations

4 APIs

Leaderboard

2 APIs

Total Planned APIs

≈ 30+

---

# Current Development Status

| Module | Status |
|----------|---------|
| Authentication | 🟡 In Progress |
| Profile | ⏳ Pending |
| Animal Reports | ⏳ Pending |
| Nearby Feed | ⏳ Pending |
| Rescue Workflow | ⏳ Pending |
| Notifications | ⏳ Pending |
| XP | ⏳ Pending |
| Achievements | ⏳ Pending |
| Leaderboard | ⏳ Pending |
| Vet Module | ⏳ Pending |
| NGO Module | ⏳ Pending |
| Donations | ⏳ Pending |
| Admin Dashboard | 🔵 Future |

---

# MVP Scope (Next 4 Days)

The goal is to complete a functional MVP consisting of:

✅ Authentication

✅ User Profile

✅ Animal Reports

✅ Nearby Feed

✅ Rescue Workflow

✅ Notifications

✅ XP

✅ Leaderboard

✅ Vet Module

✅ NGO Module

Basic Donations (UI + Backend Structure)

---

# Future Enhancements

- AI Animal Detection
- AI Rescue Prioritization
- Real-time Chat
- Push Notifications
- Live GPS Tracking
- Offline Mode (PWA)
- Admin Analytics
- Email Notifications
- Multi-language Support
- Mobile Application

---

# Final Principle

Every module in Sevana must be:

- Independent
- Reusable
- Scalable
- Secure
- Well documented

Modules should communicate through clearly defined APIs rather than direct coupling, making the platform easier to maintain and extend.