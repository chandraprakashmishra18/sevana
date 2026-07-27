# Sevana Development Conflicts Log

## 26 July 2026


## Database Configuration Conflict

Issue:
- Backend expected PostgreSQL credentials that were not available locally.

Expected configuration:


User:
sevana_user

Database:
sevana_db

Password:
sevana_pass


Resolution:
- Created required PostgreSQL role.
- Created required database.
- Updated local password configuration.
- Verified backend database connection.


Status:
Resolved.


---

## Frontend-Backend API Conflict

Issue:

Frontend authentication requests:


/api/auth/*


Backend authentication routes:


/api/v1/auth/*



Impact:
- Frontend authentication requests do not match backend route registration.


Status:
Identified.
Waiting for team confirmation before modification.


---

## Authentication Payload Conflict

Issue:

Backend validation requires:


full_name


Frontend registration payload currently does not provide the required field.


Impact:
- Registration request fails validation.


Status:
Identified.
Needs frontend/backend contract confirmation.


---

## Code Ownership Rule

Followed:
- No backend source code modified.
- No database migration files modified.
- Frontend changes limited to setup/testing only.

# 27 July 2026

## Authentication Related Conflicts and Resolutions

### Conflict: Backend and Frontend Field Name Mismatch

Problem:
- Backend validation expected `full_name`.
- Frontend registration form was sending a different field name.

Resolution:
- Updated RegisterScreen payload mapping.

---

### Conflict: JWT Token Response Structure Mismatch

Problem:
- Frontend token handling depended on response structure.
- Backend returns authentication data inside the response data object.

Resolution:
- Reviewed AuthContext handling to match backend response format.

---

### Conflict: JWT Secret Configuration Issue

Problem:
- Backend returned:

  "secretOrPrivateKey must have a value"

Cause:
- JWT access and refresh secrets were missing from environment variables.

Resolution:
- Identified missing JWT environment configuration.
- Backend team was informed to update JWT secret variables.

---

### Conflict: Duplicate Email Registration

Problem:
- Registration returned:

  "Email already registered"

Cause:
- User email already existed in database.

Resolution:
- Confirmed backend validation was working correctly.
- Tested with a new email account.