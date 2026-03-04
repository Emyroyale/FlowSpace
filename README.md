# FlowSpace 🎧⏱️

> Your focused workspace. No ads, no distractions, just flow.

FlowSpace is an immersive, dark-mode-first productivity web application that combines a Pomodoro timer with dynamic ambient music vibes. Built to help users enter deep focus states, the app's entire UI and color palette shift to match the active music vibe. 

## ✨ Key Features

*   **Dynamic Theme Vibe Sets:** Choose from 4 ambient soundscapes (Lofi Hip Hop, Rain & Nature, Coffee Shop, Binaural Beats). The entire app's color scheme and particle animations adapt immediately to the selected vibe.
*   **Immersive Focus Timer:** Large, distraction-free circular timer with smooth SVG animations that dominates the screen to keep you on track.
*   **Task Commitment:** Assign specific tasks to your focus sessions so you never lose track of your goal.
*   **AI Break Check-ins:** At the end of a session, a light AI interaction asks if you finished your task and helps clear mental hurdles before your next phase.
*   **Detailed Analytics (Stats):** Track your productivity patterns over time natively with a GitHub-style streak calendar, session charts, and vibe completion rates.
*   **Secure Authentication:** Frictionless sign-up and login securely managed by Clerk.
*   **Premium Memberships:** Integrated with Stripe for users demanding unlocking the full suite of Timer presets and unlimited focus.

## 🛠️ Tech Stack

FlowSpace is built with a modern "T3-style" web stack, prioritizing performance, type safety, and rapid development:

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **UI / Styling:** [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
*   **Database / ORM:** [Prisma](https://www.prisma.io/) connecting to PostgreSQL
*   **Authentication:** [Clerk](https://clerk.com/)
*   **Payments:** [Stripe](https://stripe.com/)
*   **Audio Engine:** [Howler.js](https://howlerjs.com/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

To run FlowSpace locally on your machine, follow these steps:

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm or yarn
*   A PostgreSQL Database string (e.g., Neon or Supabase)
*   Clerk and Stripe API keys

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Emyroyale/FlowSpace.git
    cd FlowSpace
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add your keys (refer to `.env.example` if available). You will need:
    *   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY`
    *   `DATABASE_URL` 
    *   `STRIPE_SECRET_KEY` & `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
    *   `STRIPE_WEBHOOK_SECRET`

4.  **Initialize the database:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

6.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see FlowSpace in action.

## 🎨 Design Philosophy
The aesthetic direction is **Immersive Minimal Dark**. Emphasizing deep charcoal backgrounds (no pure black), dynamic theming, generous negative space, and organic grain overlays. We believe productivity apps don't have to feel like sterile hospital rooms. 

For full design specifications, refer to the [DESIGN_BRIEF.md](./DESIGN_BRIEF.md).

## 📄 License
This project is proprietary and confidential. unauthorized copying of any files, via any medium is strictly prohibited.
