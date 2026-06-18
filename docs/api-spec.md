# Sevana API Specification (v1)

Base URL: `/api/v1`

Authentication: JWT Bearer Token

---

# Data Models

## User

```ts
{
  id: string
  phone: string
  name: string
  role: "citizen" | "volunteer" | "ngo" | "admin"
  avatar_url?: string
  ward_id?: string
  city?: string
  state?: string
  xp_total: number
  streak: number
  created_at: string
}
```

## Report

```ts
{
  id: string
  user_id: string
  module: "animal" | "cleanliness" | "health" | "education" | "emergency"
  photo_url: string
  lat: number
  lng: number
  description: string
  status: "open" | "in_progress" | "resolved" | "rejected"
  raised_hands: number
  created_at: string
}
```

## Campaign

```ts
{
  id: string
  title: string
  story: string
  goal_amount: number
  raised_amount: number
  beneficiary_id: string
  status: "active" | "completed" | "paused"
}
```

---

# AUTH

## POST /auth/otp-request

Request

```json
{
  "phone": "+919876543210"
}
```

Response

```json
{
  "message": "OTP sent"
}
```

Auth: No

---

## POST /auth/verify

Request

```json
{
  "phone": "+919876543210",
  "otp": "123456"
}
```

Response

```json
{
  "token": "jwt_token",
  "user": {}
}
```

Auth: No

---

# REPORTS

## POST /reports

Request

```json
{
  "photo_url": "https://...",
  "lat": 28.6139,
  "lng": 77.2090,
  "module": "animal",
  "description": "Injured dog near market"
}
```

Response

```json
{
  "report": {}
}
```

Auth: Yes

---

## GET /reports/nearby

Query

```http
/reports/nearby?lat=28.61&lng=77.20&radius=2000
```

Response

```json
{
  "reports": []
}
```

Auth: Yes

---

## GET /reports/:id

Response

```json
{
  "report": {}
}
```

Auth: Yes

---

## POST /reports/:id/raise-hand

Response

```json
{
  "notified_count": 42
}
```

Auth: Yes

---

## PATCH /reports/:id/status

Request

```json
{
  "status": "resolved"
}
```

Response

```json
{
  "success": true
}
```

Auth: Volunteer/Admin

---

# DONATIONS

## GET /campaigns

Response

```json
{
  "campaigns": []
}
```

Auth: Yes

---

## GET /campaigns/:id

Response

```json
{
  "campaign": {}
}
```

Auth: Yes

---

## POST /donations/create-order

Request

```json
{
  "campaign_id": "cmp_123",
  "amount": 500
}
```

Response

```json
{
  "order_id": "rzp_order",
  "amount": 500
}
```

Auth: Yes

---

## POST /payments/verify

Request

```json
{
  "razorpay_order_id": "",
  "razorpay_payment_id": "",
  "razorpay_signature": ""
}
```

Response

```json
{
  "success": true,
  "donation": {}
}
```

Auth: Yes

---

# GAMIFICATION

## GET /leaderboard/:scope

Scopes

```txt
ward
city
state
country
```

Response

```json
{
  "leaders": [],
  "my_rank": 28
}
```

Auth: Yes

---

# SERVICES

## GET /services/nearby

Query

```http
/services/nearby?lat=28.61&lng=77.20&type=vet
```

Response

```json
{
  "services": []
}
```

Auth: Yes

---

# USER PROFILE

## GET /me

Response

```json
{
  "user": {}
}
```

Auth: Yes

---

## GET /me/xp-history

Response

```json
{
  "entries": []
}
```

Auth: Yes

---

# Standard Error Response

```json
{
  "success": false,
  "message": "Something went wrong",
  "error_code": "VALIDATION_ERROR"
}
```
