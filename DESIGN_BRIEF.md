# FlowSpace — Design Brief
> Screen-by-Screen UI Reference for Mobbin Research & Claude Code
> Version 1.0 | February 2026

---

## Design Identity

### Aesthetic Direction
**Immersive Minimal Dark** — Think deep space, not sterile hospital. The UI disappears so the user can focus. Every element earns its place. Nothing decorative exists without purpose.

### Core Aesthetic Principles
- **Dark mode first** — deep charcoal and near-black backgrounds, never pure #000000
- **Dynamic theming** — the entire UI color palette shifts with the active music vibe
- **Soft gradients** — no harsh edges, everything breathes and glows softly
- **Generous negative space** — content never feels cramped
- **Subtle grain texture overlay** — adds warmth and stops the UI feeling cold/digital
- **One strong focal point per screen** — the timer ring, the vibe selector, the streak calendar

### Color System — Vibe-Based Theming

| Vibe | Background | Accent | Glow |
|---|---|---|---|
| Lofi Hip Hop | #1A1208 (deep amber-black) | #F5A623 (warm amber) | #F5A62340 |
| Rain & Nature | #08121A (deep blue-black) | #4A9EBF (cool blue) | #4A9EBF40 |
| Coffee Shop | #150E08 (deep brown-black) | #C4813A (warm coffee) | #C4813A40 |
| Binaural Beats | #100B1A (deep purple-black) | #8B5CF6 (electric violet) | #8B5CF640 |

### Typography
- **Display / Timer:** `DM Mono` or `Space Mono` — monospace feels precise and technical for countdown numbers
- **Headings:** `Clash Display` or `Cabinet Grotesk` — modern, characterful, not generic
- **Body:** `Geist` or `Outfit` — clean, readable, friendly
- **Never use:** Inter, Roboto, Arial, System fonts

### Motion Principles
- Timer ring animates smoothly with CSS stroke-dashoffset
- Vibe switch triggers a full-screen background color crossfade (600ms ease)
- Screen transitions use subtle fade + slight upward drift (not slides)
- Micro-interactions on every button — subtle scale on hover, satisfying press on click
- Session completion triggers a particle burst or ripple effect — reward moment

---

## Screen 1: Landing Page

### Purpose
First impression. Convert visitors into signups. Communicate the product feeling before explaining features.

### Mobbin Search Terms
- "productivity app landing page"
- "focus app hero section"
- "saas dark landing page"
- "ambient app website"

### Reference Apps to Study
Endel, Brain.fm, Calm, Linear, Vercel, Raycast websites

### Layout Structure
```
[Full-screen hero — animated timer ring in background, tagline center]
[Social proof strip — "X focus sessions completed today"]
[Feature cards — 3 columns, icon + headline + one line description]
[Vibe preview — interactive music vibe switcher showing UI color change]
[Pricing section — free vs pro, clean comparison]
[Footer — minimal]
```

### Key Design Decisions
- Hero background shows a live animated version of the main focus screen — users immediately understand what they're buying
- Tagline: *"Your focused workspace. No ads, no distractions, just flow."*
- CTA button: "Start Focusing Free" — action-oriented, not "Sign Up"
- No navbar clutter — just logo + login link + CTA button
- The vibe switcher in the feature section lets visitors click through all 4 vibes and watch the page color change — interactive demo built into the landing page

### Prompt for Claude Code
> Build a dark-mode landing page for FlowSpace, a Pomodoro focus app with ambient music. Hero section has a large animated circular timer ring as background art with a centered tagline. Page color theme switches dynamically between 4 music vibes (Lofi/amber, Rain/blue, Coffee/brown, Binaural/purple) when user clicks vibe buttons in the features section. Grain texture overlay on background. Font: Clash Display for headings, Geist for body. Smooth crossfade transitions between color themes.

---

## Screen 2: Onboarding Flow

### Purpose
Get the user set up and emotionally invested in 3 steps. Make them feel like FlowSpace was built for them.

### Mobbin Search Terms
- "onboarding flow steps"
- "app setup wizard"
- "preference selection UI"
- "personalization onboarding"

### Reference Apps to Study
Duolingo onboarding, Notion onboarding, Headspace setup, Linear onboarding

### Steps
**Step 1 — Pick Your Default Vibe**
4 large vibe cards with preview color, icon, and name. Tap to select, card glows with vibe accent color. Background immediately shifts to selected vibe color.

**Step 2 — Set Your Timer**
3 preset options displayed as large pill buttons: 25/5 (Classic), 50/10 (Deep Work), 15/5 (Quick Sprint). Custom option below. Selected pill fills with accent color.

**Step 3 — Set Your Daily Goal**
"How many sessions do you want to complete each day?" Slider from 1–8. Below the slider: "That's [X] hours of focused work." Feels achievable, not overwhelming.

### Key Design Decisions
- Progress dots at top (3 dots, fills as user advances)
- Each step is full screen — no scrolling
- Back button always visible — never trap the user
- Final step has a motivating micro-copy: *"You're all set. Let's get into flow."*
- CTA on final step: "Start My First Session" — not "Finish"

### Prompt for Claude Code
> Build a 3-step onboarding flow for FlowSpace. Step 1: vibe selection with 4 glowing cards that shift background color on select. Step 2: timer preset selection with pill buttons. Step 3: daily goal slider with dynamic copy. Full screen per step, progress dots at top, smooth fade transitions between steps. Dark theme with dynamic accent color matching selected vibe.

---

## Screen 3: Main Focus Screen ⭐ PRIORITY

### Purpose
The heart of the app. Where users spend 90% of their time. Must feel immersive, calm, and focused. Zero clutter.

### Mobbin Search Terms
- "pomodoro timer UI"
- "focus timer app"
- "countdown timer circle"
- "meditation timer screen"
- "minimal timer interface"

### Reference Apps to Study
Forest, Endel, Oak, Insight Timer, Calmly Writer

### Layout Structure
```
[Top bar — minimal: session count "Session 3 of 4" + settings icon]
[Center — large circular timer ring with countdown inside]
[Below timer — current task name in soft text]
[Bottom — music vibe icons row + volume slider]
[Bottom corners — pause button (left) + end session button (right)]
```

### Key Design Decisions
- Timer ring is 60–70% of screen height — it IS the screen
- Ring fills/depletes with smooth CSS animation, glows with vibe accent color
- Time displayed inside ring in monospace font — large, confident
- Current task shown below timer in muted text — reminder of commitment
- Music vibe icons are small, subtle — 4 icons, active one glows
- Volume control is a minimal horizontal slider
- No distracting elements — if it doesn't help focus, it doesn't exist
- When timer is running, UI chrome fades to 20% opacity — only timer is prominent
- Ambient particle animation in background — very subtle, slow-moving, matches vibe color

### States to Design
- **Idle** — timer at full, start button centered
- **Running** — ring depleting, UI chrome faded, task visible
- **Paused** — ring frozen, full UI chrome returns, resume/end options
- **Complete** — ring pulses with completion animation, transitions to Break Screen

### Prompt for Claude Code
> Build the main focus screen for FlowSpace. Large circular SVG timer ring (stroke-dashoffset animation) centered on screen, monospace countdown inside. Background shifts color based on active music vibe (4 vibes: amber/blue/coffee brown/purple). Subtle floating particle animation in background matching vibe color. Current task text below timer. Bottom bar with 4 vibe selector icons and volume slider. When timer is running, all UI chrome except timer fades to low opacity. Smooth transitions everywhere. Dark theme with grain texture overlay.

---

## Screen 4: Break Screen

### Purpose
Transition moment. Celebrate the completed session, check in with AI, set up the next session. Keep the user in flow — don't let them drift to YouTube.

### Mobbin Search Terms
- "break screen app"
- "completion screen"
- "check in UI"
- "rest mode interface"
- "session complete screen"

### Reference Apps to Study
Headspace post-meditation screen, Duolingo lesson complete, Forest session end, Calm daily streak screen

### Layout Structure
```
[Top — "Session Complete 🎉" with soft animation]
[Center — AI check-in message: "Did you finish [task name]?"]
[Response options — two large buttons: "Yes, nailed it" / "Not quite"]
[If "Not quite" — follow-up: "What got in the way?" text input]
[Below — next task input: "What will you focus on next?"]
[Bottom — "Start Break (5:00)" countdown + "Skip Break" link]
```

### Key Design Decisions
- Background softens during break — slightly lighter than focus screen, more relaxed feel
- AI response is warm and human — never robotic
- "Yes, nailed it" triggers a satisfying celebration micro-animation (confetti, pulse, glow)
- Break timer counts down automatically — user can skip or let it run
- Music continues playing through the break at slightly lower volume
- Streak progress shown subtly — "3 sessions today 🔥"

### Prompt for Claude Code
> Build the break screen for FlowSpace. Shows after a completed Pomodoro session. Displays AI check-in question referencing the user's committed task. Two response buttons with distinct styling. Conditional follow-up input if user didn't complete task. Next task input field. Auto-counting break timer with skip option. Subtle confetti or particle burst animation on session complete. Softer, warmer version of the main screen dark theme. Streak counter shown subtly.

---

## Screen 5: Task List Screen

### Purpose
Simple backlog of tasks to assign to upcoming focus sessions. Not a full project manager — just enough to stay organized.

### Mobbin Search Terms
- "task list minimal UI"
- "todo app dark mode"
- "backlog screen"
- "daily task manager"
- "focus tasks interface"

### Reference Apps to Study
Things 3, Todoist, Linear, Superlist, Structured

### Layout Structure
```
[Top — "Your Tasks" heading + "Add Task" button]
[Today section — tasks assigned to today's sessions]
[Backlog section — unassigned tasks]
[Each task row — checkbox + task name + "assign to next session" button]
[Completed section — collapsed by default, expandable]
```

### Key Design Decisions
- Tasks are minimal — just a title, no due dates or labels needed at MVP
- Drag to reorder within sections
- Completed tasks have a satisfying strikethrough animation
- "Assign to next session" button highlights in vibe accent color on hover
- Empty state is encouraging — "Nothing here yet. What will you focus on today?"
- Add task is an inline input, not a modal — frictionless

### Prompt for Claude Code
> Build a minimal task list screen for FlowSpace. Two sections: Today and Backlog. Each task row has a circular checkbox, task name, and assign button. Checkmark animation on completion with strikethrough. Drag to reorder. Inline add task input at top of each section. Dark theme matching FlowSpace aesthetic. Subtle dividers between sections. Empty state with encouraging copy.

---

## Screen 6: Dashboard / Stats Screen

### Purpose
Show the user their productivity patterns over time. Make them feel proud of their progress and motivated to keep going.

### Mobbin Search Terms
- "productivity dashboard dark"
- "streak calendar UI"
- "habit tracker stats"
- "analytics dashboard minimal"
- "github contribution graph"

### Reference Apps to Study
GitHub profile (contribution graph), Duolingo stats, Streaks app, Exist.io, Whoop app dashboard

### Layout Structure
```
[Top — greeting: "Great week, Emy 🔥"]
[Streak banner — current streak + longest streak side by side]
[Streak calendar — GitHub-style grid, last 12 weeks]
[Stats row — 3 cards: Total Hours / Sessions This Week / Completion Rate]
[Best Time of Day — horizontal bar chart showing sessions by hour]
[Top Vibe — which music vibe produces most completed sessions]
[Weekly Summary — "You focused X hours this week, up Y% from last week"]
```

### Key Design Decisions
- Streak calendar cells glow in vibe accent color for days with sessions
- Stats cards have subtle gradient borders in vibe accent color
- Charts are minimal — no chart.js clutter, clean custom bars
- Numbers animate up on page load — satisfying reveal
- "Share my stats" button for social sharing — organic growth loop
- If streak is broken, show gentle recovery message not shame

### Prompt for Claude Code
> Build a productivity dashboard for FlowSpace. GitHub-style streak calendar grid (12 weeks) with cells glowing in amber accent color for active days. Three stat cards with animated number counters. Horizontal bar chart for best focus time of day. Top vibe card showing most productive music category. Weekly summary text. Dark theme with subtle card borders using CSS gradient. Smooth number count-up animations on load.

---

## Screen 7: Settings Screen

### Purpose
Clean configuration. Let users customize their experience without overwhelming them.

### Mobbin Search Terms
- "settings screen minimal"
- "app preferences UI"
- "account settings dark"
- "subscription settings"

### Reference Apps to Study
Linear settings, Raycast preferences, Things 3 settings, Arc browser settings

### Sections
**Timer Settings** — work duration, break duration, long break duration, sessions before long break, auto-start breaks toggle, auto-start next session toggle

**Sound Settings** — default vibe, ambient volume, timer chime sound selector, chime volume

**Appearance** — theme selector (4 options shown as color swatches), reduce motion toggle

**Notifications** — session end notification, daily reminder time, weekly summary email toggle

**Account** — name, email, change password, connected Google account

**Subscription** — current plan, upgrade/manage button, billing portal link

### Key Design Decisions
- Grouped sections with clear headings and subtle dividers
- Toggle switches use vibe accent color when on
- No save button — changes apply instantly with subtle confirmation toast
- Danger zone (delete account) at bottom, behind a confirmation flow

### Prompt for Claude Code
> Build a settings screen for FlowSpace. Grouped sections with dividers: Timer, Sound, Appearance, Notifications, Account, Subscription. Instant-apply toggles in amber accent color. Theme selector shown as 4 colored circle swatches. Clean list rows with labels left and controls right. Dark theme. Subtle toast notification on setting change. Minimal, no visual clutter.

---

## Screen 8: Auth Screens (Sign Up / Login)

### Purpose
Frictionless entry. Get users in as fast as possible. Google OAuth is the hero option.

### Mobbin Search Terms
- "login screen minimal dark"
- "sign up page clean"
- "oauth login UI"
- "auth screen app"

### Reference Apps to Study
Linear login, Vercel login, Raycast, Loom sign in

### Layout Structure
```
[Center card on dark background]
[FlowSpace logo + tagline]
[Primary CTA — "Continue with Google" (large, prominent)]
[Divider — "or"]
[Email input + Password input]
[Secondary CTA — "Sign In" / "Create Account"]
[Bottom — toggle between Sign In and Sign Up]
```

### Key Design Decisions
- Authentication handled by **Clerk** — use Clerk's pre-built components styled to match FlowSpace theme
- Google OAuth button is 80% of the auth action — make it unmissable
- No username field — email only
- Minimal card design — no heavy shadows or borders
- Background shows blurred version of the main focus screen — reminds user what they're signing up for
- Clerk handles all error states, password reset, and session management out of the box

### Prompt for Claude Code
> Build a centered auth card for FlowSpace on a dark blurred background showing the focus screen. Google OAuth button prominent at top. Email/password fields below a divider. Toggle between sign in and sign up modes. Dark card with subtle border. FlowSpace logo at top. Vibe accent color on focus states and primary button. Clean error state styling.

---

## Screen 9: Google Workspace Sidebar — Home

### Purpose
Compact entry point inside Google Docs/Sheets. Must work in a narrow sidebar (300px wide). Everything above the fold.

### Mobbin Search Terms
- "sidebar UI compact"
- "panel widget minimal"
- "compact timer widget"
- "google docs addon UI"

### Reference Apps to Study
Grammarly sidebar, Notion Web Clipper, Google Keep sidebar

### Layout Structure (300px wide, scrollable)
```
[FlowSpace logo — small, top left]
[Vibe selector — 4 small icon buttons in a row]
[Timer display — large numbers, compact ring]
[Task input — "What are you working on?"]
[Start button — full width, accent color]
[Session count — "2 sessions today"]
[Link — "Open full app →"]
```

### Key Design Decisions
- Everything fits in 400px height without scrolling
- Font sizes smaller than web app but still readable
- Vibe icons are 32x32px — tap targets large enough
- Timer numbers are the biggest element — clear at a glance
- "Open full app" link always visible — drives users to web app for Pro features
- No animations heavier than simple CSS transitions — sidebar performance matters

### Prompt for Claude Code
> Build a Google Workspace sidebar UI for FlowSpace (300px wide). Compact layout with 4 vibe icon buttons, a small circular timer with large countdown numbers, a task input field, and a full-width start button. Session count below. Link to open full app at bottom. Dark theme matching main app. Must fit in 400px height without scrolling. Optimized for narrow sidebar constraints.

---

## Screen 10: Google Workspace Sidebar — Active Session

### Purpose
Show the running timer while user works in Google Docs. Minimal — just what they need to stay aware of the timer.

### Layout Structure
```
[Small circular ring — depleting as time passes]
[Large countdown numbers]
[Current task name — truncated if long]
[Pause button + End Session button — side by side]
[Music vibe indicator — small icon showing active vibe]
```

### Prompt for Claude Code
> Build the active session state of the FlowSpace Google Workspace sidebar. Compact circular timer ring with countdown. Current task name below (truncated with ellipsis if long). Pause and End Session buttons side by side. Active vibe icon indicator. Dark theme. Smooth ring animation. 300px wide constraint.

---

## Screen 11: Google Workspace Sidebar — Break

### Purpose
Quick AI check-in during break without leaving Google Docs.

### Layout Structure
```
[Break timer countdown — smaller than focus timer]
[AI check-in — "Did you finish [task]?"]
[Yes / No buttons]
[Next task input]
[Resume button]
```

### Prompt for Claude Code
> Build the break state of the FlowSpace Google Workspace sidebar. Smaller break timer countdown. AI check-in question with Yes/No buttons. Next task input field. Resume button. Compact, fits in 400px. Dark theme.

---

## Screen 12: Chrome Extension Popup

### Purpose
Ultra-minimal quick access to timer without opening the full app. 3 elements maximum.

### Mobbin Search Terms
- "chrome extension popup UI"
- "browser extension minimal"
- "popup timer widget"

### Layout Structure (360px wide popup)
```
[FlowSpace logo — tiny]
[Large countdown or "Ready to focus?"]
[Current task — one line]
[Start / Pause button — full width]
[Link — "Open FlowSpace →"]
```

### Key Design Decisions
- Popup width: 360px, height: 280px max
- Everything is touch/click friendly — large tap targets
- If no session running: shows motivating prompt + start button
- If session running: shows countdown + pause button
- Opens full web app on logo click

### Prompt for Claude Code
> Build a Chrome extension popup for FlowSpace. 360x280px. Shows either start state (motivating prompt + start button) or active state (countdown timer + pause button). Current task name. Link to open full web app. Ultra minimal dark design. No unnecessary elements.

---

## Screen 13: Focus Mode Overlay (Chrome Extension)

### Purpose
Gentle reminder shown on distracting/blocked sites during a focus session. Not aggressive — supportive.

### Layout Structure
```
[Centered overlay card on blurred site background]
[FlowSpace logo]
["You're in focus mode" heading]
[Current task reminder]
[Time remaining in session]
[Two options: "Go Back" (primary) + "I need this site" (secondary, smaller)]
```

### Key Design Decisions
- Background blurs but doesn't fully block — not a hard wall
- Tone is supportive not shame-based — "You're almost there" energy
- "I need this site" is always available — never trap the user
- Timer shows urgency — "12 minutes left, you've got this"

### Prompt for Claude Code
> Build a Chrome extension focus mode overlay for FlowSpace. Appears on blocked sites during focus sessions. Centered card on blurred background. Shows current task and time remaining. Primary "Go Back" button and secondary "I need this site" link. Warm, supportive tone. Dark card with soft glow. Vibe accent color on primary button.

---

## Mobbin Research Checklist

Use this checklist when searching Mobbin. Screenshot anything that inspires you for each screen.

- [ ] Landing page hero sections (dark, productivity apps)
- [ ] Onboarding step flows (3-step setups)
- [ ] Circular timer / countdown UI
- [ ] Music player vibes / mood selectors
- [ ] Break / completion screens
- [ ] Task list minimal dark
- [ ] Streak calendar / habit tracker stats
- [ ] Productivity dashboard cards
- [ ] Settings screens minimal
- [ ] Auth screens with OAuth
- [ ] Sidebar / panel compact UI
- [ ] Chrome extension popups
- [ ] Overlay / modal focus screens

---

## Handoff Notes for Claude Code

When building each screen, always include these in your prompt:

1. **Dark theme** — background #0D0D0D to #1A1A1A range, never pure black
2. **Dynamic vibe color** — pass active vibe as a CSS variable `--vibe-accent`
3. **Grain texture** — subtle SVG noise filter overlay on background
4. **Font stack** — Clash Display (headings) + Geist (body) + DM Mono (timer numbers)
5. **Motion** — Framer Motion for React components, CSS transitions for sidebar/extension
6. **Responsive** — web app mobile-first, sidebar fixed 300px, extension fixed 360px
7. **Accessibility** — sufficient contrast ratios, focus states on all interactive elements
8. **Auth** — use Clerk components, customize with `appearance` prop to match FlowSpace theme
9. **Database** — Neon PostgreSQL via Drizzle ORM or Prisma for type-safe queries
10. **User sync** — Clerk webhook syncs user to Neon on signup automatically

---

*Document created: February 2026*
*Built with Claude Code | Powered by Royale Automation*
