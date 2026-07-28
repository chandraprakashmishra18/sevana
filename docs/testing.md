# Sevana Backend Testing Documentation

## Overview

This document describes the testing performed on the Sevana Backend REST API.

Testing was performed using **Postman** against the local development server.

---

# Test Environment

| Item | Value |
|------|-------|
| Backend | Node.js + Express |
| Database | PostgreSQL |
| API Client | Postman |
| Authentication | JWT Bearer Token |
| Image Storage | Cloudinary |
| Base URL | http://localhost:5000/api/v1 |

---

# Authentication Module

## Register User

| Test | Status |
|------|--------|
| Valid registration | ✅ Pass |
| Duplicate email | ✅ Pass |
| Duplicate phone | ✅ Pass |
| Invalid request body | ✅ Pass |

---

## Login

| Test | Status |
|------|--------|
| Valid credentials | ✅ Pass |
| Invalid password | ✅ Pass |
| Invalid phone | ✅ Pass |
| Missing fields | ✅ Pass |

---

# Users Module

## GET /users/me

| Test | Status |
|------|--------|
| Valid JWT | ✅ Pass |
| Invalid JWT | ✅ Pass |
| Missing JWT | ✅ Pass |

---

## PATCH /users/me

| Test | Status |
|------|--------|
| Update profile | ✅ Pass |
| Partial update | ✅ Pass |
| Empty request | ✅ Pass |
| Invalid JWT | ✅ Pass |

---

## GET /users/me/stats

| Test | Status |
|------|--------|
| Fetch dashboard statistics | ✅ Pass |
| Without location | ✅ Pass |
| With location | ✅ Pass |

---

# Animal Reports Module

| Endpoint | Status |
|----------|--------|
| Create Report | ✅ Pass |
| List Reports | ✅ Pass |
| Report Details | ✅ Pass |
| Update Status | ✅ Pass |
| Respond to Report | ✅ Pass |

---

# Vets Module

| Endpoint | Status |
|----------|--------|
| Nearby Vets | ✅ Pass |

---

# NGOs Module

| Endpoint | Status |
|----------|--------|
| Nearby NGOs | ✅ Pass |

---

# Donations Module

| Endpoint | Status |
|----------|--------|
| Create Donation | ✅ Pass |
| List Donations | ✅ Pass |

---

# Lost & Found Module

| Endpoint | Status |
|----------|--------|
| Create Report | ✅ Pass |
| List Reports | ✅ Pass |

---

# Raise Hand Module

| Endpoint | Status |
|----------|--------|
| Volunteer Response | ✅ Pass |

---

# Upload Module

| Test | Status |
|------|--------|
| Upload Image | ✅ Pass |
| Invalid File | ✅ Pass |
| Missing File | ✅ Pass |

---

# Security Testing

| Test | Status |
|------|--------|
| JWT Authentication | ✅ Pass |
| SQL Injection Protection | ✅ Pass |
| Password Hashing | ✅ Pass |
| Input Validation | ✅ Pass |
| Unauthorized Access | ✅ Pass |

---

# Database Testing

| Test | Status |
|------|--------|
| User Creation | ✅ Pass |
| Report Creation | ✅ Pass |
| Rescue Creation | ✅ Pass |
| Donation Creation | ✅ Pass |
| Nearby Search | ✅ Pass |

---

# Performance Testing

The backend was tested using a local PostgreSQL database.

Observations:

- Average API response time: < 200 ms
- File uploads completed successfully
- Nearby geolocation queries executed correctly
- Concurrent database queries performed using `Promise.all()` where applicable

---

# Testing Summary

| Category | Status |
|----------|--------|
| Authentication | ✅ |
| Users | ✅ |
| Animal Reports | ✅ |
| Vets | ✅ |
| NGOs | ✅ |
| Donations | ✅ |
| Lost & Found | ✅ |
| Raise Hand | ✅ |
| Uploads | ✅ |
| Database | ✅ |
| Security | ✅ |

---

# Known Limitations

Current version does not include:

- Automated unit tests
- Automated integration tests
- Load testing
- End-to-end browser testing

These are planned for future releases.

---

## Conclusion

All implemented REST API endpoints were successfully tested using Postman.

The backend is considered functionally stable for frontend integration and deployment.