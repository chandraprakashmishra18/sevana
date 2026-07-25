# Database Guidelines

**Project:** Sevana - Animal Rescue Platform  
**Database:** PostgreSQL 16  
**Version:** 1.0  
**Last Updated:** July 2026

---

# Purpose

This document defines the database architecture, standards, conventions, and best practices used throughout the Sevana project.

The objectives are:

- Maintain data integrity
- Ensure scalability
- Improve query performance
- Keep schema consistent
- Simplify future maintenance

Every developer modifying the database must follow this document.

---

# Table of Contents

1. Database Overview
2. Database Architecture
3. Naming Conventions
4. Tables
5. Relationships
6. Primary Keys
7. Foreign Keys
8. Indexing Strategy
9. Constraints
10. Transactions
11. Migrations
12. Query Guidelines
13. Performance Guidelines
14. Security Guidelines
15. Backup Strategy
16. Future Scalability

---

# 1. Database Overview

Database Engine

PostgreSQL 16

Infrastructure

Docker

Extensions Used

- uuid-ossp
- cube
- earthdistance

Redis is used separately for caching.

The database is designed to support thousands of reports and volunteers efficiently.

---

# 2. Database Architecture

Logical Flow

Users

↓

Animal Reports

↓

Report Media

↓

Rescue Updates

↓

Notifications

↓

XP

↓

Achievements

↓

Leaderboard

↓

Donations

↓

NGOs

↓

Veterinarians

Each module has its own table and responsibility.

Avoid tightly coupling unrelated tables.

---

# 3. Current Schema

Core Tables

- users
- animal_reports
- report_media
- rescue_updates
- vets
- ngos
- donations
- notifications
- xp_transactions
- achievements
- badges

Migration Tracking

schema_migrations

Database migrations are considered the single source of truth.

---

# 4. Naming Conventions

Tables

Use plural snake_case.

Examples

users

animal_reports

report_media

user_achievements

Bad

User

AnimalReport

tblUsers

Columns

Use snake_case.

Good

created_at

updated_at

user_id

report_status

Bad

CreatedAt

UserID

reportStatus

Indexes

idx_table_column

Example

idx_users_email

idx_reports_location

idx_reports_created_at

Foreign Keys

fk_table_reference

Example

fk_reports_users

Constraints

chk_latitude

chk_longitude

chk_status

---

# 5. Primary Keys

Every table uses UUID.

Example

id UUID PRIMARY KEY

Never use integer auto increment IDs.

Reasons

- Better security
- Harder to guess IDs
- Easier distributed systems
- Safer future synchronization

---

# 6. Foreign Keys

Always enforce relationships.

Example

animal_reports.user_id

↓

users.id

Never leave orphan records.

Always use foreign key constraints.

---

# 7. Relationships

Users

↓

Animal Reports

↓

Report Media

↓

Rescue Updates

Users

↓

XP Transactions

↓

Achievements

Users

↓

Notifications

Users

↓

Donations

Relationships should be normalized.

Avoid duplicate data.

---

# 8. Indexing Strategy

Index every frequently searched column.

Examples

email

phone

created_at

status

location

user_id

Good

CREATE INDEX idx_users_email
ON users(email);

Avoid unnecessary indexes because they slow inserts.

---

# 9. Constraints

Every table should include constraints.

Examples

Latitude

BETWEEN -90 AND 90

Longitude

BETWEEN -180 AND 180

Status

Must match ENUM values.

Email

Unique

Phone

Unique (when applicable)

Never rely only on frontend validation.

---

# 10. Transactions

Use transactions whenever multiple tables are modified.

Example

Create report

↓

Insert report

↓

Insert images

↓

Award XP

↓

Create notification

All operations succeed

OR

Everything rolls back.

Never leave partial data.

---

# 11. Migration Guidelines

Every schema change requires a migration.

Never edit previous migrations.

Create new migration files.

Migration Naming

01_users.sql

02_reports.sql

03_vets.sql

Never rename migrations after they are executed.

---

# 12. Migration Tracking

The project uses

schema_migrations

Features

- SHA256 checksum
- Executed timestamp
- Skip already executed files
- Transaction per migration

Run

npm run migrate

Expected Output

Database is up to date.

Never manually insert migration records.

---

# 13. Query Guidelines

Always use parameterized queries.

Good

SELECT *

FROM users

WHERE email = $1;

Bad

SELECT *

FROM users

WHERE email = '${email}';

Never concatenate SQL strings.

Avoid SELECT * in production queries.

Select only required columns.

---

# 14. Performance Guidelines

Always

Use indexes

Limit query results

Use pagination

Avoid nested queries

Use JOIN instead of repeated queries

Cache repeated data with Redis

Prefer EXISTS over COUNT when checking existence

Batch inserts when possible

---

# 15. Pagination

Every listing endpoint must support pagination.

Example

GET /reports?page=1&limit=20

Never return thousands of rows.

---

# 16. Soft Delete Policy

Currently

No soft delete.

Records are deleted only when necessary.

Future

Add

deleted_at

for audit support.

---

# 17. Geolocation

Nearby searches use

cube

earthdistance

Instead of PostGIS.

Reason

Simpler deployment

Lower resource usage

Enough for current project needs

Future migration to PostGIS is possible.

---

# 18. Media Storage

Images are NOT stored in PostgreSQL.

Database stores only

image_url

Cloudinary stores the actual files.

---

# 19. Security Guidelines

Never expose database credentials.

Never commit .env.

Never execute raw SQL from user input.

Always validate IDs.

Use least privilege database users.

Never allow DROP TABLE in production.

---

# 20. Backup Strategy

Development

Docker Volume

Production

Daily Backup

Weekly Snapshot

Monthly Archive

Backups should be stored outside the application server.

---

# 21. Future Scalability

Future improvements include

- Read replicas
- Redis caching
- PostGIS migration
- Database partitioning
- Audit logs
- Search optimization
- Full-text search
- Analytics database

Current schema supports these future upgrades.

---

# 22. Database Review Checklist

Before modifying the database ask:

✅ Is a new migration required?

✅ Will this break existing data?

✅ Are indexes needed?

✅ Are constraints added?

✅ Is the query parameterized?

✅ Is transaction required?

✅ Is rollback possible?

✅ Is documentation updated?

---

# Database Principles

The database is the foundation of Sevana.

Every schema change should prioritize:

- Data Integrity
- Performance
- Security
- Maintainability
- Scalability

Never make database changes without considering their impact on existing modules and future growth.