# Sevana XP, Trust & Gamification System

Version: 1.0

Status: Approved

Owner: Sevana Engineering Team

---

# 1. Purpose

The XP and Trust System encourages meaningful community participation
while preventing spam, abuse, and fake contributions.

The system is designed to:

- Reward genuine rescue efforts
- Build user reputation
- Encourage long-term participation
- Identify trustworthy community members
- Support volunteer eligibility
- Drive engagement without encouraging abuse

---

# 2. Core Principles

Sevana uses two separate scoring systems.

## XP

Measures activity.

Examples

- Reports
- Rescue participation
- Stories
- Community contributions

XP determines:

- Levels
- Achievements
- Leaderboards

---

## Trust Score

Measures reliability.

Trust determines:

- Volunteer eligibility
- Community credibility
- Platform reputation

Trust cannot be earned by spamming actions.

---

# 3. XP Sources

| Activity | XP |
|-----------|---:|
| Report Submitted | +50 |
| Rescue Joined | +20 |
| Rescue Successfully Completed | +100 |
| Reporter Confirmation Received | +50 |
| Rescue Story Published | +30 |
| Volunteer Application Approved | +100 |
| Daily Login | +5 |
| 7-Day Streak | +30 |
| Community Appreciation | +15 |
| Helpful Timeline Update | +10 |

XP values can be adjusted through configuration.

---

# 4. Trust Score

Default Trust Score

```
100
```

Maximum

```
1000
```

Minimum

```
0
```

Trust increases slowly.

Trust decreases immediately for abuse.

---

# 5. Trust Increase

Examples

| Event | Trust |
|-------|-------:|
| Rescue Confirmed | +10 |
| Accurate Report | +5 |
| Positive Community Rating | +2 |
| Successful Volunteer Mission | +15 |
| Consistent Weekly Activity | +3 |

---

# 6. Trust Decrease

Examples

| Event | Trust |
|-------|-------:|
| Fake Report | -50 |
| Spam | -20 |
| Rescue Abandonment | -15 |
| False Timeline Update | -10 |
| Community Misconduct | -30 |
| Volunteer Misuse | -100 |

Trust deductions require backend validation.

---

# 7. User Levels

Levels are based on XP.

| Level | XP Required |
|--------|------------:|
| Beginner | 0 |
| Animal Friend | 100 |
| Animal Helper | 300 |
| Community Rescuer | 700 |
| Guardian | 1500 |
| Hero | 3000 |
| Legend | 6000 |

Levels unlock badges only.

They do not grant administrative permissions.

---

# 8. Achievements

Achievements celebrate milestones.

Examples

First Report

First Rescue

10 Successful Rescues

100 XP Earned

1000 XP Earned

Volunteer Approved

50 Animals Helped

100 Rescue Updates

100 Community Appreciations

Year of Service

Achievements are permanent.

---

# 9. Badges

Badges are visible on user profiles.

Examples

🐾 First Rescue

🚑 Active Rescuer

🏥 Vet Partner

🤝 Community Hero

⭐ Top Volunteer

🔥 30-Day Streak

🏆 Top Contributor

---

# 10. Daily Streaks

Users earn streaks by remaining active.

Example

1 Day

↓

2 Days

↓

7 Days

↓

30 Days

↓

100 Days

Missing one day resets the streak.

---

# 11. Leaderboards

Leaderboards support:

Daily

Weekly

Monthly

All Time

Sorting options

XP

Successful Rescues

Trust Score

Volunteer Contributions

---

# 12. Volunteer Reputation

Each volunteer has:

Volunteer ID

Total Missions

Completed Missions

Success Rate

Trust Score

Community Rating

Years of Service

Availability

This information is public.

---

# 13. Community Ratings

After a completed rescue,

participants may rate each other.

Scale

1

↓

5 Stars

Average rating appears on volunteer profiles.

Abusive ratings are moderated.

---

# 14. Anti-Abuse Measures

XP cannot be farmed.

Examples

Repeated report submissions

↓

No additional XP

Duplicate rescue joins

↓

Rejected

Fake reports

↓

Trust reduction

Repeated timeline spam

↓

Ignored

Everything is validated by backend logic.

---

# 15. XP Transactions

Every XP award creates an immutable transaction.

Transaction stores:

User ID

Amount

Reason

Reference Table

Reference ID

Timestamp

XP is never updated directly without a transaction.

---

# 16. Trust Calculation

Trust changes are calculated only by backend services.

Frontend cannot modify:

Trust

XP

Levels

Badges

Achievements

---

# 17. Recognition

The platform celebrates community impact.

Examples

Volunteer of the Month

Top Rescuer

Community Hero

Most Helpful User

Top Story

Recognition is based on meaningful contributions.

---

# 18. Future Rewards

Possible future integrations

Certificates

Partner Discounts

Volunteer Merchandise

Training Invitations

Event Invitations

NGO Recognition

These are outside the MVP scope.

---

# 19. Gamification Rules

Reward

Helpful behavior.

Do not reward

Spam.

Do not encourage

Competition over animal welfare.

Rescuing animals always comes before earning XP.

---

# 20. Security

XP is backend controlled.

Trust is backend controlled.

Duplicate rewards are blocked.

All rewards are logged.

Suspicious activity triggers review.

---

# 21. Future Enhancements

AI-based contribution scoring

Seasonal events

Mission system

Rescue challenges

Location-based campaigns

Community quests

Volunteer certification levels

Partner reward integrations

---

# 22. Guiding Philosophy

The purpose of gamification is to strengthen the community,
not to turn rescue operations into a game.

XP recognizes effort.

Trust recognizes reliability.

Compassion remains the core value of Sevana.

---

# End of Document