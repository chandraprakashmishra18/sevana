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

# 28 July 2026

## Frontend Authentication UI Refinement

### RegisterScreen Improvements

Completed:
- Improved registration form validation behavior.
- Added real-time password validation feedback.
- Added password strength visual indication:
  - Green when password meets requirements.
  - Red when password requirements are not satisfied.
- Improved password input border feedback based on validation state.
- Verified register button remains disabled until:
  - Name is provided.
  - Phone number is provided.
  - Password satisfies security requirements.

Testing:
- Verified register screen loads correctly.
- Verified password validation works during user input.
- Verified registration flow remains connected with AuthContext.


---

## LoginScreen Improvements

Completed:
- Improved login form validation.
- Added password visibility toggle handling.
- Added password guidance text.
- Improved error handling:
  - Clears previous errors when user edits input fields.
- Improved button state handling:
  - Disabled during loading.
  - Disabled when required fields are missing.
  - Disabled when password requirements are not met.
- Improved accessibility:
  - Converted authentication navigation control into proper button handling.


---

## Authentication Flow Verification

Completed:
- Verified AuthScreen switching logic between:
  - LoginScreen
  - RegisterScreen
- Verified registration and login navigation after UI changes.
- Verified frontend authentication flow remains connected with AuthContext.


---

## HomeScreen Authentication Integration Review

Completed:
- Reviewed HomeScreen integration with authenticated user flow.
- Verified:
  - API imports.
  - Report loading logic.
  - User statistics fetching.
  - Location-based report fetching.
- Confirmed no authentication-related breaking changes were introduced.


---

## Code Quality Improvements

Completed:
- Improved frontend form state handling.
- Improved loading state protection.
- Improved user feedback during authentication actions.
- Maintained existing backend API contract.
- No backend files modified.

---

## Current Status

Completed:
- Authentication screens UI improvements.
- Login/Register validation improvements.
- Authentication navigation verification.
- HomeScreen integration review.

Remaining:
- Continue frontend feature integration.
- Verify complete authenticated user experience with backend.