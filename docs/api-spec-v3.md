# Sevana Backend API Specification V3

## Version

**Current Version:** v1

**Base URL**

```
http://localhost:5000/api/v1
```

---

# Authentication

All protected endpoints require a JWT access token.

```
Authorization: Bearer <access_token>
```

---

# Response Format

## Success

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

## Error

```json
{
  "success": false,
  "message": "Something went wrong."
}
```

---

# Authentication Module

## Register User

### Endpoint

```
POST /auth/register
```

### Authentication

Not Required

### Request Body

```json
{
  "full_name": "Prashant Mishra",
  "email": "prashant@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully.",
  "data": {
    "user": {}
  }
}
```

---

## Login

### Endpoint

```
POST /auth/login
```

### Authentication

Not Required

### Request Body

```json
{
  "phone": "9876543210",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "access_token": "...",
    "user": {}
  }
}
```

---

# Users Module

---

## Get My Profile

### Endpoint

```
GET /users/me
```

### Authentication

Required

### Success Response

```json
{
  "success": true,
  "user": {
    "id": "...",
    "full_name": "Prashant Mishra",
    "email": "prashant@example.com",
    "phone": "9876543210",
    "role": "user",
    "xp": 320,
    "level": 1
  }
}
```

---

## Update My Profile

### Endpoint

```
PATCH /users/me
```

### Authentication

Required

### Request Body

```json
{
  "bio": "Animal lover",
  "city": "Gurugram",
  "state": "Haryana",
  "blood_group": "B+"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Profile updated successfully.",
  "user": {}
}
```

---

## My Statistics

### Endpoint

```
GET /users/me/stats
```

### Authentication

Required

### Query Parameters

| Name | Type | Required |
|------|------|----------|
| lat | number | No |
| lng | number | No |

### Success Response

```json
{
  "success": true,
  "data": {
    "active": 8,
    "myRescues": 12,
    "vetsNearby": 4
  }
}
```

---

# Animal Reports Module

## Create Report

```
POST /reports
```

Authentication Required

---

## Get Nearby Reports

```
GET /reports
```

Authentication Required

Supports nearby search using latitude and longitude.

---

## Get Report Details

```
GET /reports/:id
```

Authentication Required

---

## Update Report Status

```
PATCH /reports/:id/status
```

Authentication Required

---

## Respond To Report

```
POST /reports/:id/respond
```

Authentication Required

---

# Vets Module

## Get Nearby Vets

```
GET /vets
```

Authentication Required

Supports nearby search.

---

# NGOs Module

## Get Nearby NGOs

```
GET /ngos
```

Authentication Required

---

# Donations Module

## Create Donation

```
POST /donations
```

Authentication Required

---

## List Donations

```
GET /donations
```

Authentication Required

---

# Lost & Found Module

## Create Lost & Found Report

```
POST /lost-found
```

Authentication Required

---

## Get Lost & Found Reports

```
GET /lost-found
```

Authentication Required

---

# Raise Hand Module

## Volunteer For Rescue

```
POST /raise-hand
```

Authentication Required

---

# Upload Module

## Upload Image

```
POST /uploads
```

Authentication Required

### Form Data

```
photo : File
```

### Success Response

```json
{
  "success": true,
  "data": {
    "url": "...",
    "publicId": "..."
  }
}
```

---

# HTTP Status Codes

| Code | Meaning |
|------|----------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# Technologies

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Cloudinary
- Multer
- Zod Validation
- Docker