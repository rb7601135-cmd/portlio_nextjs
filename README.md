# BILAL.DEV — Premium 3D Developer Portfolio

A bespoke, production-ready personal developer portfolio built with **Next.js App Router, TypeScript, Tailwind CSS, GSAP, Three.js, React Three Fiber, and @react-three/drei**.

---

**Live Production URL**: [https://portlionextjs.vercel.app](https://portlionextjs.vercel.app)

---
## 🎨 Creative & Visual Identity

- **Theme**: Deep obsidian black (`#070709`) background with warm white (`#f5f5f0`) text and electric lime green (`#ccff00`) accents.
- **Typography**: Oversized editorial headings with high-contrast hierarchy, clean sans-serif body copy, and monospaced technical badges.
- **Layout**: Architectural blueprint grid accents, generous whitespace, asymmetric compositions, and cinematic line-by-line transitions.
- **3D Hero Object**: Physically-based metallic sculptural orb with studio-style multi-point lighting (including lime rim light), idle floating dynamics, pointer-tracking inertia, and an accessible CSS fallback for reduced motion / non-WebGL devices.

---

## 🚀 Key Features & Sections

1. **Navigation (`Navbar.tsx`)**:
   - Fixed responsive header with `BILAL.DEV` logo and active pulse status indicator.
   - Smooth navigation links (`Home`, `About`, `Work`, `Skills`, `Journey`, `Contact`).
   - Magnetic "Let's Talk" CTA button with pointer-following physics.
   - Mobile navigation menu drawer with staggered entrance animations.

2. **Hero (`Hero.tsx`)**:
   - Eyebrow: `SOFTWARE ENGINEERING · CREATIVE DEVELOPMENT`.
   - Headline: `"I BUILD DIGITAL EXPERIENCES THAT FEEL DIFFERENT."` (Split into line-by-line GSAP entrance).
   - Supporting text: `"I'm a developer exploring the intersection of full-stack engineering, AI, and interactive 3D experiences. I turn ideas into fast, functional, and memorable digital products."`
   - Primary CTA: `EXPLORE MY WORK` & Secondary CTA: `LET'S TALK`.
   - Small editable availability label and dynamic scroll indicator.
   - Interactive 3D chrome orb (`Scene3D.tsx`, `ChromeOrb.tsx`).

3. **About (`About.tsx`)**:
   - Headline: `"CURIOUS BY NATURE. BUILT TO CREATE."`
   - Editorial two-column layout with verified developer photo avatar (`/avatar.jpg`), education details, and key engineering pillars.

4. **Selected Work (`Projects.tsx`, `ProjectCard.tsx`, `src/data/projects.ts`)**:
   - Headline: `"SELECTED WORK. REAL EXPERIMENTS."`
   - Reusable project cards driven by `src/data/projects.ts`:
     1. **Al Wazir Wholesale** — E-Commerce / Storefront Architecture (React, Next.js, CSS).
     2. **Weather Dashboard** — Responsive weather interface (Next.js, TypeScript, Weather API).
     3. **AI Gesture Control** — Computer vision HCI experiment (Python, OpenCV, MediaPipe).
     4. **Full-Stack Web Application** — Database-backed system (Next.js, TypeScript, SQL).
   - Clear status indicators for configurable demo and repository links (no fabricated URLs).

5. **Skills (`Skills.tsx`, `src/data/skills.ts`)**:
   - Headline: `"TOOLS I USE TO MAKE THINGS WORK."`
   - 4 technical categories:
     - **Frontend**: HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind CSS.
     - **Motion and 3D**: GSAP, ScrollTrigger, Three.js, React Three Fiber, @react-three/drei.
     - **Backend**: Python, Django, REST APIs, Node.js.
     - **Data and tools**: SQL, Git, GitHub, VS Code.
   - Transparently structured without arbitrary proficiency percentages.

6. **Journey (`Journey.tsx`, `src/data/journey.ts`)**:
   - Headline: `"ALWAYS LEARNING. ALWAYS BUILDING."`
   - Clean animated timeline with ScrollTrigger-drawn connecting line.
   - Covers BS Software Engineering (Minhaj University Lahore), ADP in Software Engineering, and interactive labs.

7. **Contact (`Contact.tsx`, `src/app/api/contact/route.ts`)**:
   - Headline: `"HAVE AN IDEA? LET'S BUILD IT."`
   - Validated contact form with name, email, and message fields, client-side validation, loading spinner, and success/error states.
   - Integrated API route (`/api/contact`) supporting external webhooks or Resend API via `.env.example`.
   - Direct links for email, GitHub, LinkedIn, and CV.

8. **Footer (`Footer.tsx`)**:
   - `"DESIGNED WITH CURIOSITY. BUILT WITH CODE."`
   - Dynamic year, back-to-top smooth scroll, and social links.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP 3 + ScrollTrigger
- **3D Graphics**: Three.js, React Three Fiber, @react-three/drei
- **Icons**: Lucide React + custom SVG brand icons

---

## 💻 Running Locally

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## ⚙️ Environment Variables (Optional)

Create a `.env.local` file from `.env.example`:

```bash
# Forward submissions to Resend (https://resend.com)
RESEND_API_KEY=re_your_api_key_here
CONTACT_RECEIVER_EMAIL=rb7601135@gmail.com

# Or forward to a Webhook (Slack / Discord / Zapier)
CONTACT_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

If neither is specified, contact submissions are logged safely on the server and prompt visitors with direct contact links.

---

## 🚢 Deployment

The portfolio can be deployed seamlessly to Vercel, Netlify, or any Node.js hosting platform:

1. Push the code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete premium 3D portfolio"
   git push origin main
   ```
2. Import the repository in [Vercel](https://vercel.com).
3. Framework preset will automatically detect **Next.js**.
4. Click **Deploy**.
