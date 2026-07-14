# Sevana Database Schema (PostgreSQL + PostGIS)

## users

```sql
id UUID PRIMARY KEY
phone VARCHAR(15) UNIQUE NOT NULL
name VARCHAR(100)
role VARCHAR(20)
avatar_url TEXT
fcm_token TEXT
ward_id UUID
city VARCHAR(100)
state VARCHAR(100)
lat DECIMAL(10,7)
lng DECIMAL(10,7)
xp_total INTEGER DEFAULT 0
streak INTEGER DEFAULT 0
created_at TIMESTAMP
updated_at TIMESTAMP
```

---

## reports

```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES users(id)
module VARCHAR(30)
photo_url TEXT
location GEOGRAPHY(POINT,4326)
description TEXT
status VARCHAR(20)
raised_hands INTEGER DEFAULT 0
created_at TIMESTAMP
updated_at TIMESTAMP
```

Indexes

```sql
CREATE INDEX idx_reports_location
ON reports USING GIST(location);
```

---

## report_helpers

Tracks volunteers who clicked Raise Hand.

```sql
id UUID PRIMARY KEY
report_id UUID REFERENCES reports(id)
user_id UUID REFERENCES users(id)
created_at TIMESTAMP
```

---

## campaigns

```sql
id UUID PRIMARY KEY
title VARCHAR(200)
story TEXT
goal_amount NUMERIC(12,2)
raised_amount NUMERIC(12,2)
beneficiary_id UUID
status VARCHAR(20)
created_at TIMESTAMP
```

---

## donations

```sql
id UUID PRIMARY KEY
donor_id UUID REFERENCES users(id)
campaign_id UUID REFERENCES campaigns(id)
amount NUMERIC(12,2)
rzp_order_id TEXT
rzp_payment_id TEXT
receipt_url TEXT
payment_status VARCHAR(20)
created_at TIMESTAMP
```

---

## donation_events

```sql
id UUID PRIMARY KEY
donation_id UUID REFERENCES donations(id)
event_type VARCHAR(50)
actor_id UUID REFERENCES users(id)
photo_url TEXT
notes TEXT
created_at TIMESTAMP
```

---

## xp_ledger

```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES users(id)
event_type VARCHAR(50)
xp_awarded INTEGER
capped BOOLEAN DEFAULT false
created_at TIMESTAMP
```

Example events:

* REPORT_CREATED
* REPORT_RESOLVED
* DONATION_MADE
* VOLUNTEER_HELPED
* DAILY_STREAK

---

## badges

```sql
id UUID PRIMARY KEY
name VARCHAR(100)
condition_json JSONB
icon_url TEXT
xp_bonus INTEGER
```

Example badge:

```json
{
  "reports_created": 10
}
```

---

## user_badges

```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES users(id)
badge_id UUID REFERENCES badges(id)
earned_at TIMESTAMP
```

---

## services

```sql
id UUID PRIMARY KEY
name VARCHAR(200)
type VARCHAR(50)
lat DECIMAL(10,7)
lng DECIMAL(10,7)
phone VARCHAR(20)
city VARCHAR(100)
verified BOOLEAN DEFAULT false
created_at TIMESTAMP
```
