# Git Workflow

**Project:** Sevana - Animal Rescue Platform  
**Version:** 1.0  
**Last Updated:** July 2026

---

# Purpose

This document defines the Git workflow followed throughout the Sevana project.

The objectives are:

- Prevent merge conflicts
- Maintain clean commit history
- Enable parallel development
- Ensure code stability
- Support easy rollback

Every contributor must follow this workflow.

---

# Table of Contents

1. Branch Strategy
2. Daily Workflow
3. Feature Development
4. Commit Standards
5. Pull Workflow
6. Merge Workflow
7. Conflict Resolution
8. Release Workflow
9. Emergency Rollback
10. Best Practices

---

# Repository Structure

Main Repository

```

main

```

Feature Branches

```

backend-auth
backend-reports
backend-rescue
backend-notifications

frontend-auth
frontend-dashboard
frontend-profile
frontend-reports

feature/<feature-name>

```

Never develop directly on main.

---

# Branch Ownership

Backend Developer

Owns

- backend-auth
- backend-reports
- backend-rescue
- backend-notifications
- backend-vets
- backend-ngos

Frontend Developer

Owns

- frontend-auth
- frontend-dashboard
- frontend-profile
- frontend-reports
- frontend-home

Never work on someone else's active branch without discussion.

---

# Daily Workflow

Morning

```

git checkout main

git pull origin main

```

Create or switch to your feature branch.

```

git checkout backend-auth

```

OR

```

git checkout frontend-auth

```

Work only on your assigned feature.

---

# Starting a New Feature

Always begin from the latest main.

```

git checkout main

git pull origin main

git checkout -b backend-profile

```

Never branch from an outdated feature branch.

---

# Development Cycle

Architecture

↓

Create Feature Branch

↓

Write Code

↓

Test

↓

Commit

↓

Push

↓

Review

↓

Merge

↓

Delete Branch

---

# Commit Frequency

Commit frequently.

Recommended

Every

- completed API
- completed component
- bug fix
- documentation update

Avoid one massive commit at the end of the day.

---

# Commit Message Convention

Use Conventional Commits.

Features

```

feat(auth): implement user registration

```

Fixes

```

fix(report): resolve duplicate upload issue

```

Refactoring

```

refactor(auth): simplify login service

```

Documentation

```

docs(api): update authentication endpoints

```

Styling

```

style(profile): improve dashboard layout

```

Performance

```

perf(report): optimize nearby report query

```

Tests

```

test(auth): add login API tests

```

Bad Examples

```

update

changes

done

new code

final

```

---

# Before Every Commit

Run the application.

Verify

Backend

```

npm run dev

```

Frontend

```

npm run dev

```

Check

- No errors
- No warnings
- API works
- UI works

Then

```

git add .

git commit -m "feat(auth): implement login endpoint"

```

---

# Push Workflow

After committing

```

git push origin backend-auth

```

or

```

git push origin frontend-auth

```

Never force push unless absolutely necessary.

---

# Pull Workflow

Before starting work

```

git checkout main

git pull origin main

```

Then

```

git checkout your-branch

git merge main

```

Stay synchronized with the latest changes.

---

# Merge Workflow

Feature Complete

↓

Review

↓

Testing

↓

Merge into Main

↓

Delete Feature Branch

Never merge unfinished work.

---

# Merge Checklist

Before merging

Backend

✅ API Tested

✅ Validation Complete

✅ Security Checked

✅ Documentation Updated

Frontend

✅ UI Complete

✅ Responsive

✅ API Connected

✅ Error Handling Added

Project

✅ End-to-End Tested

---

# Merge Conflicts

If conflict occurs

DO NOT panic.

Steps

1.

Pull latest main.

```

git pull origin main

```

2.

Resolve conflicts manually.

3.

Run application.

4.

Test affected modules.

5.

Commit resolved version.

Never blindly accept incoming or current changes.

Understand both versions first.

---

# File Ownership

Backend Developer edits

```

controllers

services

repositories

routes

middleware

validators

database

```

Frontend Developer edits

```

pages

components

hooks

context

layouts

styles

```

Avoid modifying files owned by another contributor.

---

# Documentation

Whenever a module changes

Update

- API Contract
- Module Documentation
- Roadmap (if needed)
- Changelog

Documentation is part of development.

---

# End of Day Workflow

Every evening

```

git status

```

Verify

No unwanted files.

Then

```

git add .

git commit -m "feat(auth): complete authentication module"

git push

```

Never leave uncommitted changes overnight.

---

# Release Workflow

Release Candidate

↓

Complete Testing

↓

Bug Fixes

↓

Final Merge

↓

Git Tag

↓

Deployment

---

# Emergency Rollback

If main becomes unstable

Find previous stable commit

```

git log

```

Checkout

```

git checkout <commit>

```

Or

Revert

```

git revert <commit>

```

Avoid force reset on shared branches.

---

# Ignore Files

Never commit

```

.env

node_modules/

dist/

build/

coverage/

logs/

.env.local

```

Always verify

```

git status

```

before committing.

---

# Best Practices

✅ Pull before starting work

✅ Work on feature branches

✅ Commit often

✅ Write meaningful commit messages

✅ Test before pushing

✅ Update documentation

✅ Review your own code

✅ Merge only stable code

---

# Daily Developer Checklist

Morning

☐ Pull latest main

☐ Update dependencies if needed

☐ Start Docker

☐ Start Backend

☐ Start Frontend

☐ Read today's tasks

During Development

☐ Commit frequently

☐ Test APIs

☐ Test UI

☐ Update documentation

Before Sleeping

☐ Test application

☐ Push all commits

☐ Ensure no pending changes

☐ Update task board

---

# Final Principle

Git is not just a backup tool.

Git is the project's history.

Every commit should tell a meaningful story about the evolution of Sevana.

A clean Git history is as valuable as clean code.