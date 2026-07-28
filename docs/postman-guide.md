# Sevana Postman Guide

## Overview

This guide explains how to import and use the Sevana Postman Collection for testing the REST API.

The collection contains requests for all implemented backend modules, allowing developers to test endpoints without manually creating HTTP requests.

---

# Prerequisites

Before using the collection, ensure:

- Node.js server is running
- PostgreSQL database is running
- Cloudinary credentials are configured
- A valid JWT token is available for protected endpoints

---

# Base URL

```
http://localhost:5000/api/v1
```

For production, replace the base URL with your deployed backend URL.

---

# Importing the Collection

1. Open Postman.
2. Click **Import**.
3. Select the Sevana Postman Collection (`Sevana.postman_collection.json`).
4. Import the collection.

---

# Environment Variables

Create a Postman Environment with the following variables:

| Variable | Example Value |
|----------|---------------|
| base_url | http://localhost:5000/api/v1 |
| token | JWT access token |

---

# Authentication

Most endpoints require a Bearer Token.

Authorization Header:

```
Authorization: Bearer {{token}}
```

---

# API Modules

The collection is organized into the following folders:

- Authentication
- Users
- Animal Reports
- Vets
- NGOs
- Donations
- Lost & Found
- Raise Hand
- Uploads

---

# Testing Workflow

### Step 1 – Register a User

```
POST /auth/register
```

Expected Result:

- User account created successfully.

---

### Step 2 – Login

```
POST /auth/login
```

Expected Result:

- JWT access token returned.

Copy the token into the `token` environment variable.

---

### Step 3 – Access Protected APIs

Examples:

```
GET /users/me

GET /users/me/stats

POST /reports

PATCH /users/me
```

These requests should now authenticate successfully.

---

### Step 4 – Upload an Image

```
POST /uploads
```

Body Type:

- form-data

Key:

```
photo
```

Type:

```
File
```

Expected Result:

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

# Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# Troubleshooting

## 401 Unauthorized

Verify:

- JWT token is valid
- Authorization header is present
- Token has not expired

---

## 404 Not Found

Verify:

- Correct endpoint
- Correct API version
- Server is running

---

## 500 Internal Server Error

Verify:

- Database connection
- Environment variables
- Cloudinary configuration

---

# Best Practices

- Use environment variables instead of hardcoded URLs.
- Refresh the JWT token after login when required.
- Test validation with both valid and invalid inputs.
- Verify API responses against the documented API specification.

---

# Collection Maintenance

Whenever a new endpoint is added:

1. Add a corresponding request to the collection.
2. Update environment variables if needed.
3. Re-test all affected endpoints.
4. Commit the updated Postman collection to the repository.

---

# Summary

The Postman Collection provides a complete testing interface for the Sevana backend and should be kept in sync with the API implementation.