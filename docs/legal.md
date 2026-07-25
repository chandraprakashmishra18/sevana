# Legal & Compliance

**Project:** Sevana - Animal Rescue Platform  
**Version:** 1.0  
**Last Updated:** July 2026

---

# Purpose

This document outlines the legal, privacy, and compliance requirements for the Sevana platform.

The objectives are to:

- Protect user privacy
- Ensure responsible handling of personal data
- Comply with applicable laws and regulations
- Define user rights and responsibilities
- Reduce legal and security risks

This document should be reviewed whenever new features involve collecting, storing, or processing user data.

---

# Table of Contents

1. Legal Overview
2. User Agreement
3. Privacy Policy
4. Data Collection
5. Data Usage
6. User Rights
7. Data Security
8. Location Data
9. Image Uploads
10. Donations
11. Third-Party Services
12. Intellectual Property
13. Platform Responsibilities
14. User Responsibilities
15. Compliance
16. Disclaimer
17. Future Legal Requirements

---

# 1. Legal Overview

Sevana is a community-driven animal rescue platform.

The platform provides:

- Animal reporting
- Rescue coordination
- Volunteer participation
- NGO discovery
- Veterinary directory
- Donations
- Community engagement

Sevana acts as a technology platform and does not guarantee rescue outcomes or veterinary services.

---

# 2. User Agreement

By using Sevana, users agree to:

- Provide accurate information.
- Use the platform responsibly.
- Respect other users.
- Avoid misuse or fraudulent activity.
- Follow applicable laws.

Violation of these terms may result in account suspension or removal.

---

# 3. Privacy Policy

Sevana respects user privacy.

Personal information is collected only for providing platform functionality.

Collected data is handled responsibly and protected using appropriate security measures.

Privacy considerations should be incorporated into every new feature.

---

# 4. Data Collection

The platform may collect:

Account Information

- Name
- Email address
- Phone number (optional)

Profile Information

- Profile image
- Volunteer role
- Organization (if applicable)

Location Information

- Current location (only with user permission)
- Report location

Animal Report Data

- Description
- Images
- Category
- Status

System Information

- Device information
- Browser information
- IP address (for security and diagnostics)

Only information necessary for platform functionality should be collected.

---

# 5. Data Usage

Collected information may be used to:

- Authenticate users
- Display nearby reports
- Connect volunteers
- Locate veterinarians
- Locate NGOs
- Improve platform performance
- Generate analytics
- Detect misuse or abuse

User data must never be sold to third parties.

---

# 6. User Rights

Users have the right to:

- View their profile information
- Update profile information
- Delete their account (subject to future implementation)
- Request deletion of personal data where applicable
- Withdraw optional permissions (such as location access)

---

# 7. Data Retention

Data should only be retained as long as necessary for platform operation, legal obligations, or legitimate project requirements.

If account deletion is implemented, associated personal information should be removed or anonymized where appropriate.

---

# 8. Data Security

Security measures include:

- Password hashing using bcrypt
- JWT-based authentication
- Parameterized SQL queries
- Input validation
- HTTPS (production)
- Environment variables for secrets
- Role-based access control

Security practices are documented separately in `security-guidelines.md`.

---

# 9. Location Data

Location is required for:

- Nearby animal reports
- Nearby veterinarians
- Nearby NGOs

Location access should:

- Be requested only when required
- Be optional where possible
- Be explained clearly to users

Users should be informed why location is being requested.

---

# 10. Image Uploads

Users may upload images related to rescue reports.

Images should:

- Relate to the reported animal or rescue
- Avoid unnecessary personal information
- Comply with platform rules

The platform reserves the right to remove inappropriate content.

---

# 11. Donations

If donation functionality is implemented:

- Payment processing should use trusted third-party providers.
- Financial information should never be stored directly by Sevana.
- Donation history may be stored for user reference.

---

# 12. Third-Party Services

The platform may integrate with:

- Cloudinary (image storage)
- Google Maps or other mapping providers
- Redis
- PostgreSQL
- Docker

Each service has its own privacy and usage policies.

---

# 13. Intellectual Property

Unless otherwise stated:

- Source code belongs to the Sevana project.
- Documentation belongs to the Sevana project.
- Logos, branding, and design assets are project property.

Open-source libraries remain subject to their respective licenses.

---

# 14. Platform Responsibilities

Sevana aims to:

- Protect user data
- Maintain service availability
- Improve platform reliability
- Respond to reported issues
- Remove inappropriate content when identified

---

# 15. User Responsibilities

Users must not:

- Upload malicious files
- Submit false rescue reports
- Harass or impersonate other users
- Attempt unauthorized access
- Misuse platform features

Users are responsible for the content they submit.

---

# 16. Compliance

The platform is designed with privacy and security in mind.

For deployments in India, Sevana should consider applicable legal requirements, including the Digital Personal Data Protection (DPDP) Act, 2023.

Key principles include:

- Obtain consent before collecting personal data where required.
- Collect only the minimum data necessary.
- Allow users to request deletion of personal data where applicable.
- Protect personal data using appropriate technical and organizational measures.
- Handle sensitive information, such as precise location data, with appropriate care and transparency.

Additional legal obligations may apply depending on deployment, jurisdiction, and future platform features.

---

# 17. Disclaimer

Sevana is a technology platform intended to assist in reporting and coordinating animal rescue activities.

The platform does not guarantee:

- Rescue completion
- Veterinary treatment
- NGO availability
- Response times
- Donation outcomes

Users should contact emergency services or appropriate authorities when immediate intervention is required.

---

# 18. Future Legal Enhancements

Future versions should include:

- Complete Privacy Policy
- Terms of Service
- Cookie Policy
- Data Processing Agreement
- Account Deletion Workflow
- Consent Management
- Audit Logs
- Compliance Review Process

---

# Legal Review Checklist

Before releasing a new feature:

☐ Personal data reviewed

☐ Permissions minimized

☐ Privacy impact considered

☐ Documentation updated

☐ Security reviewed

☐ Third-party integrations evaluated

☐ User consent requirements assessed

---

# Final Principle

Respect for user privacy, responsible data handling, and compliance with applicable laws are fundamental to Sevana.

Every new feature should be designed with privacy, security, and transparency in mind.