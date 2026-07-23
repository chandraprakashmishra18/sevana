# Sevana Product Requirements Document (PRD)

Version: 1.0

Status: Approved

Owner: Prashant Mishra

Product Name

Sevana

Tagline

Connecting Communities to Save Animal Lives

---

# 1. Product Vision

Sevana is a community-driven animal rescue platform that enables
citizens, volunteers, veterinarians, NGOs, and administrators to
collaborate in rescuing injured, abandoned, or distressed animals.

The platform aims to reduce rescue response time by connecting nearby
helpers through location-aware technology.

---

# 2. Problem Statement

Many injured animals remain untreated because:

- People do not know whom to contact.
- Rescue organizations have limited visibility.
- Nearby volunteers are unaware of incidents.
- Rescue progress is not transparent.
- Communities lack a centralized rescue platform.

Sevana addresses these problems through coordinated rescue management.

---

# 3. Goals

Primary Goals

- Enable fast reporting of animal emergencies.
- Connect nearby volunteers.
- Connect nearby veterinarians.
- Track rescue progress.
- Build a trusted rescue community.

Secondary Goals

- Encourage volunteering.
- Maintain rescue history.
- Reward meaningful contributions.
- Increase transparency.

---

# 4. Target Users

### Citizen

Reports injured animals.

### Volunteer

Responds to rescue requests.

### Veterinarian

Provides medical assistance.

### NGO

Coordinates rescue operations.

### Administrator

Moderates platform activities.

---

# 5. User Personas

## Citizen

Needs:

- Report quickly
- Upload photos
- Track rescue status

Pain Points:

- Doesn't know rescue contacts
- No visibility after reporting

---

## Volunteer

Needs:

- Nearby rescue alerts
- Navigation
- Timeline updates

Pain Points:

- Doesn't know where help is needed

---

## Veterinarian

Needs:

- Emergency notifications
- Rescue details
- Animal condition

---

## NGO

Needs:

- Rescue coordination
- Volunteer management
- Rescue statistics

---

## Administrator

Needs:

- Platform moderation
- Abuse prevention
- Volunteer verification

---

# 6. MVP Features

Authentication

User Profiles

Animal Reports

Nearby Feed

Volunteer Participation

Status Timeline

Notifications

Vet Finder

Lost & Found

Leaderboards

XP System

Trust Score

Volunteer Profiles

Rescue Stories

---

# 7. Out of Scope (MVP)

The following features are intentionally excluded from Version 1.0:

- AI image classification
- Live chat
- Video calls
- Donation gateway
- Animal adoption marketplace
- Offline synchronization
- IoT integrations
- Predictive analytics

These may be considered for future releases.

---

# 8. Functional Requirements

The platform shall allow users to:

- Register and log in.
- Create rescue reports.
- Upload animal images.
- Share current location.
- Join rescue missions.
- Update rescue progress.
- Confirm rescue completion.
- View nearby reports.
- Receive notifications.
- Earn XP.
- View leaderboards.

---

# 9. Non-Functional Requirements

Performance

- Nearby reports < 200 ms
- Notification delivery < 3 seconds
- API response < 500 ms

Security

- JWT authentication
- RBAC authorization
- Input validation
- HTTPS
- Audit logging

Scalability

- Support thousands of concurrent users
- Horizontal backend scaling
- Queue-based notification architecture

Reliability

- Daily backups
- Health checks
- Graceful error handling

---

# 10. User Journey

Citizen

↓

Create Report

↓

Nearby Volunteers Notified

↓

Volunteer Joins

↓

Rescue Timeline Updates

↓

Reporter Confirms

↓

Report Closed

↓

XP Awarded

↓

Story Archived

---

# 11. Success Metrics

- Number of completed rescues
- Average rescue response time
- Volunteer participation rate
- User retention
- Fake report rate
- Notification delivery success
- Monthly active users

---

# 12. Risks

- Fake reports
- Low volunteer density
- Notification delays
- Poor GPS accuracy
- Spam
- Abuse of XP system

Mitigation strategies are defined in `security.md` and `xp-system.md`.

---

# 13. Assumptions

- Users have internet connectivity.
- GPS permissions are granted.
- Volunteers are verified before activation.
- Cloudinary is available for image storage.
- PostgreSQL is the primary database.

---

# 14. Acceptance Criteria

A rescue workflow is considered complete when:

- A report is created successfully.
- Nearby responders are notified.
- A volunteer joins.
- Timeline updates are recorded.
- Reporter confirms completion.
- Report status becomes CLOSED.
- XP is awarded.
- Notifications are sent.
- Audit logs are created.

---

# 15. Release Roadmap

Version 1.0

- Core rescue platform
- Volunteer system
- Notifications
- XP
- Stories

Version 1.1

- Improved moderation
- Advanced search
- Better analytics

Version 1.2

- Push notifications
- Real-time updates
- Admin dashboard

Version 2.0

- AI-assisted duplicate detection
- Donation integration
- Adoption marketplace
- NGO analytics
- Multi-language support

---

# 16. Product Principles

- Animal welfare comes first.
- Community collaboration over competition.
- Trust is earned through meaningful contributions.
- Simplicity improves adoption.
- Security and privacy are built into every feature.

---

# End of Document