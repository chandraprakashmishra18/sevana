# Sevana REST API Specification

Version: 1.0

Status: Approved

---

# 1. Overview

This document defines every REST API used by Sevana.

All APIs follow REST principles.

## Base URL

```
/api
```

## Response Format

### Success

```json
{
  "success": true,
  "message": "Report created successfully",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Unauthorized",
  "errors": []
}
```

---

# 2. Authentication

Authentication uses JWT.

Every protected request must include

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 3. User Roles

Roles

```
guest

user

volunteer

vet

ngo

admin
```

---

# 4. Authentication APIs

## Register

POST

```
/api/auth/register
```

Body

```json
{
  "name": "",
  "phone": "",
  "email": "",
  "password": ""
}
```

Response

```json
{
  "success": true,
  "message": "Account created"
}
```

---

## Login

POST

```
/api/auth/login
```

Body

```json
{
  "email": "",
  "password": ""
}
```

Returns

- JWT Token
- User Information

---

## Get Current User

GET

```
/api/auth/me
```

Authorization Required

Returns

Current user profile.

---

## Update Profile

PATCH

```
/api/users/profile
```

Updates

- name
- photo
- address
- availability

---

# 5. Animal Reports

## Create Report

POST

```
/api/reports
```

Permissions

Authenticated Users

Body

```json
{
  "category": "",
  "severity": "",
  "description": "",
  "photos": [],
  "latitude": "",
  "longitude": ""
}
```

Actions

- Save report
- Generate notifications
- Award XP
- Create timeline entry

---

## Nearby Reports

GET

```
/api/reports/nearby
```

Query

```
lat

lng

radius

page

limit
```

Returns

Nearby reports sorted by distance.

---

## Report Details

GET

```
/api/reports/:reportId
```

Returns

- report
- participants
- timeline
- status
- reporter

---

## Update Report

PATCH

```
/api/reports/:reportId
```

Permissions

Reporter

Admin

---

## Delete Report

DELETE

```
/api/reports/:reportId
```

Admin only.

Soft delete preferred.

---

# 6. Rescue Participants

## Join Rescue

POST

```
/api/reports/:reportId/join
```

Body

```json
{
  "responseType":"IM_GOING"
}
```

OR

```json
{
  "responseType":"I_CAN_HELP"
}
```

Creates

Participant

Timeline Event

Notification

---

## Leave Rescue

DELETE

```
/api/reports/:reportId/join
```

---

## Participants List

GET

```
/api/reports/:reportId/participants
```

Returns

All rescue participants.

---

# 7. Timeline

## Add Timeline Update

POST

```
/api/reports/:reportId/timeline
```

Body

```json
{
"text":"",
"photos":[]
}
```

Permissions

Participants only.

---

## Get Timeline

GET

```
/api/reports/:reportId/timeline
```

Returns

Chronological rescue updates.

---

# 8. Report Status

## Update Status

PATCH

```
/api/reports/:reportId/status
```

Allowed

Participants

Reporter

Admin

Body

```json
{
"status":"FIRST_AID_GIVEN"
}
```

Validation

Must follow lifecycle.

Cannot skip statuses.

---

## Status History

GET

```
/api/reports/:reportId/status-history
```

Returns

Complete status history.

---

# 9. Rescue Confirmation

## Request Confirmation

POST

```
/api/reports/:reportId/request-confirmation
```

Participant requests reporter confirmation.

---

## Confirm Rescue

POST

```
/api/reports/:reportId/confirm
```

Permissions

Reporter

Updates

Status

XP

Timeline

Notifications

---

## Close Report

POST

```
/api/reports/:reportId/close
```

Permissions

Reporter

Admin

Actions

Archive report

Lock timeline

Generate story option

---

# 10. Notifications

## Get Notifications

GET

```
/api/notifications
```

Returns

Unread first.

---

## Mark Read

PATCH

```
/api/notifications/:id/read
```

---

## Mark All Read

PATCH

```
/api/notifications/read-all
```

---

## Delete Notification

DELETE

```
/api/notifications/:id
```

Soft delete.

---

# 11. Volunteer Module

## Apply

POST

```
/api/volunteers/apply
```

Body

Volunteer application.

---

## My Application

GET

```
/api/volunteers/application
```

---

## Volunteer Profile

GET

```
/api/volunteers/:id
```

Returns

Volunteer information.

---

## Nearby Volunteers

GET

```
/api/volunteers/nearby
```

Query

Location

Radius

---

## Approve Volunteer

PATCH

```
/api/admin/volunteers/:id/approve
```

Admin only.

---

## Reject Volunteer

PATCH

```
/api/admin/volunteers/:id/reject
```

Admin only.

---

# 12. Vet Module

## Nearby Vets

GET

```
/api/vets
```

Nearby search.

---

## Vet Details

GET

```
/api/vets/:id
```

---

# 13. Lost & Found

## Create

POST

```
/api/lost-found
```

---

## Nearby

GET

```
/api/lost-found
```

---

## Resolve

PATCH

```
/api/lost-found/:id/resolve
```

---

# 14. Rescue Stories

## Publish Story

POST

```
/api/stories
```

Completed rescues only.

---

## Feed

GET

```
/api/stories
```

---

## Story Details

GET

```
/api/stories/:storyId
```

---

# 15. XP

## XP History

GET

```
/api/users/xp
```

Returns

XP transactions.

---

## Leaderboard

GET

```
/api/leaderboard
```

Filters

- Weekly
- Monthly
- All Time

---

# 16. Search

## Search Reports

GET

```
/api/search/reports
```

---

## Search Volunteers

GET

```
/api/search/volunteers
```

---

## Search Stories

GET

```
/api/search/stories
```

---

# 17. Pagination

Every listing endpoint supports

```
page

limit
```

Response

```json
{
"page":1,
"limit":20,
"total":120,
"hasNext":true,
"data":[]
}
```

---

# 18. HTTP Status Codes

200

Success

201

Created

400

Validation Error

401

Unauthorized

403

Forbidden

404

Not Found

409

Conflict

422

Business Rule Failed

429

Too Many Requests

500

Server Error

---

# 19. Validation Rules

Backend validates

- Required fields
- UUID format
- JWT
- Permissions
- Ownership
- Report lifecycle
- Duplicate joins
- Duplicate confirmation

Frontend validation alone is never sufficient.

---

# 20. Authorization Matrix

| Action | User | Volunteer | Vet | NGO | Admin |
|---------|------|------------|-----|------|--------|
| Create Report | ✅ | ✅ | ✅ | ✅ | ✅ |
| Join Rescue | ✅ | ✅ | ✅ | ✅ | ✅ |
| Update Timeline | ✅ (Participant) | ✅ | ✅ | ✅ | ✅ |
| Update Status | ✅ (Participant) | ✅ | ✅ | ✅ | ✅ |
| Confirm Rescue | Reporter Only | Reporter Only | Reporter Only | Reporter Only | ✅ |
| Close Report | Reporter Only | Reporter Only | Reporter Only | Reporter Only | ✅ |
| Approve Volunteer | ❌ | ❌ | ❌ | ❌ | ✅ |

---

# 21. API Principles

Every endpoint must:

- Validate input
- Verify authentication
- Verify authorization
- Log important actions
- Return consistent responses
- Use database transactions for critical operations
- Never expose sensitive information

---

# End of Document