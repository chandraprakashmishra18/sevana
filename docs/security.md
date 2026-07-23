# Sevana Security Documentation

Version: 1.0

Status: Approved

Owner: Sevana Engineering Team

---

# 1. Purpose

This document defines the security architecture of Sevana.

It covers:

- Authentication
- Authorization
- Data Protection
- API Security
- Database Security
- File Upload Security
- Abuse Prevention
- Audit Logging
- Production Security Checklist

Every backend developer must follow this document.

---

# 2. Security Principles

Sevana follows these principles:

1. Never trust the client.
2. Validate everything.
3. Authenticate every protected request.
4. Authorize every sensitive action.
5. Store passwords securely.
6. Protect user privacy.
7. Keep complete audit logs.
8. Fail securely.

---

# 3. Authentication

Authentication is handled using JSON Web Tokens (JWT).

Flow

User Login

↓

Validate Credentials

↓

Generate JWT

↓

Return JWT

↓

Client Stores Token

↓

Protected Requests Include Token

Authorization Header

```

Authorization: Bearer \<JWT>

```

---

# 4. Password Security

Passwords are never stored in plaintext.

Requirements

Minimum Length

8 characters

Hash Algorithm

bcrypt

Password hashes must never be returned in API responses.

---

# 5. Authorization (RBAC)

Role Based Access Control

Roles

- User
- Volunteer
- Vet
- NGO
- Admin

Every protected endpoint checks:

1. Authentication
2. User Role
3. Ownership (if required)

---

# 6. Ownership Validation

Example

User A creates a report.

User B cannot edit it.

Validation

```

report.reporter_id == req.user.id

```

OR

```

req.user.role == "admin"

```

Without ownership verification,

the request must fail.

---

# 7. Report Status Security

Status updates are restricted.

Allowed

- Rescue Participants
- Reporter
- Admin

Not Allowed

Random authenticated users.

Every status update verifies:

- User joined rescue
- Report is active
- Status transition is valid

---

# 8. Status Transition Rules

Invalid transitions are rejected.

Example

Allowed

REPORTED

↓

RESPONDERS_JOINING

↓

RESPONDER_ON_SITE

↓

FIRST_AID_GIVEN

Not Allowed

REPORTED

↓

CLOSED

---

# 9. Rescue Confirmation Security

Only the Reporter can confirm a rescue.

Admin may override only when necessary.

Confirmation cannot happen twice.

---

# 10. Report Closing Security

Reports may only be closed by:

- Reporter
- Admin

Closed reports become read-only.

Timeline becomes locked.

No additional updates are allowed.

---

# 11. Volunteer Security

Users cannot assign themselves the Volunteer role.

Volunteer approval requires:

Application

↓

Admin Review

↓

Approval

↓

Role Updated

---

# 12. Admin Security

Admin-only actions include:

- Volunteer Approval
- User Moderation
- Report Moderation
- Report Closure Override
- Abuse Investigation

Every admin action is logged.

---

# 13. Input Validation

Every request validates:

- Required fields
- UUID format
- String length
- Enum values
- Coordinates
- File types

Reject invalid input before database access.

---

# 14. SQL Injection Prevention

Use parameterized queries only.

Never build SQL using string concatenation.

Example

Correct

SELECT * FROM users WHERE id = $1

Incorrect

SELECT * FROM users WHERE id = " + id

---

# 15. XSS Protection

Escape user-generated content.

Sanitize:

- Timeline text
- Stories
- Comments (future)
- Profile descriptions

Never render raw HTML from users.

---

# 16. File Upload Security

Allowed Types

- JPG
- JPEG
- PNG
- WEBP

Maximum Size

10 MB

Rejected

- EXE
- ZIP
- JS
- HTML
- SVG (unless sanitized)

Store uploads outside the application server (e.g., Cloudinary).

---

# 17. Rate Limiting

Protect sensitive endpoints.

Examples

Login

5 requests / minute

Report Creation

10 reports / hour

Volunteer Application

3/day

Status Updates

Reasonable cooldown

Prevent spam and abuse.

---

# 18. Notification Abuse Prevention

Do not notify users repeatedly.

Duplicate notifications are suppressed.

Critical notifications may bypass suppression.

---

# 19. XP Abuse Prevention

XP is awarded only by backend logic.

Clients cannot modify XP.

Duplicate rewards are prevented.

Every XP award creates a transaction record.

---

# 20. Trust Score Security

Trust Score cannot be modified by clients.

Only backend business logic updates trust.

Examples

Increase

- Confirmed rescue
- Helpful participation

Decrease

- Fake reports
- Spam
- Rescue abandonment

---

# 21. Audit Logging

The following actions are logged:

- User Login
- Report Created
- Report Updated
- Participant Joined
- Status Changed
- Rescue Confirmed
- Report Closed
- Volunteer Approved
- Admin Actions

Audit logs should include:

- User ID
- Action
- Timestamp
- IP Address (optional)
- Device Information (future)

---

# 22. Sensitive Data

Sensitive information includes:

- Password Hashes
- JWT Secrets
- Cloudinary Keys
- Database Passwords
- API Keys

Never expose them to:

- Frontend
- Logs
- GitHub

Use environment variables.

---

# 23. Environment Variables

Store secrets in .env

Examples

JWT_SECRET

DATABASE_URL

CLOUDINARY_API_KEY

CLOUDINARY_SECRET

Never commit .env files.

---

# 24. Database Security

Use Foreign Keys.

Use Constraints.

Use Transactions.

Restrict direct database access.

Production database should not be publicly accessible.

---

# 25. API Security Checklist

Every endpoint must:

✓ Validate JWT

✓ Validate Role

✓ Validate Ownership

✓ Validate Input

✓ Handle Errors

✓ Return Standard Response

✓ Prevent Duplicate Actions

✓ Log Critical Events

---

# 26. Error Handling

Do not expose internal errors.

Incorrect

SQL syntax error...

Correct

Internal Server Error

Log detailed errors internally.

Return generic messages to clients.

---

# 27. Logging Policy

Production logs should never contain:

- Passwords
- JWT Tokens
- Credit Card Data
- Government IDs
- Personal Secrets

---

# 28. Backup Strategy

Production database backups

Daily

Retention

30 days

Encrypted backups preferred.

---

# 29. Production Security Checklist

Before deployment:

✓ HTTPS Enabled

✓ JWT Secret Changed

✓ Database Secured

✓ Environment Variables Configured

✓ Rate Limiting Enabled

✓ File Validation Enabled

✓ Logging Enabled

✓ CORS Configured

✓ Helmet Enabled

✓ Input Validation Enabled

✓ Error Handling Reviewed

✓ Audit Logging Enabled

---

# 30. Future Security Enhancements

Planned features:

- Refresh Tokens
- Multi-Factor Authentication (MFA)
- Device Management
- Suspicious Login Detection
- Admin Activity Dashboard
- IP Reputation Checks
- WebSocket Authentication
- End-to-End Notification Security

---

# 31. Security Philosophy

Security is not a feature.

Security is part of every feature.

Every new endpoint, controller, database change, and UI component must be reviewed for:

- Authentication
- Authorization
- Validation
- Abuse Prevention
- Privacy
- Auditability

If any of these are missing, the implementation is considered incomplete.

---

# End of Document