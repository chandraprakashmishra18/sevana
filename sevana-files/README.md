# Sevana — Animal Rescue Network

A community-driven civic + compassion React app with a full **User ↔ Volunteer profile switch**.

## Quick Start

```bash
npm install
npm run dev
```

Then open **http://localhost:5173**

---

## Project Structure

```
src/
├── Components/
│   ├── Common/          # Button, Card, Pill, Divider, ProgressBar, SectionTitle
│   ├── Feedback/        # XPToast
│   ├── Layout/          # BottomNav, GlobalStyles
│   └── Profile/         # ProfileToggle (the User ↔ Volunteer switch)
├── Context/             # UserContext (global mode + XP state)
├── Data/                # Reports, Vets, Badges, Feeders, LostFound, UserData, VolunteerData
├── Hooks/               # UseXP, UseToggle, UseSocket
├── Screens/
│   ├── Home/            # Dashboard, stats, active reports, feeder network
│   ├── Report/          # 4-step geotagged photo report flow
│   ├── RescueFeed/      # Live reports feed, rescue thread, wishlist, lost & found
│   ├── Vets/            # Vet finder, filters, helplines
│   └── Profile/
│       ├── ProfileScreen.jsx      ← Orchestrates the toggle
│       ├── UserProfile.jsx        ← Normal user view
│       ├── UpgradeModal.jsx       ← Pledge flow to become volunteer
│       └── VolunteerProfile/
│           ├── VolunteerProfile.jsx
│           └── tabs/
│               ├── OverviewTab.jsx      # XP, tier, ranks, consistency heatmap
│               ├── AuthoritiesTab.jsx   # 9 volunteer authorities
│               ├── SkillsTab.jsx        # Skills registry + proficiency bars
│               ├── CasesTab.jsx         # Active cases + drives + quick actions
│               ├── ActivityTab.jsx      # Timeline + XP by module
│               └── JanPramanTab.jsx     # Civic Trust Score for elections
├── Styles/
│   └── Theme.js         # All design tokens (colours, tier definitions)
└── Utils/
    ├── Severity.js      # sev(type) → { label, bg, color }
    └── Status.js        # status(type) → { label, bg, color }
```

---

## The Profile Switch Feature

The core feature of this build. Located at **`src/Screens/Profile/ProfileScreen.jsx`**.

**User mode** (light, warm): standard profile with XP, leaderboard, badges, and a CTA to upgrade.

**Volunteer mode** (dark, earthy): full volunteer dashboard with 6 tabs:
- **Overview** — Tier progress, ward/city/state/national ranks, impact stats, 12-month consistency heatmap
- **Authorities** — 7 active permissions (Raise Hand, Thread Updates, Donation Validation, etc.) + 2 locked
- **Skills** — 8 verified/pending skills, proficiency breakdown, skill request flow
- **Active Cases** — Live rescue cases + upcoming drives + 6 quick-action shortcuts
- **Activity** — Timeline with XP per action + module breakdown chart
- **Jan Praman** — Civic Trust Score for local electoral transparency

**Switching flow:**
- User → Volunteer: triggers `UpgradeModal` with requirements checklist + volunteer pledge
- Volunteer → User: instant, no modal

---

## Key Features

| Feature | Description |
|---|---|
| 🐾 Rescue report | 4-step form: photo → animal/severity/behaviour → location → review |
| 🗺️ Rescue feed | Live reports, thread view, resource wishlist, lost & found board |
| 🖐️ Raise Hand | Geo-radius crowd alert (simulated with useSocket hook) |
| 🏥 Vet finder | Searchable, filterable, open/closed status, direct call |
| 🦸 Volunteer profile | 6-tab dark-mode dashboard with full authority system |
| 🏛️ Jan Praman | Civic trust score for local election candidates |
| ⚡ XP system | Points for every civic action, tier progression, streaks |
| 🏆 Leaderboard | Ward / City / State / National rankings |

---

## Notes for Capstone Submission

- All screens use **inline styles** with tokens from `src/Styles/Theme.js` — no CSS files needed per component.
- The socket hook (`UseSocket.js`) is **simulated** — replace with a real `socket.io-client` connection for production.
- GPS location in `ReportScreen` is **simulated** — replace with `navigator.geolocation.getCurrentPosition()` or `expo-location` for mobile.
- `VOLUNTEER_DATA` and `USER_DATA` are static — connect to a real backend API in production.
