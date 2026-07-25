# Contributing Guide

**Project:** Sevana - Animal Rescue Platform  
**Version:** 1.0  
**Last Updated:** July 2026

---

# Welcome

Thank you for contributing to Sevana!

Sevana is a community-driven platform that helps citizens, volunteers, NGOs, and veterinarians collaborate to rescue and care for animals.

This guide explains how to contribute while maintaining high standards of quality, security, and consistency.

---

# Table of Contents

1. Project Philosophy
2. Before You Start
3. Development Environment
4. Branch Strategy
5. Development Workflow
6. Coding Standards
7. Commit Guidelines
8. Pull Request Guidelines
9. Code Review Process
10. Testing Requirements
11. Documentation Requirements
12. Reporting Issues
13. Feature Requests
14. Contributor Responsibilities

---

# Project Philosophy

Every contribution should improve one or more of the following:

- Reliability
- Performance
- Security
- Accessibility
- User Experience
- Maintainability
- Documentation

Code quality is more important than the number of features.

---

# Before You Start

Before making changes:

- Read `project-context.md`
- Read `coding-standards.md`
- Read `database-guidelines.md`
- Read `security-guidelines.md`
- Read `git-workflow.md`
- Understand the current roadmap

Never begin development without understanding the architecture.

---

# Development Environment

Requirements

- Node.js (LTS)
- Docker Desktop
- PostgreSQL
- Redis
- Git
- VS Code (Recommended)

Clone the repository

```bash
git clone <repository-url>
cd sevana
```

Install dependencies

```bash
npm install
```

Start services

```bash
docker compose up -d
```

Run migrations

```bash
npm run migrate
```

Start backend

```bash
npm run dev
```

Start frontend

```bash
npm run dev
```

---

# Branch Strategy

Never commit directly to `main`.

Create a feature branch.

Examples

```text
feature/auth

feature/report-system

feature/profile

feature/leaderboard

bugfix/login-validation

docs/api-updates
```

One feature per branch.

---

# Development Workflow

1. Pull latest changes.

```bash
git checkout main
git pull origin main
```

2. Create a feature branch.

```bash
git checkout -b feature/<feature-name>
```

3. Develop your feature.

4. Test thoroughly.

5. Commit using Conventional Commits.

6. Push your branch.

7. Open a Pull Request.

8. Resolve review comments.

9. Merge after approval.

---

# Coding Standards

Every contribution must follow:

- `coding-standards.md`
- `security-guidelines.md`
- `database-guidelines.md`

General Rules

- Keep functions small.
- Avoid duplicate code.
- Write descriptive names.
- Validate all input.
- Handle errors gracefully.
- Never hardcode secrets.

---

# Commit Guidelines

Use Conventional Commits.

Examples

```text
feat(auth): add login endpoint

fix(profile): resolve avatar upload issue

refactor(report): simplify report service

docs(readme): update setup instructions

test(auth): add registration tests
```

Avoid messages such as:

```text
update

done

changes

new code

fix

final
```

---

# Pull Request Guidelines

A Pull Request should:

- Focus on a single feature or fix.
- Include a clear description.
- Reference related issues (if applicable).
- Pass all tests.
- Update documentation when necessary.

Before requesting a review, verify:

- Code builds successfully.
- No linting errors.
- No console errors.
- No secrets committed.
- Documentation updated.

---

# Code Review Checklist

Reviewers should check:

- Correctness
- Readability
- Architecture
- Performance
- Security
- Validation
- Error handling
- Documentation
- Naming conventions

Constructive feedback is encouraged.

---

# Testing Requirements

Before merging:

Backend

- API tested
- Validation tested
- Error handling tested

Frontend

- UI tested
- Responsive layout checked
- API integration verified

Project

- End-to-end flow works
- No critical bugs

---

# Documentation Requirements

Whenever a feature changes:

Update the relevant documentation.

Examples

- API changes → `api-spec.md`
- Database changes → `db-schema.md`
- New module → `modules.md`
- New milestone → `roadmap.md`
- Security changes → `security-guidelines.md`

Documentation is part of the contribution.

---

# Reporting Issues

When reporting a bug, include:

- Title
- Description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment
- Browser / Device

Well-written bug reports are easier to resolve.

---

# Feature Requests

When proposing a feature, include:

- Problem statement
- Proposed solution
- Benefits
- Possible drawbacks
- Screens or diagrams (optional)

Discuss major architectural changes before implementation.

---

# Contributor Responsibilities

Every contributor should:

- Follow project standards.
- Keep code clean.
- Write secure code.
- Test before submitting.
- Respect documentation.
- Communicate major changes.

Remember that every commit becomes part of the project's history.

---

# Code of Conduct

Contributors should:

- Be respectful.
- Provide constructive feedback.
- Collaborate openly.
- Welcome suggestions.
- Focus on solving problems.

Disagreements should be resolved through technical discussion and evidence.

---

# Definition of Done

A contribution is complete only if:

☐ Code implemented

☐ Validation added

☐ Error handling completed

☐ Security reviewed

☐ Documentation updated

☐ Tested successfully

☐ Commit message follows standards

☐ Ready for review

---

# Thank You

Every contribution—whether code, documentation, testing, or design—helps improve Sevana and supports its mission of building a reliable platform for animal welfare.

Thank you for contributing!