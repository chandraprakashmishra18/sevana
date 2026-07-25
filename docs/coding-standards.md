# Coding Standards

**Project:** Sevana - Animal Rescue Platform  
**Version:** 1.0  
**Last Updated:** July 2026

---

# Purpose

This document defines the coding standards followed throughout the Sevana project.

The objective is to maintain:

- Clean Architecture
- Readability
- Scalability
- Security
- Consistency
- Maintainability

Every contributor must follow these standards.

---

# Table of Contents

1. General Principles
2. Project Architecture
3. Folder Structure
4. Naming Conventions
5. Backend Standards
6. Frontend Standards
7. Database Standards
8. API Standards
9. Error Handling
10. Logging
11. Validation
12. Performance
13. Documentation
14. Code Review Checklist

---

# 1. General Principles

Always write code for humans first.

A good developer spends more time reading code than writing code.

Therefore every piece of code must be:

- Simple
- Readable
- Modular
- Reusable
- Secure
- Tested

Never write code that only works.

Write code that another developer can understand after six months.

---

# 2. Project Architecture

Backend Architecture

Routes

↓

Controllers

↓

Services

↓

Repositories

↓

Database

Responsibilities

Routes

- Register endpoints
- Attach middleware
- Never write business logic

Controllers

- Handle request
- Call services
- Return response

Services

- Business logic
- Validation flow
- Transactions
- Coordination

Repositories

- SQL Queries only

Database

- Data storage

Never violate this architecture.

---

# 3. Folder Structure

Backend

src/

config/

controllers/

middleware/

repositories/

routes/

services/

validators/

utils/

Frontend

src/

pages/

components/

hooks/

context/

layouts/

styles/

assets/

Never create unnecessary folders.

---

# 4. Naming Conventions

Variables

Good

```js
user
report
volunteer
currentUser
```

Bad

```js
u
x
data1
obj
```

---

Functions

Good

```js
createReport()

getUserById()

acceptRescue()

updateProfile()
```

Bad

```js
func()

abc()

submit()

test()
```

---

Files

Controllers

```
auth.controller.js
```

Routes

```
auth.routes.js
```

Services

```
auth.service.js
```

Repositories

```
auth.repository.js
```

Validators

```
auth.validator.js
```

Always use lowercase.

Always use dot notation.

Never use spaces.

---

React Components

Good

```
LoginPage.jsx

Navbar.jsx

AnimalCard.jsx

ReportDetails.jsx
```

Use PascalCase.

---

Variables

camelCase

```
firstName

reportStatus

currentLocation
```

---

Constants

UPPER_SNAKE_CASE

```
JWT_SECRET

MAX_UPLOAD_SIZE

DEFAULT_RADIUS
```

---

Database

snake_case

```
created_at

updated_at

animal_reports

user_id
```

---

# 5. Backend Standards

Controllers

Controllers must only:

- Read request
- Call service
- Return response

Example

```js
async function register(req, res) {
    const user = await authService.register(req.body);

    return res.status(201).json(user);
}
```

Controllers should never:

- Write SQL
- Hash passwords
- Generate JWT
- Perform business logic

---

Services

Services contain:

- Business rules
- Password hashing
- JWT creation
- Transactions
- Validation flow

---

Repositories

Repositories communicate with PostgreSQL.

Only SQL belongs here.

Example

```js
getUserByEmail(email)

createUser(data)

updateUser(id)
```

No business logic.

---

Routes

Routes only connect:

Endpoint

↓

Middleware

↓

Controller

Example

```js
router.post(
    "/register",
    validate(registerSchema),
    authController.register
);
```

---

# 6. Frontend Standards

Pages

Contain:

- Layout
- API calls
- Page structure

Components

Contain:

Reusable UI only.

Hooks

Reusable logic.

Context

Application state.

Never duplicate components.

---

State Management

Prefer Context API.

Avoid unnecessary prop drilling.

---

Styling

Keep styles modular.

Avoid inline CSS.

Maintain consistent spacing.

---

# 7. Database Standards

Primary Keys

UUID

Never integer IDs.

---

Naming

Tables

snake_case

Columns

snake_case

Indexes

idx_table_column

Foreign Keys

fk_table_reference

---

Queries

Always parameterized.

Good

```sql
SELECT * FROM users
WHERE email = $1;
```

Bad

```sql
SELECT * FROM users
WHERE email = '${email}'
```

---

# 8. API Standards

Success Response

```json
{
    "success": true,
    "message": "User registered successfully.",
    "data": {}
}
```

Failure Response

```json
{
    "success": false,
    "message": "Validation failed.",
    "errors": []
}
```

Never return inconsistent formats.

---

HTTP Status Codes

200

Success

201

Created

400

Bad Request

401

Unauthorized

403

Forbidden

404

Not Found

409

Conflict

422

Validation Error

500

Internal Server Error

---

# 9. Error Handling

Never expose stack traces.

Never expose SQL errors.

Always return meaningful messages.

Good

```
Email already exists.
```

Bad

```
duplicate key value violates unique constraint users_email_key
```

---

# 10. Logging

Log

Application start

Authentication

Errors

Warnings

Database failures

Never log:

Passwords

JWT

Secrets

Environment variables

Personal information

---

# 11. Validation

Every endpoint must validate input.

Frontend validation

↓

Backend validation

↓

Database constraints

Never trust frontend data.

---

# 12. Performance

Select only required columns.

Use indexes.

Avoid SELECT *

Use pagination.

Cache frequent data.

Use transactions for related operations.

---

# 13. Documentation

Every module must include

Purpose

Dependencies

API

Database tables

Future improvements

Keep documentation updated.

---

# 14. Security Standards

Passwords

bcrypt

JWT

HTTP Only when applicable

Parameterized SQL

Input validation

Environment variables

Role middleware

Rate limiting (future)

Helmet

CORS

Never disable security middleware.

---

# 15. Git Commit Standards

Good

```
feat(auth): implement user registration

fix(report): resolve duplicate upload

refactor(service): simplify report creation

docs(api): update authentication endpoints

style(ui): improve login page layout
```

Bad

```
update

changes

done

new

fix
```

---

# 16. Code Review Checklist

Before every commit ask:

✅ Is the code readable?

✅ Is the code reusable?

✅ Is validation implemented?

✅ Is error handling correct?

✅ Does it follow architecture?

✅ Is SQL parameterized?

✅ Are responses consistent?

✅ Are secrets protected?

✅ Is documentation updated?

If any answer is "No", revise before merging.

---

# Final Principle

Code should not only work today.

It should still be understandable, maintainable, and secure six months from now by any developer joining the Sevana project.

Every contributor is responsible for maintaining these standards.