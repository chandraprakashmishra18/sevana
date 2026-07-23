# Sevana Coding Guidelines

Version: 1.0

Status: Approved

Owner: Sevana Engineering Team

---

# 1. Purpose

This document defines the coding standards and best practices for the
Sevana project.

Every contributor must follow these guidelines to ensure the codebase
remains:

- Clean
- Consistent
- Scalable
- Readable
- Maintainable

---

# 2. General Principles

Every line of code should be:

- Simple
- Readable
- Testable
- Reusable

Avoid clever code.

Prefer readable code.

Code is read far more often than it is written.

---

# 3. Folder Structure

Frontend

```
client/

src/

assets/

components/

layouts/

pages/

hooks/

services/

context/

utils/

styles/

constants/

routes/
```

Backend

```
server/

config/

controllers/

routes/

middleware/

models/

services/

utils/

validators/

uploads/

docs/
```

---

# 4. Naming Convention

Folders

snake_case

```
animal_reports
```

Files

camelCase

```
reportController.js

userService.js
```

Components

PascalCase

```
HomeScreen.jsx

ReportCard.jsx

VolunteerProfile.jsx
```

Variables

camelCase

```
reportCount

userLocation

volunteerProfile
```

Constants

UPPER_CASE

```
MAX_FILE_SIZE

JWT_SECRET

DEFAULT_RADIUS
```

Database

snake_case

```
created_at

user_id

report_id
```

---

# 5. Functions

Function names should describe actions.

Good

```
createReport()

updateStatus()

sendNotification()

awardXP()
```

Bad

```
doStuff()

temp()

abc()

test()
```

---

# 6. Single Responsibility Principle

Each function should do one thing.

Good

```
validateUser()

saveReport()

sendNotification()
```

Bad

```
createReportAndAwardXPAndNotifyUsers()
```

Break complex operations into smaller functions.

---

# 7. Controllers

Controllers should remain thin.

Controller responsibilities

- Receive Request
- Validate Input
- Call Service
- Return Response

Business logic belongs inside services.

---

# 8. Services

Services contain

- Business Logic
- Calculations
- Permission Checks
- Transactions

Services should not directly handle HTTP responses.

---

# 9. Validation

Never trust frontend input.

Use validation for

- Request body
- Params
- Query
- File uploads

Reject invalid requests immediately.

---

# 10. Error Handling

Use consistent responses.

Example

```
{
"success":false,
"message":"Unauthorized"
}
```

Never expose stack traces in production.

---

# 11. Async Code

Always use

```
async/await
```

Avoid deeply nested callbacks.

Handle every Promise rejection.

---

# 12. Database Queries

Use parameterized queries.

Correct

```
SELECT * FROM users WHERE id=$1
```

Never concatenate SQL strings.

---

# 13. Comments

Comment

WHY

not

WHAT

Good

```js
// Prevent duplicate rescue joins
```

Bad

```js
// Increment i
i++;
```

---

# 14. API Responses

Success

```json
{
"success":true,
"message":"Report created",
"data":{}
}
```

Error

```json
{
"success":false,
"message":"Validation failed"
}
```

Every API follows the same format.

---

# 15. Logging

Log

- Server start
- Errors
- Warnings
- Authentication
- Critical actions

Do not log

- Passwords
- JWT
- Secrets

---

# 16. Environment Variables

Never hardcode

- Database URL
- JWT Secret
- API Keys
- Cloudinary Credentials

Use

```
process.env
```

---

# 17. Security

Always verify

Authentication

↓

Authorization

↓

Ownership

↓

Validation

Never rely on frontend checks.

---

# 18. Transactions

Use transactions when multiple operations must succeed together.

Example

Create Report

↓

Create Notifications

↓

Award XP

↓

Create Timeline

If one fails

Rollback.

---

# 19. File Uploads

Allowed

- JPG
- PNG
- WEBP
- JPEG

Reject everything else.

Store files in Cloudinary.

Never inside Git.

---

# 20. React Components

Each component should have one responsibility.

Example

```
ReportCard

VolunteerCard

NotificationItem

TimelineCard
```

Avoid huge components.

Split reusable UI.

---

# 21. State Management

Local State

useState

Global State

Context API

Future

Redux only if necessary.

---

# 22. Styling

Use one styling approach consistently.

Avoid inline styles unless necessary.

Prefer reusable styles.

---

# 23. Reusability

If code is repeated

three times

move it into

- utility
- helper
- hook
- component

---

# 24. Git Workflow

Feature Branch

↓

Development

↓

Testing

↓

Main

Commit Messages

Good

```
feat: add rescue timeline

fix: authorization for report updates

docs: update api specification

refactor: simplify notification service
```

Bad

```
update

changes

fix

abc
```

---

# 25. Code Review Checklist

Before merging

✓ Builds successfully

✓ Passes tests

✓ No console errors

✓ No hardcoded secrets

✓ Documentation updated

✓ Security reviewed

✓ Validation implemented

✓ Clean code

---

# 26. Performance

Avoid

- Duplicate queries
- Unnecessary renders
- Large components
- Blocking operations

Optimize

- Database indexes
- Pagination
- Image loading
- Memoization

---

# 27. Documentation

Every major module should include

Purpose

Inputs

Outputs

Dependencies

Examples

Keep documentation updated.

---

# 28. Testing

Every new feature should be tested.

Minimum

- Happy path
- Invalid input
- Permission checks
- Edge cases

---

# 29. Development Principles

1. Readability over cleverness.

2. Security before convenience.

3. Backend owns business logic.

4. Database is the source of truth.

5. Never duplicate logic.

6. Write code for future teammates.

7. Small commits.

8. Continuous refactoring.

---

# 30. Definition of Done

A feature is complete only if:

✓ Code written

✓ Validation added

✓ Security checked

✓ API tested

✓ UI tested

✓ Documentation updated

✓ Code reviewed

✓ No known critical bugs

---

# End of Document