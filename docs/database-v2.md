# Sevana Database Documentation

## Overview

Sevana uses **PostgreSQL** as its primary relational database.

The database is designed to support:

- User authentication and authorization
- Animal rescue reporting
- Volunteer participation
- Veterinary clinic discovery
- NGO management
- Donation tracking
- Lost & Found reports
- XP and leaderboard system

The database follows a normalized relational design with UUID primary keys, foreign key constraints, indexes, and validation checks.

---

# Database Technology

| Property | Value |
|----------|-------|
| Database | PostgreSQL |
| UUID Extension | uuid-ossp |
| Geo Extensions | cube, earthdistance |
| Authentication | JWT |
| Query Layer | pg (node-postgres) |

---

# Entity Relationship Overview

```
Users
│
├── Animal Reports
│       │
│       ├── Rescue Volunteers
│       │
│       ├── Report Images
│       │
│       └── Status Updates
│
├── Donations
│
├── XP Transactions
│
└── Lost & Found Reports

Vets

NGOs
```

---

# Tables

---

# 1. users

Stores all registered users of the application.

## Purpose

This table manages:

- Authentication
- User profile
- XP
- Levels
- Location
- Emergency information

## Columns

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary Key |
| full_name | VARCHAR(120) | User's full name |
| email | VARCHAR(255) | Unique email address |
| phone | VARCHAR(20) | Unique phone number |
| password_hash | TEXT | Encrypted password |
| avatar_url | TEXT | Profile image |
| role | VARCHAR(20) | user / volunteer / vet / ngo / admin |
| is_verified | BOOLEAN | Verification status |
| is_active | BOOLEAN | Account status |
| xp | INTEGER | Experience points |
| level | INTEGER | User level |
| latitude | DOUBLE | Current latitude |
| longitude | DOUBLE | Current longitude |
| area | VARCHAR(150) | Area |
| city | VARCHAR(100) | City |
| state | VARCHAR(100) | State |
| pincode | VARCHAR(10) | Postal code |
| bio | TEXT | User bio |
| blood_group | VARCHAR(5) | Blood group |
| emergency_contact_name | VARCHAR(120) | Emergency contact |
| emergency_contact_phone | VARCHAR(20) | Emergency phone |
| last_login | TIMESTAMP | Last login |
| created_at | TIMESTAMP | Created timestamp |
| updated_at | TIMESTAMP | Updated timestamp |

## Constraints

- Primary Key
- Unique Email
- Unique Phone
- Role Check
- Latitude Check
- Longitude Check
- XP >= 0
- Level >= 1

## Indexes

- idx_users_email
- idx_users_phone
- idx_users_role

---

# 2. animal_reports

Stores rescue reports created by users.

## Purpose

Each report contains:

- Animal information
- Current status
- GPS location
- Reporter
- Rescue progress

## Important Fields

- id
- reported_by
- animal_type
- condition
- description
- latitude
- longitude
- status
- created_at
- updated_at

---

# 3. rescues

Tracks volunteers who respond to rescue requests.

## Purpose

Links volunteers with reports.

## Important Fields

- report_id
- volunteer_id
- joined_at

---

# 4. vets

Stores veterinary clinics.

## Purpose

Allows users to find nearby veterinary clinics.

## Important Fields

- id
- clinic_name
- phone
- address
- latitude
- longitude
- emergency_available

---

# 5. ngos

Stores NGO information.

## Purpose

Supports rescue collaboration.

## Important Fields

- id
- name
- phone
- address
- latitude
- longitude

---

# 6. donations

Tracks donations.

## Purpose

Stores donation records.

## Important Fields

- id
- donor_id
- ngo_id
- amount
- payment_status
- created_at

---

# 7. lost_found

Stores lost and found animal reports.

## Purpose

Helps reconnect pets with owners.

## Important Fields

- id
- reported_by
- animal_name
- description
- latitude
- longitude
- status

---

# 8. xp_transactions

Maintains XP history.

## Purpose

Keeps a log of all XP awarded.

## Important Fields

- id
- user_id
- xp
- reason
- created_at

---

# Relationships

```
users
 │
 ├────────────── animal_reports
 │                    │
 │                    ├──────────── rescues
 │                    │
 │                    └──────────── report_images
 │
 ├────────────── donations
 │
 ├────────────── xp_transactions
 │
 └────────────── lost_found
```

---

# Geospatial Queries

Sevana uses PostgreSQL extensions:

- cube
- earthdistance

Nearby searches are performed using:

- ll_to_earth()
- earth_box()
- earth_distance()

This avoids requiring PostGIS while still enabling efficient location-based searches.

---

# Security Features

- UUID primary keys
- Parameterized SQL queries
- JWT authentication
- Password hashing using bcrypt
- Input validation using Zod
- SQL Injection protection
- Role-based authorization

---

# Performance Optimizations

Current optimizations include:

- Indexed email lookup
- Indexed phone lookup
- Indexed user roles
- Parallel database queries using Promise.all()
- Geospatial filtering
- Cloudinary image hosting

---

# Future Improvements

Potential enhancements include:

- Soft delete support
- Audit logs
- Notification tables
- Chat system
- AI-assisted animal identification
- Rescue analytics
- Advanced reporting dashboards

---

# Database Summary

| Category | Status |
|----------|--------|
| Database | PostgreSQL |
| UUID Keys | ✓ |
| Constraints | ✓ |
| Foreign Keys | ✓ |
| Indexes | ✓ |
| Geospatial Search | ✓ |
| JWT Authentication | ✓ |
| Cloudinary Integration | ✓ |
| Normalized Schema | ✓ |

---

## Author

**Project:** Sevana – Community Animal Rescue Platform

**Database:** PostgreSQL

**Backend:** Node.js + Express.js

**Version:** 1.0