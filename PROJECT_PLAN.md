# FlowSpace — Project Planning Document
> Distraction-Free Focus Timer with Lofi Music & AI Accountability
> Built by Royale Automation | Version 1.1 | February 2026

---

## 1. The Problem

Millions of students and professionals use YouTube Lofi streams as a study/work background but YouTube actively works against focus — ads interrupt flow at the worst moments, autoplay pulls you into rabbit holes, comments are distracting, and there is no timer built in. Existing Pomodoro apps are plain and boring with no music. Existing music apps have no productivity layer. Nobody has combined both into one clean, distraction-free experience.

### Core Pain Points
- YouTube ads destroy focus and break flow state
- YouTube autoplay sends you off task
- Existing Pomodoro apps are visually dull and have no personality
- No accountability after a session — did you actually do the work?
- No insight into personal productivity patterns over time
- No built-in task management tied to focus sessions

---

## 2. The Solution

FlowSpace is a beautiful, distraction-free focus tool that combines a Pomodoro timer with curated ambient music and an AI accountability coach. You pick your vibe, commit to a task, focus for 25 minutes with zero interruptions, and check in with AI when the session ends. Over time FlowSpace learns your productivity patterns and helps you optimize them.

### The One-Liner
*"Your focused workspace. No ads, no distractions, just flow."*

---

## 3. Target Users

- Students studying for exams or working on assignments
- Job seekers doing focused application sessions (LaunchPad crossover)
- Remote workers and freelancers
- Developers, writers, and creators who need deep focus
- Anyone who currently uses YouTube Lofi streams to work

---

## 4. Music Vibes

All four vibes available with multiple variations each:

**Lofi Hip Hop** — the classic study beat, chill and rhythmic
**Rain & Nature Sounds** — rain on windows, thunderstorms, forest, ocean waves
**Coffee Shop Ambience** — background chatter, espresso machines, soft jazz
**Binaural Beats / Focus Music** — science-backed frequencies for deep concentration (Alpha, Beta, Theta waves)

### Music Licensing Strategy
- YouTube iframe API for curated royalty-free Lofi channels (ChilledCow, Lofi Girl with attribution)
- Royalty-free sources: Pixabay Music, Free Music Archive, ccMixter
- Long term: license directly from independent Lofi artists (builds community too)

---

## 5. Features

### Phase 1 — MVP (Weeks 1–2)
**Pomodoro Timer**
Classic 25/5 minute work-break cycle with customizable intervals (15/5, 50/10, 90/20). Clean visual countdown with progress ring. Audio chime at session end.

**Music Player**
Four vibe categories, multiple streams per category. Volume control. No ads, no autoplay, no distractions. Plays seamlessly through the full session.

**Task Commitment**
Before each session the user types what they are working on. Simple one-line input. Sets intention and creates accountability.

### Phase 2 — AI Layer (Weeks 3–4)
**AI Check-in After Each Session**
When the timer ends Claude asks: "Did you finish what you set out to do?" User responds and AI gives a brief encouraging or redirecting response. Keeps a log of session outcomes.

**AI Accountability Coach**
If the user misses multiple sessions or keeps not completing tasks, the AI notices and gently calls it out. Not annoying — supportive. Like a study buddy who checks on you.

### Phase 3 — Productivity Intelligence (Weeks 5–6)
**Streaks & Gamification**
Daily and weekly streaks for completing focus sessions. Badges for milestones — first 10 sessions, 7-day streak, 100 sessions total. Visual streak calendar like GitHub's contribution graph.

**Task List Built In**
Simple task manager tied to sessions. Add tasks, assign them to sessions, check them off. Backlog of incomplete tasks carries over to next day.

**Productivity Stats & Insights**
Dashboard showing total focus hours, sessions per day, best time of day, most productive vibe/music, task completion rate. Weekly summary email with highlights.

### Phase 4 — Polish & Growth (Weeks 7–8)
**Custom Timer Modes**
User-defined work and break intervals. Saved presets. "Ultra Focus" mode that blocks distracting sites during sessions (Chrome extension).

**Dark/Light Mode + Themes**
Multiple visual themes — Dark Forest, Midnight City, Warm Desk, Minimal White. Aesthetic is a core part of the product identity.

**Session Notes**
Quick notes field during breaks to capture thoughts without leaving the app.

---

## 6. Differentiators

| Feature | FlowSpace | YouTube | Forest | Be Focused | Focusmate |
|---|---|---|---|---|---|
| Google Workspace Add-on | ✅ | ❌ | ❌ | ❌ | ❌ |
| No Ads | ✅ | ❌ | ✅ | ✅ | ✅ |
| Built-in Lofi Music | ✅ | ✅ | ❌ | ❌ | ❌ |
| AI Accountability | ✅ | ❌ | ❌ | ❌ | ⚠️ Human only |
| Task Management | ✅ | ❌ | ⚠️ Basic | ⚠️ Basic | ❌ |
| Productivity Stats | ✅ | ❌ | ⚠️ Basic | ⚠️ Basic | ❌ |
| Gamification | ✅ | ❌ | ✅ | ❌ | ❌ |
| Beautiful UI | ✅ | ⚠️ | ✅ | ❌ | ❌ |
| Priced for Students | ✅ $4/mo | Free | $3.99 one-time | $4.99/mo | $7.99/mo |

---

## 7. Tech Stack

### Frontend
- **Framework:** Next.js 14 + Tailwind CSS
- **Animations:** Framer Motion (smooth, beautiful transitions)
- **Audio:** Howler.js (reliable cross-browser audio handling)
- **Deployment:** Vercel

### Google Workspace Add-on (Phase 2)
- **Language:** Google Apps Script (JavaScript)
- **Platforms:** Google Docs, Google Sheets, Gmail sidebar
- **Distribution:** Google Workspace Marketplace (free acquisition channel)
- **Features in sidebar:**
  - Full Pomodoro timer with countdown
  - Music player with vibe selection (YouTube iframe embedded)
  - Task commitment input before each session
  - Basic session logging connected to Supabase backend
  - Break reminders via sidebar alerts
- **Limitations to be aware of:**
  - Audio does not persist when user switches tabs — sidebar pauses
  - No push notifications outside the sidebar
  - Analytics dashboard links out to full web app
- **Strategy:** Free tier only — drives users from Workspace Marketplace into the full web app for Pro features

### Chrome Extension (Phase 4)
- Vanilla JavaScript
- Site blocker during focus sessions
- Quick timer popup without opening full app
- Persistent audio across tabs (solves the sidebar audio limitation)

### Backend
- **Framework:** Python + FastAPI
- **Hosting:** Railway (free tier to start)

### AI Layer
- **Model:** Claude API
- **Use Cases:** Session check-ins, accountability coaching, weekly insights generation

### Authentication
- **Clerk** — user authentication, Google OAuth, session management, pre-built sign in/sign up UI. Free tier supports up to 10,000 monthly active users. Integrates natively with Next.js. Replaces Supabase Auth entirely.

### Database
- **Neon (PostgreSQL)** — user profiles, session history, task data, streaks, preferences (transactional data). Serverless PostgreSQL, generous free tier, Next.js friendly. Clerk syncs user records to Neon via webhooks.
- **ClickHouse** — aggregated productivity analytics for dashboard

### Music
- **YouTube iframe API** — curated royalty-free channels
- **Howler.js** — for self-hosted royalty-free audio files
- **Pixabay / Free Music Archive** — royalty-free sound sources

### Email
- **Resend** — weekly productivity summary emails

### Payments
- **Stripe** — subscription management

---

## 8. Pricing

### Free Tier
- 4 Pomodoro sessions per day
- 2 music vibes (Lofi Hip Hop + Rain)
- Basic task commitment input
- 7-day session history
- Google Workspace Add-on (full access — free acquisition channel)
- *Goal: Hook users on the experience*

### Pro Plan — $4/month or $39/year
- Unlimited sessions
- All 4 music vibes + all variations
- AI check-in and accountability coach
- Full task management
- Complete productivity stats and insights
- All themes and visual customization
- Streaks, gamification, and badges
- Weekly summary email
- Chrome extension site blocker
- *Target: Students and professionals who are serious about focus*

---

## 9. Build Order (Roadmap)

### Week 1: Core Timer + Music MVP
- Next.js project setup
- Pomodoro timer UI with progress ring
- Music player with YouTube iframe API
- Task commitment input before session
- Deploy to Vercel — share with friends immediately

### Week 2: Auth + Session Logging
- Supabase auth (Google login for zero friction)
- Session history stored in database
- Basic stats page (total sessions, total focus hours)

### Week 3: Google Workspace Add-on
- Google Apps Script sidebar setup
- Pomodoro timer inside Google Docs and Sheets
- YouTube iframe music player embedded in sidebar
- Task commitment input
- Connect to Supabase backend via fetch API to log sessions
- Submit to Google Workspace Marketplace for early user acquisition

### Week 4: AI Check-in Layer
- Claude API integration
- Post-session check-in flow
- AI accountability responses
- Session outcome logging

### Week 5–6: Gamification + Task Management
- Streak tracking and streak calendar
- Badges and milestones system
- Full task list with session assignment
- ClickHouse setup for analytics

### Week 7: Productivity Dashboard
- Stats dashboard UI
- Best time of day analysis
- Most productive vibe insights
- Weekly email summary with Resend

### Week 8: Polish + Stripe
- All themes and dark/light mode
- Stripe subscription integration
- Free vs Pro feature gating
- Onboarding flow for new users
- Public launch

---

## 10. Estimated Monthly Costs at MVP Stage

| Service | Cost |
|---|---|
| Vercel (frontend) | Free |
| Railway (backend) | Free tier |
| Clerk (authentication) | Free tier (10k MAU) |
| Neon (PostgreSQL database) | Free tier |
| ClickHouse Cloud | Free tier |
| Claude API | ~$3–10 (low volume) |
| Resend (email) | Free tier |
| Stripe | 2.9% + 30¢ per transaction only |
| YouTube iframe API | Free |
| **Total** | **~$3–10/month until revenue** |

---

## 11. The Connection to LaunchPad

FlowSpace and LaunchPad are separate products but share a user base — students and job seekers. Future opportunity to cross-promote:

- LaunchPad users get a FlowSpace discount — "Focus on your job search with FlowSpace"
- FlowSpace users discover LaunchPad — "Now that you're focused, let's get you hired"
- Both products under the Royale Automation brand
- Shared Clerk authentication — one account, two tools, seamless login across both apps

This is how you build a **micro product suite** rather than one single product. Lower risk, multiple revenue streams, shared audience.

---

## 12. Portfolio & Career Value

FlowSpace demonstrates a completely different skill set from LaunchPad:

- **Audio integration** — Howler.js, YouTube iframe API
- **Google Workspace Add-on** — Apps Script, sidebar development, Marketplace distribution
- **Animations & UI polish** — Framer Motion, advanced Tailwind
- **Chrome Extension development** — browser APIs, content scripts
- **Gamification systems** — streak logic, badge triggers, engagement mechanics
- **Behavioral AI** — Claude as an accountability coach, pattern recognition
- **Product design thinking** — solving a real UX problem elegantly

Interview story: *"I was frustrated with YouTube ads destroying my focus sessions so I built my own distraction-free study tool with AI accountability. It now has X users."*

---

## 13. App Name Options

| Name | Vibe |
|---|---|
| **FlowSpace** | Clean, professional, describes the experience |
| **FocusRoom** | Familiar, easy to remember |
| **PomoChill** | Fun, targets the Lofi crowd specifically |
| **StudyDen** | Cozy, student-friendly |
| **Zenly** | Minimal, zen-inspired |
| **LofiWork** | Direct, SEO-friendly |

Recommendation: **FlowSpace** — broad enough to grow beyond students, professional enough for remote workers, and descriptive of the core experience.

---

## 14. Success Metrics

| Metric | Month 1 | Month 3 | Month 6 |
|---|---|---|---|
| Registered Users | 50 | 300 | 1,000 |
| Daily Active Users | 20 | 100 | 350 |
| Paying Users | 5 | 40 | 120 |
| MRR | $20 | $160 | $480 |
| Avg Sessions Per User/Day | 2 | 3 | 4 |

---

*Document created: February 2026*
*Built with Claude Code | Powered by Royale Automation*
