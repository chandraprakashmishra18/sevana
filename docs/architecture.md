# Sevana Architecture Document
Version: 1.0
Status: Draft (Frozen for MVP)

---

# 1. Vision

Sevana is a community-driven animal rescue platform that connects people, volunteers, veterinarians, NGOs, and administrators to rescue animals quickly, transparently, and efficiently.

The platform enables users to report animal emergencies, coordinate rescue operations, notify nearby responders, track rescue progress, and build a trustworthy rescue community.

---

# 2. Core Principles

Every feature developed for Sevana must satisfy the following principles:

## Security

Critical actions must always be authorized by the backend.

The frontend must never decide permissions.

---

## Transparency

Every important rescue action should be traceable.

Users should be able to understand:

- who joined
- who updated the rescue
- when something happened
- who confirmed it
- who closed the report

---

## Community Driven

Rescues are collaborative.

Multiple users can participate in one rescue.

---

## Trust First

Trust is earned.

Users become Volunteers only after approval by Sevana.

---

## Data Integrity

Important rescue information should never be permanently deleted.

Historical rescue data should remain available for auditing and analytics.

---

# 3. User Roles

## Guest

Can:

- Browse public information

Cannot:

- Report
- Join rescues
- Comment
- Receive alerts

---

## User

Can:

- Report animal incidents
- Join rescue operations
- Help rescue operations
- Upload rescue updates
- Participate in rescue timelines
- Earn XP
- Apply to become Volunteer

---

## Volunteer

A Volunteer is always verified by Sevana.

There is no separate "Verified Volunteer" role.

Volunteers receive:

- Volunteer Badge
- Volunteer Profile
- High-priority emergency alerts
- Rescue statistics
- Community recognition

---

## Vet

Verified veterinary professionals.

Can:

- Receive nearby emergency notifications
- Provide treatment updates
- Participate in rescue timelines

---

## NGO

Verified animal welfare organizations.

Can:

- Participate in rescues
- Coordinate rescue teams
- Receive emergency notifications

---

## Admin

Platform administrators.

Can:

- Manage users
- Approve volunteers
- Close reports
- Moderate content
- Review abuse reports

---

# 4. Volunteer System

Users can apply to become Volunteers.

Volunteer approval is handled by Sevana administrators.

Volunteer Profile includes:

- Volunteer ID
- Profile Photo
- Area of Operation
- Skills
- Joined Date
- Total Rescues
- Success Rate
- Trust Score
- Community Rating
- Availability Status

---

# 5. Rescue Workflow

Report Created

↓

Nearby Notifications

↓

Users Join Rescue

↓

Rescue Timeline Starts

↓

Participants Update Progress

↓

Rescuer Requests Confirmation

↓

Reporter Confirms Rescue

↓

Reporter/Admin Closes Report

↓

XP Awarded

↓

Rescue Story Published

↓

Report Archived

---

# 6. Report Severity

## Critical (Red)

Examples

- Road Accident
- Heavy Bleeding
- Fire
- Electrocution
- Trapped Animal
- Poisoning

Notification:

- Nearby Users
- Volunteers
- Vets
- NGOs
- Admins

---

## High (Orange)

Examples

- Deep Wounds
- Fracture
- Severe Illness

Notification:

- Users
- Volunteers
- Vets

---

## Medium (Yellow)

Examples

- Minor Injury
- Dehydration

Notification:

- Nearby Users
- Volunteers

---

## Low (Green)

Examples

- Hungry Animal
- General Observation
- Adoption Request

Notification:

Added to nearby feed only.

---

# 7. Report Categories

Examples:

- Injured Animal
- Accident
- Animal Abuse
- Sick Animal
- Trapped Animal
- Lost Pet
- Dead Animal
- Wildlife Emergency
- Other

---

# 8. Rescue Participation

Users can respond using one of two options.

## I'm Going

The user is physically participating in the rescue.

---

## I Can Help

The user provides indirect support.

Examples:

- Arrange transport
- Donate
- Contact veterinarian
- Arrange food
- Coordinate rescue

---

# 9. Rescue Timeline

Every rescue maintains a complete timeline.

Examples:

- Report Created
- Volunteer Joined
- User Joined
- Animal Located
- First Aid Given
- Transport Started
- Reached Clinic
- Treatment Started
- Treatment Completed
- Reporter Confirmed
- Report Closed

Timeline entries may contain:

- Text
- Images
- Videos

---

# 10. Report Status Lifecycle

REPORTED

↓

RESPONDERS_JOINING

↓

RESPONDER_ON_SITE

↓

FIRST_AID_GIVEN

↓

TRANSPORT_IN_PROGRESS

↓

AT_VETERINARY_CLINIC

↓

UNDER_TREATMENT

↓

RECOVERING

↓

RESCUED

↓

CLOSED

---

# 11. Rescue Confirmation

A rescue participant requests confirmation.

Reporter receives:

Has the rescue been completed?

Options:

- Confirm
- Not Yet

After confirmation:

Status becomes:

RESCUED

---

# 12. Closing Reports

Reports may only be closed by:

- Reporter
- Admin

Closing a report:

- Archives the report
- Awards XP
- Updates achievements
- Locks timeline
- Enables Rescue Story

---

# 13. Rescue Stories

Completed rescues can be published as stories.

Stories include:

- Description
- Photos
- Videos
- Before/After
- Rescue Team
- Lessons Learned

Stories are separate from operational reports.

---

# 14. Notification System

Severity determines notification priority.

Critical reports generate immediate nearby alerts.

Low severity reports only appear in nearby feeds.

Notifications are stored in the database.

Users can mark notifications as read.

---

# 15. XP System

XP rewards positive community participation.

Examples:

- Report Submitted
- Rescue Joined
- Rescue Confirmed
- Story Published
- Community Contribution

XP is maintained through XP Transactions.

---

# 16. Trust System

Trust is different from XP.

Trust increases for:

- Confirmed rescues
- Accurate reports
- Positive ratings
- Reliable participation

Trust decreases for:

- Fake reports
- Spam
- False updates
- Rescue abandonment
- Abuse of emergency alerts

Trust determines volunteer eligibility.

---

# 17. Security Principles

Authentication determines WHO the user is.

Authorization determines WHAT the user can do.

The backend always enforces permissions.

Frontend permissions are never trusted.

Every critical action must be validated.

---

# 18. Database Philosophy

The database is the source of truth.

Every important rescue action must be recorded.

Historical data should never be lost.

Relationships should be normalized.

Design for scalability.

---

# 19. Development Workflow

Every feature must pass:

- Business Logic Review
- Security Review
- Performance Review
- UX Review
- Testing

Only after all checks pass can the feature be considered complete.

---

# 20. Future Roadmap

Planned future features include:

- AI severity detection
- Duplicate report detection
- Live tracking
- Real-time updates
- Push notifications
- Chat
- NGO Dashboard
- Admin Dashboard
- Analytics
- Multi-language support