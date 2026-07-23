# Sevana Notification System

Version: 1.0

Status: Approved

Owner: Sevana Engineering Team

---

# 1. Purpose

The Notification System is responsible for informing users about
important rescue-related events in real time.

The goal is to ensure that the right people receive the right
information at the right time.

The notification system should be:

- Fast
- Reliable
- Scalable
- Non-spammy
- Priority Based

---

# 2. Notification Principles

Notifications should:

- Reach nearby responders quickly
- Avoid unnecessary spam
- Be prioritized by severity
- Be stored for future reference
- Support future push notifications

Notifications are generated only by the backend.

Clients cannot create notifications directly.

---

# 3. Notification Types

The platform supports multiple notification types.

## Emergency Alert

Triggered when a new rescue report is created.

Example

"Injured dog reported 1.2 km away."

---

## Rescue Update

Triggered when rescue progress changes.

Examples

Volunteer Joined

Animal Transported

Reached Clinic

Treatment Started

---

## Confirmation Request

Triggered when a participant requests reporter confirmation.

---

## Rescue Completed

Triggered after rescue confirmation.

---

## Volunteer Notifications

Examples

Application Approved

Application Rejected

Profile Updated

---

## System Notifications

Examples

Maintenance

New Features

Community Announcements

---

# 4. Notification Priority

Every notification has a priority.

## Critical

Examples

- Road accident
- Heavy bleeding
- Animal trapped
- Electrocution
- Fire

Delivery

Immediate

Color

Red

Sound

High Priority

---

## High

Examples

- Deep injury
- Fracture
- Severe illness

Color

Orange

Immediate delivery.

---

## Medium

Examples

- Minor injuries
- Sick animals

Color

Yellow

---

## Low

Examples

- Food request
- Adoption
- General observation

Color

Green

Displayed in feed.

No emergency alert.

---

# 5. Notification Recipients

Recipients depend on severity.

## Critical

Notify

- Nearby Users
- Volunteers
- Nearby Vets
- Nearby NGOs
- Admin

---

## High

Notify

- Nearby Users
- Volunteers
- Nearby Vets

---

## Medium

Notify

- Nearby Users
- Volunteers

---

## Low

No emergency push.

Visible in nearby feed.

---

# 6. Nearby User Selection

Notifications are location-aware.

Algorithm

Report Location

↓

Find nearby responders

↓

Sort by distance

↓

Send notifications

Search radius depends on severity.

---

# 7. Notification Radius

Default values

Critical

10 km

High

7 km

Medium

5 km

Low

Feed Only

Future versions may dynamically adjust the radius.

---

# 8. Notification Lifecycle

Created

↓

Delivered

↓

Seen

↓

Read

↓

Archived

Notifications are never permanently deleted immediately.

---

# 9. Read Status

Each notification maintains

- is_read
- read_at

Unread notifications appear first.

---

# 10. Notification Database

Every notification stores

- Notification ID
- User ID
- Report ID
- Type
- Priority
- Title
- Message
- Created Time
- Read Status

---

# 11. Duplicate Prevention

Users should not receive duplicate notifications.

Example

Volunteer joins rescue.

Do not notify repeatedly for identical actions.

Duplicate suppression should be handled by backend logic.

---

# 12. Notification Triggers

Examples

Report Created

↓

Emergency Alert

Volunteer Joined

↓

Reporter Notification

Status Updated

↓

Participants Notification

Reporter Confirmed

↓

Participants Notification

Report Closed

↓

Participants Notification

Volunteer Approved

↓

Volunteer Notification

---

# 13. Notification Templates

Emergency

🚨 Injured Dog Reported Nearby

Volunteer

👤 A volunteer has joined the rescue.

Treatment

🏥 Animal has reached the veterinary clinic.

Confirmation

✅ Please confirm whether the rescue has been completed.

Completion

🎉 Rescue successfully completed.

---

# 14. Notification Categories

Emergency

Volunteer

System

Rescue

Medical

Community

Achievement

Reminder

---

# 15. User Preferences

Users can choose whether to receive

- Emergency Alerts
- Community Updates
- Achievement Notifications
- Volunteer Requests
- Stories
- Announcements

Emergency alerts cannot be completely disabled for Volunteers.

---

# 16. Notification Ordering

Notifications appear in this order

Unread

↓

Priority

↓

Newest First

---

# 17. Expiry Policy

Emergency notifications

Expire after rescue closes.

System notifications

Remain until dismissed.

Community notifications

Expire after 30 days.

---

# 18. Retry Strategy

If notification delivery fails

Retry

↓

Retry Again

↓

Store Failure

↓

Retry Later

Future versions may use background workers.

---

# 19. Push Notifications

Future support

Firebase Cloud Messaging (FCM)

Apple Push Notification Service (APNS)

OneSignal

Web Push API

---

# 20. In-App Notifications

Users can always access

Notification Center

Features

Unread Count

Mark Read

Mark All Read

Filter by Category

Search

---

# 21. Notification Security

Only backend services create notifications.

Users cannot

- Fake notifications
- Delete others' notifications
- Modify priority

Authorization required.

---

# 22. Performance Goals

Emergency Notification

< 3 seconds

Notification Feed

< 150 ms

Unread Count

< 50 ms

Nearby Search

< 200 ms

---

# 23. Scalability

Future architecture

Report Created

↓

Notification Service

↓

Queue

↓

Worker

↓

Push Provider

↓

Device

Supports

Millions of notifications.

---

# 24. Future Enhancements

- Silent notifications
- Scheduled notifications
- Notification grouping
- Rich media notifications
- Live rescue alerts
- SOS mode
- Smart notification routing
- AI priority prediction

---

# 25. Notification Principles

1. Notify only relevant users.

2. Prioritize emergencies.

3. Never spam users.

4. Store notification history.

5. Support future push services.

6. Notifications must always be generated by backend logic.

7. Deliver important alerts as quickly as possible.

---

# End of Document