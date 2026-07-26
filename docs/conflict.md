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