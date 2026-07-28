# Sevana Legal & Compliance Documentation

## Overview

This document outlines the legal, privacy, and data protection considerations for the Sevana platform.

Sevana is designed as a community-driven animal rescue platform. The application collects limited personal information necessary for authentication, rescue coordination, and user safety.

---

# Compliance Goals

The platform aims to follow good software engineering practices for:

- User privacy
- Data security
- Responsible data collection
- Secure authentication
- Consent-based processing

---

# Personal Data Collected

The application may collect the following information:

| Category | Examples |
|----------|----------|
| Identity | Full name |
| Contact | Email address, phone number |
| Authentication | Encrypted password |
| Location | Latitude, longitude, city, state |
| Profile | Avatar, bio |
| Emergency Contact | Name and phone number |
| Rescue Activity | Reports created, volunteer responses |
| Uploaded Content | Animal images |

---

# Purpose of Data Collection

Collected information is used only for:

- User authentication
- Profile management
- Animal rescue coordination
- Volunteer assignment
- Nearby veterinary recommendations
- Nearby NGO recommendations
- Leaderboard and XP calculations
- Lost & Found services

---

# Authentication & Security

Sevana implements multiple security mechanisms.

## Password Protection

- Passwords are hashed using **bcrypt** before storage.
- Plain-text passwords are never stored.

## Authentication

- JWT (JSON Web Token) is used for authenticated sessions.
- Protected APIs require a valid Bearer Token.

## Database Security

- Parameterized SQL queries are used to reduce SQL injection risks.
- Input validation is performed before database operations.

---

# Location Data

The application may use approximate user location to:

- Find nearby rescue reports.
- Locate veterinary clinics.
- Display nearby NGOs.

Location data is used only to provide these features and is not intended for unrelated purposes.

---

# Image Uploads

Uploaded images are stored using Cloudinary.

Users are responsible for ensuring they have the right to upload the images they submit.

Images should not contain:

- Illegal content
- Offensive content
- Copyright-infringing material

---

# User Responsibilities

Users agree to:

- Provide accurate information.
- Avoid misuse of the platform.
- Respect volunteers and rescue organizations.
- Refrain from uploading harmful or illegal content.

---

# Data Retention

User data is retained while the account remains active.

If account deletion functionality is implemented, associated personal data should be removed or anonymized where appropriate, subject to applicable legal or operational requirements.

---

# Data Deletion Requests

Future versions of Sevana may allow users to:

- Delete their account.
- Request deletion of personal information.
- Remove uploaded profile information.

---

# Third-Party Services

Sevana integrates with trusted third-party services.

| Service | Purpose |
|----------|---------|
| Cloudinary | Image hosting |
| PostgreSQL | Data storage |
| JWT | Authentication |
| bcrypt | Password hashing |

---

# DPDP Act 2023 Considerations

The project is designed with the following principles in mind:

- Obtain user consent before collecting personal data where required.
- Protect stored personal information using appropriate security measures.
- Limit data collection to what is necessary for platform functionality.
- Support future mechanisms for user data deletion requests.
- Handle location information responsibly.

---

# Limitations

This project is developed primarily as an educational and portfolio application.

Future production deployments should include:

- Comprehensive Privacy Policy
- Terms of Service
- Cookie Policy (if applicable)
- User consent management
- Security audits
- Regular vulnerability assessments

---

# Disclaimer

The Sevana project is intended for educational and demonstration purposes.

While reasonable efforts have been made to implement secure coding practices, users should perform additional security reviews before deploying the application in a production environment.

---

## Author

**Project:** Sevana – Community Animal Rescue Platform

**Version:** 1.0