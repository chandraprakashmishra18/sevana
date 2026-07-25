# Security Guidelines

**Project:** Sevana - Animal Rescue Platform  
**Version:** 1.0  
**Last Updated:** July 2026

---

# Purpose

This document defines the security policies, practices, and standards followed throughout the Sevana project.

Security is considered a core feature of the application rather than an optional enhancement.

Every contributor is responsible for writing secure code.

---

# Table of Contents

1. Security Principles
2. Authentication
3. Authorization
4. Password Security
5. JWT Security
6. Input Validation
7. SQL Injection Prevention
8. XSS Prevention
9. CSRF Prevention
10. File Upload Security
11. API Security
12. Environment Variables
13. Database Security
14. Docker Security
15. Logging
16. Error Handling
17. Rate Limiting
18. Production Checklist
19. Security Review Checklist

---

# 1. Security Principles

Follow these principles at all times:

- Never trust user input.
- Validate everything.
- Fail securely.
- Grant the minimum permissions required.
- Keep secrets out of source code.
- Protect sensitive user data.
- Assume malicious input is possible.

---

# 2. Authentication

Authentication is handled using:

- JWT
- bcrypt password hashing

Features

- Register
- Login
- Logout
- Protected Routes
- Current User (/me)

Passwords are never stored in plain text.

---

# 3. Authorization

Authentication verifies identity.

Authorization determines permissions.

Roles

- user
- volunteer
- vet
- ngo
- admin

Protected routes must always verify:

- Valid JWT
- User exists
- Required role

Never trust frontend role information.

---

# 4. Password Security

Passwords must

- Minimum 8 characters (recommended)
- Be hashed using bcrypt
- Never be logged
- Never be returned in API responses

Use bcrypt with an appropriate cost factor.

Never create your own hashing algorithm.

---

# 5. JWT Security

JWT Secret

Stored only inside

.env

Never commit secrets.

JWT should contain only necessary information.

Example payload

- user id
- role

Do not store passwords or sensitive personal information inside JWT.

---

# 6. Input Validation

Every API request must be validated.

Validation Layers

Frontend

↓

Backend (Zod)

↓

Database Constraints

Backend validation is mandatory.

Never trust client-side validation alone.

---

# 7. SQL Injection Prevention

Always use parameterized queries.

Good

SELECT * FROM users WHERE email = $1

Bad

SELECT * FROM users WHERE email = '${email}'

Never concatenate SQL strings.

Repositories are responsible for all database access.

---

# 8. Cross-Site Scripting (XSS)

Never render untrusted HTML.

Escape user-generated content.

Avoid dangerouslySetInnerHTML unless absolutely necessary.

Validate and sanitize any rich text input if introduced in future.

---

# 9. Cross-Site Request Forgery (CSRF)

Current Authentication

JWT Authorization Header

Since authentication is token-based, CSRF risk is lower than cookie-based authentication.

If cookies are introduced in future:

- Enable CSRF protection
- Use SameSite cookies
- Use Secure cookies

---

# 10. File Upload Security

Accept only supported file types.

Allowed

- jpg
- jpeg
- png
- webp

Reject

- exe
- bat
- js
- php
- sh

Validate

- MIME type
- File extension
- Maximum file size

Store uploads in Cloudinary.

Never execute uploaded files.

---

# 11. API Security

All APIs must

- Validate input
- Authenticate user when required
- Authorize user
- Return consistent responses
- Handle errors safely

Never expose stack traces.

Never expose SQL errors.

---

# 12. Environment Variables

Sensitive configuration belongs in

.env

Examples

DATABASE_URL

JWT_SECRET

REDIS_URL

CLOUDINARY_API_KEY

Never commit

.env

Use

.env.example

for documentation.

---

# 13. Database Security

Database users should have minimum required permissions.

Use foreign keys.

Use constraints.

Use transactions.

Never expose raw SQL errors.

Never allow direct database access from frontend.

---

# 14. Docker Security

Do not expose unnecessary ports.

Keep images updated.

Use official Docker images.

Never store secrets inside Dockerfiles.

Mount volumes carefully.

---

# 15. Logging

Log

- Authentication attempts
- Server startup
- Database errors
- Unexpected exceptions

Do NOT log

- Passwords
- JWT tokens
- Personal user information
- Secrets
- API keys

Logs should assist debugging without leaking sensitive data.

---

# 16. Error Handling

Users should receive friendly error messages.

Good

"Email already exists."

Bad

duplicate key value violates unique constraint users_email_key

Internal errors should be logged, not exposed.

---

# 17. Rate Limiting

Recommended

Authentication

5–10 login attempts per minute

Report Creation

Prevent spam submissions

General APIs

Apply reasonable request limits

Future Implementation

- express-rate-limit
- Redis-backed rate limiting

---

# 18. CORS Policy

Allow only trusted origins.

Development

http://localhost:5173

Production

Official frontend domain only.

Avoid using

Access-Control-Allow-Origin: *

in production.

---

# 19. HTTP Security Headers

Use Helmet middleware.

Enable

- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy
- HSTS (Production)

---

# 20. Dependency Security

Regularly update packages.

Run

npm audit

Review vulnerabilities before deployment.

Remove unused dependencies.

---

# 21. Secrets Management

Never hardcode

- API Keys
- Database Passwords
- JWT Secrets
- Cloudinary Credentials

Secrets must remain outside Git.

---

# 22. Production Checklist

Before deployment

☐ HTTPS enabled

☐ JWT secret configured

☐ Environment variables configured

☐ Database credentials secured

☐ CORS restricted

☐ Helmet enabled

☐ Input validation tested

☐ File upload restrictions tested

☐ SQL injection reviewed

☐ Logs reviewed

☐ npm audit completed

---

# 23. Security Review Checklist

Before merging code

☐ Input validated

☐ SQL parameterized

☐ Authentication verified

☐ Authorization verified

☐ No secrets committed

☐ Error handling reviewed

☐ Logs sanitized

☐ Documentation updated

---

# 24. Incident Response

If a security issue is discovered

1. Identify affected module.

2. Reproduce the issue.

3. Fix immediately.

4. Test related functionality.

5. Update documentation.

6. Inform all contributors.

Never ignore a security issue.

---

# Final Principle

Security is everyone's responsibility.

Every line of code should be written with the assumption that it may be exposed to malicious input.

Protecting user data, maintaining trust, and preventing vulnerabilities are fundamental goals of the Sevana project.