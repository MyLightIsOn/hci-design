# HCI Design Lab — Full Site Redesign + Blog

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the HCI Design Lab Next.js app to match the four HTML prototypes — homepage, projects grid, lab notes index, and lab notes post — with a fully working MDX blog.

**Architecture:** Next.js 15 App Router with CSS-variable design system (no Tailwind in JSX). MDX posts live in `content/lab-notes/*.mdx`, parsed by `gray-matter` and rendered by `next-mdx-remote/rsc`. Filter bars are isolated Client Components; all pages are Server Components by default.

**Tech Stack:** Next.js 15, React 19, next-mdx-remote, gray-matter, Google Fonts (Playfair Display + DM Sans), CSS variables

---

## Design tokens (reference throughout)

```
--bg:           #F5F2EB   warm parchment background
--ink:          #1A1917   near-black text
--ink-muted:    #3D3B37   dark body text
--ink-dim:      #5C5A56   secondary text
--ink-ghost:    #9B9891   metadata / labels
--accent:       #C4521A   burnt orange
--accent-dark:  #7A3A12   dark orange (tags)
--accent-bg:    rgba(196,82,26,0.1)  tag background
--surface:      #EFECE4   card background
--border:       rgba(26,25,23,0.15)
--border-light: rgba(26,25,23,0.12)

--font-serif:   var(--font-playfair)  Playfair Display
--font-sans:    var(--font-dm-sans)   DM Sans
```

---

## Task 1: Install dependencies

**Files:**
- Modify: `package.json` (via pnpm)

**Step 1: Install packages**

```bash
cd /Users/lawrence/dev/hci-design
pnpm add gray-matter next-mdx-remote
```

Expected: packages added to `dependencies` in package.json.

**Step 2: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add gray-matter and next-mdx-remote"
```

---

## Task 2: Design system — globals.css + layout.js

Replace the default styles and layout with the HCI design system.

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.js`

**Step 1: Replace globals.css**

```css
/* app/globals.css */
@import "tailwindcss";

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

:root {
  --bg:           #F5F2EB;
  --ink:          #1A1917;
  --ink-muted:    #3D3B37;
  --ink-dim:      #5C5A56;
  --ink-ghost:    #9B9891;
  --accent:       #C4521A;
  --accent-dark:  #7A3A12;
  --accent-bg:    rgba(196,82,26,0.1);
  --surface:      #EFECE4;
  --border:       rgba(26,25,23,0.15);
  --border-light: rgba(26,25,23,0.12);
  --font-serif:   'Playfair Display', Georgia, serif;
  --font-sans:    'DM Sans', sans-serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { font-size: 14px; }

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-sans);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }

/* Scroll reveal */
.scroll-reveal {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Fade-up (hero) */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up {
  opacity: 0;
  animation: fadeUp 0.7s ease forwards;
}
```

**Step 2: Replace layout.js**

```js
// app/layout.js
import "./globals.css";

export const metadata = {
  title: "HCI Design Lab",
  description: "Human AI Creative Studio — Reno, NV",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**Step 3: Verify dev server starts without errors**

```bash
pnpm dev
```

Expected: server starts on localhost:3000 with warm background color visible.

**Step 4: Commit**

```bash
git add app/globals.css app/layout.js
git commit -m "feat: add HCI design system tokens and base styles"
```

---

## Task 3: Shared components — Nav + Footer

**Files:**
- Create: `components/Nav.js`
- Create: `components/Footer.js`

**Step 1: Create Nav.js**

```jsx
// components/Nav.js
import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav({ active }) {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>HCI Design Lab</Link>
      <ul className={styles.links}>
        <li><Link href="/work" className={active === "work" ? styles.active : ""}>Work</Link></li>
        <li><Link href="/#services" className={active === "services" ? styles.active : ""}>Services</Link></li>
        <li><Link href="/lab-notes" className={active === "lab-notes" ? styles.active : ""}>Lab Notes</Link></li>
        <li><Link href="/#contact" className={active === "contact" ? styles.active : ""}>Contact</Link></li>
      </ul>
    </nav>
  );
}
```

**Step 2: Create Nav.module.css**

```css
/* components/Nav.module.css */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 36px;
  border-bottom: 0.5px solid var(--border);
}

.logo {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink);
}

.links {
  display: flex;
  gap: 28px;
  list-style: none;
}

.links a {
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-dim);
  transition: color 0.15s;
}

.links a:hover,
.links a.active,
.active {
  color: var(--accent);
}
```

**Step 3: Create Footer.js**

```jsx
// components/Footer.js
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.copy}>© HCI Design Lab 2026 — Reno, NV</span>
      <a href="mailto:hello@hcidesignlab.com" className={styles.email}>
        hello@hcidesignlab.com
      </a>
    </footer>
  );
}
```

**Step 4: Create Footer.module.css**

```css
/* components/Footer.module.css */
.footer {
  padding: 28px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 0.5px solid var(--border);
}

.copy { font-size: 12px; color: var(--ink-ghost); }

.email {
  font-size: 12px;
  color: var(--ink-dim);
  border-bottom: 0.5px solid rgba(196,82,26,0.4);
  padding-bottom: 1px;
}
.email:hover { color: var(--accent); }
```

**Step 5: Commit**

```bash
git add components/
git commit -m "feat: add Nav and Footer shared components"
```

---

## Task 4: ScrollReveal client component

The scroll-reveal animation requires an IntersectionObserver, which needs `"use client"`.

**Files:**
- Create: `components/ScrollReveal.js`

**Step 1: Create ScrollReveal.js**

```jsx
// components/ScrollReveal.js
"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/ScrollReveal.js
git commit -m "feat: add ScrollReveal client component"
```

---

## Task 5: lib/posts.js — MDX file reader

**Files:**
- Create: `lib/posts.js`
- Create: `content/lab-notes/` (directory)

**Step 1: Create lib/posts.js**

```js
// lib/posts.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/lab-notes");

export function getAllPosts() {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
      const { data } = matter(raw);
      return data;
    })
    .sort((a, b) => Number(a.issue) - Number(b.issue));
}

export function getPostBySlug(slug) {
  const filepath = path.join(postsDir, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data, content };
}

export function getAdjacentPosts(issue) {
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.issue === issue);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
```

**Step 2: Create the content directory**

```bash
mkdir -p /Users/lawrence/dev/hci-design/content/lab-notes
```

**Step 3: Commit**

```bash
git add lib/posts.js content/
git commit -m "feat: add posts utility and content directory"
```

---

## Task 6: Sample MDX content (3 posts)

**Files:**
- Create: `content/lab-notes/a11y-logger.mdx`
- Create: `content/lab-notes/interface-is-the-argument.mdx`
- Create: `content/lab-notes/trust-debt.mdx`

**Step 1: Create a11y-logger.mdx**

```mdx
---
title: "Designing AI that sees what humans miss: the a11y Logger"
slug: "a11y-logger"
issue: "001"
date: "2026-06-01"
tags: ["Case Study", "Accessibility", "AI Design"]
readTime: "12 min read"
lede: "Accessibility issues are invisibly logged manually. What happens when you give teams an AI system that detects, categorizes, and summarizes them automatically — and then actually study whether it works?"
---

## The problem with manual accessibility logging

During my time as product manager at an agency, I consistently ran into the friction of accessibility. The work itself wasn't difficult — but the logging was. Testers would flag the same issues repeatedly across products, creating redundant reports that were hard to triage, harder to act on, and nearly impossible to share meaningfully across teams.

Accessibility reports tend to accumulate for non-technical stakeholders. They often require extra interpretation to be actionable. The real cost isn't finding issues — it's communicating them in a way that drives remediation.

> The best accessibility tools don't make experts faster. They make their expertise legible to everyone else in the room.

## A multi-agent workflow, not a single model

The core insight was that accessibility logging isn't one problem — it's three sequential ones: detection, enrichment, and communication. Building a single model to do all three collapses distinctions that matter.

Three agents handle the core work. Issue Refinement expands titles and descriptions, suggests task-level fixes, and flags issues for technical and non-technical audiences. Report Generation produces an executive summary with a separate analytics summary. A Reduce/Merge agent consolidates duplicate issues across test runs — the hardest part of any multi-session accessibility audit.

## Does it actually work? What 20 participants told us

Rather than ship and hope, I ran a moderated usability study with 20 participants split across two cohorts: accessibility professionals with 10+ years of experience, and developers currently working on accessibility projects.

**84%** of participants rated AI-generated issue descriptions as accurate or better than their own manual notes.

**−24%** median reduction in time to log a difficulty-tier issue compared to the manual baseline.

**+5%** accuracy improvement on AI-assisted issue descriptions versus manual logging alone.

## What this means for AI-assisted design tooling

The a11y Logger is lean and opinionated. It doesn't try to replace expert judgment — it tries to remove the tax on it. The most important design decision wasn't a UI choice or a model choice. It was the decision to keep humans in the loop at every critical handoff.

The system is now being used across test campaigns. Next: exploring real-time detection during live user sessions.
```

**Step 2: Create interface-is-the-argument.mdx**

```mdx
---
title: "The interface is the argument: why AI design is always a position"
slug: "interface-is-the-argument"
issue: "002"
date: "2026-05-01"
tags: ["Essay", "AI Design"]
readTime: "8 min read"
lede: "Every design decision in an AI product is a claim about what matters — and most teams never acknowledge they're making one."
---

## Design is not neutral

When a team decides that an AI assistant should always explain its reasoning, they've taken a position on transparency. When they decide it shouldn't, they've taken a different position — usually without saying so out loud.

The interface is the argument. Every layout, every label, every default carries an assumption about what users need, what they can handle, and what the product values. In AI products, where the underlying system is opaque and the outputs are probabilistic, those design decisions carry even more weight.

> Every design decision in an AI product is a claim about what matters — and most teams never acknowledge they're making one.

## The invisible positions

Most teams are not deliberately hiding their positions. They're just not surfacing them. The decisions get made in sprint planning and design reviews, framed as "what works" rather than "what we believe."

This creates a particular failure mode: an AI product that has a strong implicit argument but no explicit one. Users sense the position without being able to name it. Trust erodes without a clear reason.

## Making the argument explicit

The fix isn't more disclosure copy or longer onboarding flows. It's earlier, more honest design conversations. Before asking "how should this look?" ask "what are we claiming here?"

When you design an AI product with a conscious argument, you can defend it. You can update it. You can be wrong about it in a useful way.
```

**Step 3: Create trust-debt.mdx**

```mdx
---
title: "Trust debt: how AI products borrow from users and rarely pay back"
slug: "trust-debt"
issue: "003"
date: "2026-04-01"
tags: ["Essay", "AI Design"]
readTime: "10 min read"
lede: "We are building on borrowed confidence. The question isn't whether users trust AI — it's whether the systems deserve it."
---

## The opening balance

When a user first encounters an AI product, they bring trust with them. Not trust in this specific system — trust in technology generally, in the brand, in the category. That trust is a loan.

Most AI products spend that loan immediately and spend it fast. Confident tone. Clean UI. Smooth onboarding. The experience signals competence before it has demonstrated any.

> We are building on borrowed confidence.

## How debt accumulates

Trust debt accumulates when a system overpromises and underdelivers — not dramatically, but incrementally. The AI that was "always available" fails during a critical moment. The "personalized" recommendation is obviously generic. The confidence score was meaningless.

Each small failure withdraws from an account the product never built.

## The repayment problem

Unlike financial debt, trust debt compounds non-linearly. Users don't add up small failures mathematically — they update their mental model. Once the model shifts from "reliable" to "unreliable," individual successes don't restore it. They become exceptions.

## Designing for trust accrual

The alternative is to treat trust as something earned incrementally. Ship with narrower claims. Surface uncertainty honestly. Make it easy for users to understand what the system can and cannot do.

This is harder. It means saying "this might not work" before the user finds out the hard way. But it's the only way to build the kind of trust that compounds in your favor.
```

**Step 4: Commit**

```bash
git add content/lab-notes/
git commit -m "feat: add three sample lab notes MDX posts"
```

---

## Task 7: lib/projects.js — projects data

Rather than hardcode in the page, keep project data in one place.

**Files:**
- Create: `lib/projects.js`

**Step 1: Create lib/projects.js**

```js
// lib/projects.js
export const projects = [
  {
    slug: "a11y-logger",
    title: "a11y Logger",
    description:
      "An AI-powered accessibility issue tracker that detects, enriches, and consolidates audit findings — reducing logging time by 24% across a 20-person usability study.",
    type: "AI Tool",
    year: "2026",
    tags: ["AI", "Accessibility", "Full Stack"],
    role: "Designer & Developer",
    featured: true,
  },
  {
    slug: "conversational-ai-onboarding",
    title: "Conversational AI Onboarding Study",
    description:
      "How first-time users form mental models of AI assistants — and where those models break down.",
    type: "UX Research",
    year: "2025",
    tags: ["AI", "UX Research"],
    featured: false,
  },
  {
    slug: "prototype-velocity-dashboard",
    title: "Prototype Velocity Dashboard",
    description:
      "An internal tool for tracking AI-assisted prototype iteration cycles and surfacing bottlenecks in the design-to-test pipeline.",
    type: "AI Tool",
    year: "2025",
    tags: ["AI", "Full Stack"],
    featured: false,
  },
  {
    slug: "wcag-audit-framework",
    title: "WCAG Audit Framework for AI Interfaces",
    description:
      "A systematic audit methodology for evaluating AI-generated UI against WCAG 2.2 — built for dynamic content and assistive technology edge cases.",
    type: "Accessibility",
    year: "2024",
    tags: ["Accessibility", "UX Research"],
    featured: false,
  },
  {
    slug: "inclusive-design-workshop",
    title: "Inclusive Design Enablement Workshop",
    description:
      "A hands-on curriculum for non-technical product teams covering accessibility principles, AI ethics, and practical inclusive design patterns.",
    type: "Workshop",
    year: "2024",
    tags: ["Accessibility", "AI"],
    featured: false,
  },
];
```

**Step 2: Commit**

```bash
git add lib/projects.js
git commit -m "feat: add projects data"
```

---

## Task 8: FilterBar client component

Used on both the Work page and Lab Notes index. Isolating this keeps pages as Server Components.

**Files:**
- Create: `components/FilterBar.js`
- Create: `components/FilterBar.module.css`

**Step 1: Create FilterBar.js**

```jsx
// components/FilterBar.js
"use client";

import { useState } from "react";
import styles from "./FilterBar.module.css";

export default function FilterBar({ filters, onFilter }) {
  const [active, setActive] = useState("All");

  function handleClick(label) {
    setActive(label);
    onFilter(label);
  }

  return (
    <div className={styles.bar}>
      <span className={styles.label}>Filter</span>
      {["All", ...filters].map((f) => (
        <button
          key={f}
          className={`${styles.btn} ${active === f ? styles.active : ""}`}
          onClick={() => handleClick(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
```

**Step 2: Create FilterBar.module.css**

```css
/* components/FilterBar.module.css */
.bar {
  padding: 16px 36px;
  border-bottom: 0.5px solid var(--border);
  display: flex;
  gap: 6px;
  align-items: center;
}

.label {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-ghost);
  margin-right: 8px;
}

.btn {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-dim);
  background: none;
  border: 0.5px solid rgba(26,25,23,0.2);
  border-radius: 2px;
  padding: 5px 12px;
  cursor: pointer;
  font-family: var(--font-sans);
  transition: all 0.15s;
}

.btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.btn.active {
  background: var(--ink);
  color: var(--bg);
  border-color: var(--ink);
}
```

**Step 3: Commit**

```bash
git add components/FilterBar.js components/FilterBar.module.css
git commit -m "feat: add FilterBar client component"
```

---

## Task 9: Homepage (app/page.js)

**Files:**
- Modify: `app/page.js`
- Create: `app/page.module.css`

**Step 1: Create app/page.module.css** (homepage styles)

```css
/* app/page.module.css */

/* Hero */
.hero {
  padding: 64px 36px 56px;
  border-bottom: 0.5px solid var(--border);
}
.eyebrow {
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 20px;
  animation: fadeUp 0.6s ease 0.1s forwards;
  opacity: 0;
}
.heroTitle {
  font-family: var(--font-serif);
  font-size: 68px;
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin: 0 0 8px;
  animation: fadeUp 0.7s ease 0.25s forwards;
  opacity: 0;
}
.heroTitle em { font-style: italic; font-weight: 400; color: var(--ink-muted); }
.dot { color: var(--accent); }
.heroSub {
  font-size: 16px;
  font-weight: 300;
  color: var(--ink-dim);
  margin: 20px 0 36px;
  max-width: 420px;
  line-height: 1.65;
  animation: fadeUp 0.7s ease 0.4s forwards;
  opacity: 0;
}
.heroCta {
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink);
  border-bottom: 1px solid var(--accent);
  padding-bottom: 2px;
  animation: fadeUp 0.7s ease 0.52s forwards;
  opacity: 0;
}

/* Section wrapper */
.section {
  padding: 52px 36px;
  border-bottom: 0.5px solid var(--border);
}
.sectionLabel {
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-ghost);
  margin-bottom: 36px;
}

/* Services grid */
.services {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}
.service {
  padding: 24px 24px 24px 0;
  border-top: 0.5px solid var(--border);
}
.service:nth-child(2n) {
  padding-left: 24px;
  padding-right: 0;
  border-left: 0.5px solid var(--border);
}
.service:nth-child(3),
.service:nth-child(4) {
  border-bottom: none;
  padding-bottom: 0;
}
.serviceNum {
  font-size: 11px;
  color: var(--accent);
  font-weight: 400;
  margin-bottom: 12px;
  letter-spacing: 0.08em;
}
.serviceTitle {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 400;
  color: var(--ink);
  margin: 0 0 10px;
  line-height: 1.25;
}
.serviceBody {
  font-size: 13px;
  color: var(--ink-dim);
  line-height: 1.6;
}

/* About */
.about {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 48px;
  align-items: start;
}
.aboutLabel {
  font-family: var(--font-serif);
  font-size: 36px;
  font-weight: 400;
  font-style: italic;
  line-height: 1.1;
  color: var(--ink);
}
.aboutBody {
  font-size: 14px;
  color: var(--ink-muted);
  line-height: 1.75;
}

/* Work section */
.workHeader {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 28px;
}
.seeAll {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-dim);
  border-bottom: 0.5px solid rgba(196,82,26,0.4);
  padding-bottom: 1px;
}
.workGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.workCard {
  border-radius: 6px;
  overflow: hidden;
  border: 0.5px solid var(--border-light);
  background: var(--surface);
  cursor: pointer;
  transition: border-color 0.15s;
}
.workCard:hover { border-color: rgba(196,82,26,0.4); }
.workCard:hover .workCardTitle { color: var(--accent); }
.workThumb {
  height: 110px;
  background: var(--ink);
  position: relative;
  overflow: hidden;
}
.thumbPattern {
  position: absolute;
  inset: 0;
  opacity: 0.07;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(245,242,235,0.8) 20px, rgba(245,242,235,0.8) 21px),
    repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(245,242,235,0.8) 20px, rgba(245,242,235,0.8) 21px);
}
.thumbOverlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,9,8,0.65) 0%, transparent 70%);
}
.thumbType {
  position: absolute;
  top: 10px;
  left: 12px;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(245,242,235,0.55);
  border: 0.5px solid rgba(245,242,235,0.18);
  padding: 2px 7px;
  border-radius: 2px;
}
.workCardBody { padding: 14px 16px 16px; }
.workCardTitle {
  font-family: var(--font-serif);
  font-size: 15px;
  font-weight: 400;
  color: var(--ink);
  margin: 0 0 8px;
  line-height: 1.3;
  transition: color 0.15s;
}
.workCardTags { display: flex; gap: 5px; flex-wrap: wrap; }
.workTag {
  font-size: 10px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--accent-dark);
  background: var(--accent-bg);
  padding: 2px 7px;
  border-radius: 2px;
}

/* Lab Notes preview */
.notesHeader {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}
.notesTagline {
  font-size: 12px;
  color: var(--ink-ghost);
  font-style: italic;
  margin-bottom: 32px;
}
.blogPost {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 24px;
  padding: 22px 0;
  border-top: 0.5px solid var(--border);
  align-items: start;
  cursor: pointer;
}
.blogPost:hover .blogTitle { color: var(--accent); }
.blogMeta {
  font-size: 11px;
  color: var(--ink-ghost);
  letter-spacing: 0.06em;
  line-height: 1.6;
  padding-top: 3px;
}
.blogIssue {
  font-size: 11px;
  color: var(--accent);
  letter-spacing: 0.08em;
  display: block;
  margin-bottom: 2px;
}
.blogTitle {
  font-family: var(--font-serif);
  font-size: 17px;
  font-weight: 400;
  color: var(--ink);
  margin: 0 0 7px;
  line-height: 1.3;
  transition: color 0.15s;
}
.blogPull {
  font-size: 13px;
  color: var(--ink-dim);
  line-height: 1.55;
  font-style: italic;
}
```

**Step 2: Replace app/page.js**

```jsx
// app/page.js
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { getAllPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import styles from "./page.module.css";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const featuredProjects = projects.filter((p) => !p.featured).slice(0, 2);

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Human AI Creative Studio — Reno, NV</p>
        <h1 className={styles.heroTitle}>
          Human<span className={styles.dot}>.</span><br />
          <em>AI Experience</em><br />
          Design<span className={styles.dot}>.</span>
        </h1>
        <p className={styles.heroSub}>
          We design systems where artificial intelligence supports, augments, and adapts
          to human needs — creating intuitive, inclusive, and empowering interactions.
        </p>
        <Link href="/#services" className={styles.heroCta}>
          View our services
        </Link>
      </section>

      {/* Services */}
      <ScrollReveal>
        <section className={styles.section} id="services">
          <p className={styles.sectionLabel}>What we do</p>
          <div className={styles.services}>
            {[
              { num: "01", title: "Fast AI Prototyping", body: "Rapidly turn concepts into working prototypes. Test ideas with real users before investing in full-scale development." },
              { num: "02", title: "Human-Centered AI Design", body: "Interfaces that prioritize usability, trust, and inclusivity — AI tools that feel intuitive and supportive of real people's needs." },
              { num: "03", title: "Custom AI Solutions", body: "Tailored AI-driven tools, dashboards, and workflows that integrate seamlessly into your existing systems." },
              { num: "04", title: "AI Training + Enablement", body: "Workshops and hands-on guidance that demystify AI and empower your organization to lead confidently." },
            ].map((s) => (
              <div key={s.num} className={styles.service}>
                <p className={styles.serviceNum}>{s.num}</p>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceBody}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Selected Work */}
      <ScrollReveal>
        <section className={styles.section}>
          <div className={styles.workHeader}>
            <p className={styles.sectionLabel} style={{ marginBottom: 0 }}>Selected work</p>
            <Link href="/work" className={styles.seeAll}>See all projects</Link>
          </div>
          <div className={styles.workGrid}>
            {projects.slice(0, 2).map((p) => (
              <Link href={`/work`} key={p.slug} className={styles.workCard}>
                <div className={styles.workThumb}>
                  <div className={styles.thumbPattern} />
                  <div className={styles.thumbOverlay} />
                  <span className={styles.thumbType}>{p.type}</span>
                </div>
                <div className={styles.workCardBody}>
                  <h3 className={styles.workCardTitle}>{p.title}</h3>
                  <div className={styles.workCardTags}>
                    {p.tags.map((t) => <span key={t} className={styles.workTag}>{t}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* About */}
      <ScrollReveal>
        <section className={styles.section}>
          <div className={styles.about}>
            <div className={styles.aboutLabel}>What is<br />HCI?</div>
            <p className={styles.aboutBody}>
              Human-Computer Interaction is the study of how people engage with technology. At HCI Design Lab,
              we extend this to Human-AI experiences — designing systems where artificial intelligence supports,
              augments, and adapts to human needs, creating interactions that are intuitive, inclusive, and
              genuinely empowering.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Lab Notes Preview */}
      <ScrollReveal>
        <section className={styles.section}>
          <div className={styles.notesHeader}>
            <p className={styles.sectionLabel} style={{ marginBottom: 0 }}>Lab Notes</p>
            <Link href="/lab-notes" className={styles.seeAll}>See all</Link>
          </div>
          <p className={styles.notesTagline}>Observations, opinions, and dispatches from the work.</p>
          {posts.map((post) => (
            <Link href={`/lab-notes/${post.slug}`} key={post.slug} className={styles.blogPost}>
              <div className={styles.blogMeta}>
                <span className={styles.blogIssue}>No. {post.issue}</span>
                {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </div>
              <div>
                <h3 className={styles.blogTitle}>{post.title}</h3>
                <p className={styles.blogPull}>{post.lede}</p>
              </div>
            </Link>
          ))}
        </section>
      </ScrollReveal>

      <Footer />
    </>
  );
}
```

**Step 3: Verify homepage renders correctly**

```bash
pnpm dev
# Open http://localhost:3000
```

Expected: warm parchment background, Playfair Display headings, burnt orange accents, all 4 sections visible.

**Step 4: Commit**

```bash
git add app/page.js app/page.module.css
git commit -m "feat: implement homepage"
```

---

## Task 10: Work / Projects page

**Files:**
- Create: `app/work/page.js`
- Create: `app/work/page.module.css`
- Create: `app/work/ProjectsClient.js`

**Step 1: Create app/work/page.module.css**

```css
/* app/work/page.module.css */
.header {
  padding: 56px 36px 44px;
  border-bottom: 0.5px solid var(--border);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: end;
}
.eyebrow {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}
.title {
  font-family: var(--font-serif);
  font-size: 48px;
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: -0.01em;
  color: var(--ink);
}
.dot { color: var(--accent); }
.desc {
  font-size: 14px;
  font-weight: 300;
  color: var(--ink-dim);
  line-height: 1.7;
  margin-bottom: 20px;
}
.count { font-size: 12px; color: var(--ink-ghost); letter-spacing: 0.06em; }
.count span { color: var(--accent); font-weight: 500; }

/* Featured hero */
.heroWrap { padding: 36px 36px 0; }
.hero {
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  height: 320px;
  background: var(--ink);
  cursor: pointer;
}
.heroImg {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2C2A26 0%, #1A1917 50%, #0F0E0C 100%);
}
.heroPattern {
  position: absolute;
  inset: 0;
  opacity: 0.06;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 32px, rgba(245,242,235,0.8) 32px, rgba(245,242,235,0.8) 33px),
    repeating-linear-gradient(90deg, transparent, transparent 32px, rgba(245,242,235,0.8) 32px, rgba(245,242,235,0.8) 33px);
}
.heroOverlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,9,8,0.88) 0%, rgba(10,9,8,0.2) 55%, transparent 100%);
}
.heroContent {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px;
}
.heroBadge {
  display: inline-block;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #F5C89A;
  background: rgba(196,82,26,0.35);
  border: 0.5px solid rgba(196,82,26,0.5);
  padding: 4px 10px;
  border-radius: 2px;
  margin-bottom: 14px;
}
.heroTitle {
  font-family: var(--font-serif);
  font-size: 30px;
  font-weight: 700;
  color: var(--bg);
  margin: 0 0 10px;
  line-height: 1.15;
}
.heroDesc {
  font-size: 13px;
  color: rgba(245,242,235,0.7);
  line-height: 1.55;
  margin: 0 0 18px;
  max-width: 520px;
}
.heroMeta { display: flex; align-items: center; gap: 16px; }
.heroTags { display: flex; gap: 6px; }
.heroTag {
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(245,242,235,0.6);
  border: 0.5px solid rgba(245,242,235,0.2);
  padding: 3px 8px;
  border-radius: 2px;
}
.heroSep { color: rgba(245,242,235,0.2); font-size: 12px; }
.heroRole { font-size: 12px; color: rgba(245,242,235,0.45); }
.heroCta {
  position: absolute;
  top: 28px;
  right: 28px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--bg);
  border-bottom: 1px solid var(--accent);
  padding-bottom: 2px;
}

/* Project grid */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px 36px 36px;
}
.card {
  border-radius: 8px;
  overflow: hidden;
  border: 0.5px solid var(--border-light);
  background: var(--surface);
  cursor: pointer;
  transition: border-color 0.15s;
  display: block;
}
.card:hover { border-color: rgba(196,82,26,0.4); }
.card:hover .cardTitle { color: var(--accent); }
.cardThumb {
  height: 160px;
  background: var(--ink);
  position: relative;
  overflow: hidden;
}
.thumbPattern {
  position: absolute;
  inset: 0;
  opacity: 0.07;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(245,242,235,0.8) 24px, rgba(245,242,235,0.8) 25px),
    repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(245,242,235,0.8) 24px, rgba(245,242,235,0.8) 25px);
}
.thumbOverlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,9,8,0.7) 0%, rgba(10,9,8,0.1) 70%, transparent 100%);
}
.thumbType {
  position: absolute;
  top: 14px;
  left: 14px;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(245,242,235,0.6);
  border: 0.5px solid rgba(245,242,235,0.2);
  padding: 3px 8px;
  border-radius: 2px;
}
.thumbYear {
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 11px;
  color: rgba(245,242,235,0.35);
}
.cardBody { padding: 18px 20px 20px; }
.cardTitle {
  font-family: var(--font-serif);
  font-size: 17px;
  font-weight: 400;
  color: var(--ink);
  margin: 0 0 7px;
  line-height: 1.3;
  transition: color 0.15s;
}
.cardDesc { font-size: 12px; color: var(--ink-dim); line-height: 1.55; margin: 0 0 14px; }
.cardFooter { display: flex; justify-content: space-between; align-items: center; }
.cardTags { display: flex; gap: 5px; flex-wrap: wrap; }
.cardTag {
  font-size: 10px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--accent-dark);
  background: var(--accent-bg);
  padding: 2px 8px;
  border-radius: 2px;
}
.cardLink {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-ghost);
  white-space: nowrap;
  transition: color 0.15s;
}
.card:hover .cardLink { color: var(--accent); }
```

**Step 2: Create ProjectsClient.js (handles filtering)**

```jsx
// app/work/ProjectsClient.js
"use client";

import { useState } from "react";
import Link from "next/link";
import FilterBar from "@/components/FilterBar";
import styles from "./page.module.css";

const ALL_FILTERS = ["AI", "Accessibility", "UX Research", "Full Stack"];

export default function ProjectsClient({ featured, rest }) {
  const [filter, setFilter] = useState("All");

  const visibleRest =
    filter === "All"
      ? rest
      : rest.filter((p) => p.tags.includes(filter));

  return (
    <>
      <FilterBar filters={ALL_FILTERS} onFilter={setFilter} />

      <div className={styles.heroWrap}>
        <div className={styles.hero}>
          <div className={styles.heroImg}>
            <div className={styles.heroPattern} />
          </div>
          <div className={styles.heroOverlay} />
          <span className={styles.heroCta}>View project →</span>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>Featured — {featured.year}</span>
            <h2 className={styles.heroTitle}>{featured.title}</h2>
            <p className={styles.heroDesc}>{featured.description}</p>
            <div className={styles.heroMeta}>
              <div className={styles.heroTags}>
                {featured.tags.map((t) => (
                  <span key={t} className={styles.heroTag}>{t}</span>
                ))}
              </div>
              <span className={styles.heroSep}>·</span>
              <span className={styles.heroRole}>{featured.role}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {visibleRest.map((p) => (
          <Link href="#" key={p.slug} className={styles.card}>
            <div className={styles.cardThumb}>
              <div className={styles.thumbPattern} />
              <div className={styles.thumbOverlay} />
              <span className={styles.thumbType}>{p.type}</span>
              <span className={styles.thumbYear}>{p.year}</span>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.description}</p>
              <div className={styles.cardFooter}>
                <div className={styles.cardTags}>
                  {p.tags.map((t) => <span key={t} className={styles.cardTag}>{t}</span>)}
                </div>
                <span className={styles.cardLink}>View →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
```

**Step 3: Create app/work/page.js**

```jsx
// app/work/page.js
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectsClient from "./ProjectsClient";
import { projects } from "@/lib/projects";
import styles from "./page.module.css";

export default function WorkPage() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <Nav active="work" />

      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Selected work</p>
          <h1 className={styles.title}>Projects<span className={styles.dot}>.</span></h1>
        </div>
        <div>
          <p className={styles.desc}>
            A selection of AI, accessibility, and human-centered design projects — built, studied, and shipped.
          </p>
          <p className={styles.count}><span>{projects.length}</span> projects</p>
        </div>
      </header>

      <ProjectsClient featured={featured} rest={rest} />

      <Footer />
    </>
  );
}
```

**Step 4: Verify work page renders**

```bash
# Navigate to http://localhost:3000/work
```

Expected: header, featured hero card, 4 project cards in 2-col grid, filter buttons working.

**Step 5: Commit**

```bash
git add app/work/
git commit -m "feat: implement work/projects page"
```

---

## Task 11: Lab Notes index page

**Files:**
- Create: `app/lab-notes/page.js`
- Create: `app/lab-notes/page.module.css`
- Create: `app/lab-notes/PostListClient.js`

**Step 1: Create app/lab-notes/page.module.css**

```css
/* app/lab-notes/page.module.css */
.header {
  padding: 56px 36px 44px;
  border-bottom: 0.5px solid var(--border);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: end;
}
.eyebrow {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}
.title {
  font-family: var(--font-serif);
  font-size: 48px;
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: -0.01em;
  color: var(--ink);
}
.dot { color: var(--accent); }
.desc {
  font-size: 14px;
  font-weight: 300;
  color: var(--ink-dim);
  line-height: 1.7;
  margin-bottom: 20px;
}
.count { font-size: 12px; color: var(--ink-ghost); }
.count span { color: var(--accent); font-weight: 500; }

/* Post list */
.list { padding: 0 36px; }

.post {
  display: grid;
  grid-template-columns: 96px 1fr 180px;
  gap: 28px;
  padding: 28px 0;
  border-bottom: 0.5px solid var(--border-light);
  align-items: start;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}
.post:hover .postTitle { color: var(--accent); }

.featured {
  background: rgba(196,82,26,0.05);
  border-left: 2px solid var(--accent);
  padding-left: 28px;
  margin-left: -28px;
}
.featuredBadge {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
  display: block;
}

.postMeta { padding-top: 4px; }
.postIssue {
  font-size: 11px;
  color: var(--accent);
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 4px;
}
.postDate {
  font-size: 12px;
  color: var(--ink-ghost);
  display: block;
  line-height: 1.5;
}

.postTitle {
  font-family: var(--font-serif);
  font-size: 19px;
  font-weight: 400;
  color: var(--ink);
  margin: 0 0 9px;
  line-height: 1.25;
  transition: color 0.15s;
}
.postPull {
  font-size: 13px;
  color: var(--ink-dim);
  font-style: italic;
  line-height: 1.55;
  margin: 0 0 12px;
}
.postTags { display: flex; gap: 6px; flex-wrap: wrap; }
.postTag {
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-dark);
  background: var(--accent-bg);
  padding: 3px 9px;
  border-radius: 2px;
}

.postRight { padding-top: 4px; text-align: right; }
.readTime {
  font-size: 12px;
  color: var(--ink-ghost);
  display: block;
  margin-bottom: 12px;
}
.readLink {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink);
  border-bottom: 1px solid var(--accent);
  padding-bottom: 2px;
  transition: color 0.15s;
}
.readLink:hover { color: var(--accent); }
```

**Step 2: Create PostListClient.js**

```jsx
// app/lab-notes/PostListClient.js
"use client";

import { useState } from "react";
import Link from "next/link";
import FilterBar from "@/components/FilterBar";
import styles from "./page.module.css";

const ALL_FILTERS = ["Case Studies", "Essays", "Accessibility", "AI Design"];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function PostListClient({ posts }) {
  const [filter, setFilter] = useState("All");

  const visible =
    filter === "All"
      ? posts
      : posts.filter((p) => p.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(t.toLowerCase())));

  return (
    <>
      <FilterBar filters={ALL_FILTERS} onFilter={setFilter} />
      <div className={styles.list}>
        {visible.map((post, i) => (
          <Link
            key={post.slug}
            href={`/lab-notes/${post.slug}`}
            className={`${styles.post} ${i === 0 ? styles.featured : ""}`}
          >
            <div className={styles.postMeta}>
              {i === 0 && <span className={styles.featuredBadge}>Latest</span>}
              <span className={styles.postIssue}>No. {post.issue}</span>
              <span className={styles.postDate}>{formatDate(post.date)}</span>
            </div>
            <div>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postPull}>{post.lede}</p>
              <div className={styles.postTags}>
                {post.tags.map((t) => <span key={t} className={styles.postTag}>{t}</span>)}
              </div>
            </div>
            <div className={styles.postRight}>
              <span className={styles.readTime}>{post.readTime}</span>
              <span className={styles.readLink}>Read →</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
```

**Step 3: Create app/lab-notes/page.js**

```jsx
// app/lab-notes/page.js
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PostListClient from "./PostListClient";
import { getAllPosts } from "@/lib/posts";
import styles from "./page.module.css";

export default function LabNotesPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav active="lab-notes" />

      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>From the lab</p>
          <h1 className={styles.title}>Lab<br />Notes<span className={styles.dot}>.</span></h1>
        </div>
        <div>
          <p className={styles.desc}>
            Observations, opinions, and dispatches from the work. Essays on AI design,
            human-centered systems, and what we're learning by building.
          </p>
          <p className={styles.count}><span>{posts.length}</span> notes published</p>
        </div>
      </header>

      <PostListClient posts={posts} />

      <Footer />
    </>
  );
}
```

**Step 4: Verify lab notes index renders**

Expected: header, 3 posts in list layout, first post has featured highlight with left border.

**Step 5: Commit**

```bash
git add app/lab-notes/
git commit -m "feat: implement lab notes index page"
```

---

## Task 12: Lab Notes post page

**Files:**
- Create: `app/lab-notes/[slug]/page.js`
- Create: `app/lab-notes/[slug]/page.module.css`

**Step 1: Create app/lab-notes/[slug]/page.module.css**

```css
/* app/lab-notes/[slug]/page.module.css */
.header {
  padding: 56px 36px 48px;
  border-bottom: 0.5px solid var(--border);
  max-width: 680px;
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 28px;
}
.breadcrumb a {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}
.breadcrumbSep { font-size: 11px; color: var(--ink-ghost); }
.breadcrumbCurrent {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-ghost);
}
.issue {
  font-size: 11px;
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.title {
  font-family: var(--font-serif);
  font-size: 42px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: var(--ink);
  margin: 0 0 20px;
}
.metaRow {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 24px;
  flex-wrap: wrap;
}
.metaItem { font-size: 12px; color: var(--ink-ghost); letter-spacing: 0.04em; }
.metaSep { color: rgba(26,25,23,0.2); }
.tag {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-dark);
  background: var(--accent-bg);
  padding: 3px 10px;
  border-radius: 2px;
}

/* Body */
.body {
  padding: 0 36px;
  max-width: 680px;
}
.lede {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 400;
  font-style: italic;
  line-height: 1.55;
  color: var(--ink-muted);
  padding: 36px 0 32px;
  border-bottom: 0.5px solid var(--border);
  margin: 0;
}

/* MDX prose styles */
.body :global(h2) {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 700;
  color: var(--ink);
  margin: 32px 0 14px;
  line-height: 1.2;
}
.body :global(p) {
  font-size: 15px;
  color: var(--ink-muted);
  line-height: 1.8;
  margin: 0 0 18px;
}
.body :global(blockquote) {
  border-left: 2px solid var(--accent);
  margin: 28px 0;
  padding: 4px 0 4px 24px;
}
.body :global(blockquote p) {
  font-family: var(--font-serif);
  font-size: 18px;
  font-style: italic;
  font-weight: 400;
  color: var(--ink);
  line-height: 1.5;
  margin: 0;
}
.body :global(strong) {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 700;
  color: var(--accent);
  display: block;
  line-height: 1;
  margin-bottom: 4px;
}

/* Footer nav */
.footerNav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  border-top: 0.5px solid var(--border);
  margin-top: 48px;
  background: var(--border);
}
.navItem {
  background: var(--bg);
  padding: 28px 36px;
  display: block;
  color: inherit;
}
.navItem:hover .navTitle { color: var(--accent); }
.navDir {
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-ghost);
  margin-bottom: 8px;
}
.navTitle {
  font-family: var(--font-serif);
  font-size: 15px;
  font-weight: 400;
  color: var(--ink);
  line-height: 1.3;
  transition: color 0.15s;
}
.navItemRight { text-align: right; }

.backFooter {
  padding: 24px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 0.5px solid var(--border);
}
.backLink { font-size: 12px; color: var(--ink-ghost); }
.backLink:hover { color: var(--accent); }
.footerCopy { font-size: 12px; color: var(--ink-ghost); }
```

**Step 2: Create app/lab-notes/[slug]/page.js**

```jsx
// app/lab-notes/[slug]/page.js
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Nav from "@/components/Nav";
import { getPostBySlug, getAllPosts, getAdjacentPosts } from "@/lib/posts";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return { title: `${post.frontmatter.title} — HCI Design Lab` };
}

export default function PostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { frontmatter: fm, content } = post;
  const { prev, next } = getAdjacentPosts(fm.issue);

  const formattedDate = new Date(fm.date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Nav active="lab-notes" />

      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href="/lab-notes">Lab Notes</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>No. {fm.issue}</span>
        </div>
        <p className={styles.issue}>No. {fm.issue} — {formattedDate}</p>
        <h1 className={styles.title}>{fm.title}</h1>
        <div className={styles.metaRow}>
          <span className={styles.metaItem}>Lawrence Moore</span>
          <span className={styles.metaSep}>·</span>
          <span className={styles.metaItem}>{fm.tags[0]}</span>
          <span className={styles.metaSep}>·</span>
          <span className={styles.metaItem}>{fm.readTime}</span>
          <span className={styles.metaSep}>·</span>
          {fm.tags.slice(1).map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
      </header>

      <div className={styles.body}>
        <p className={styles.lede}>{fm.lede}</p>
        <MDXRemote source={content} />
      </div>

      <div className={styles.footerNav}>
        {prev ? (
          <Link href={`/lab-notes/${prev.slug}`} className={styles.navItem}>
            <p className={styles.navDir}>← Previous</p>
            <p className={styles.navTitle}>{prev.title}</p>
          </Link>
        ) : <div style={{ background: "var(--bg)" }} />}
        {next ? (
          <Link href={`/lab-notes/${next.slug}`} className={`${styles.navItem} ${styles.navItemRight}`}>
            <p className={styles.navDir}>Next →</p>
            <p className={styles.navTitle}>{next.title}</p>
          </Link>
        ) : <div style={{ background: "var(--bg)" }} />}
      </div>

      <footer className={styles.backFooter}>
        <Link href="/lab-notes" className={styles.backLink}>← Back to Lab Notes</Link>
        <span className={styles.footerCopy}>© HCI Design Lab 2026</span>
      </footer>
    </>
  );
}
```

**Step 3: Verify post page renders**

```bash
# Navigate to http://localhost:3000/lab-notes/a11y-logger
```

Expected: post header, italic lede, MDX body with styled h2, paragraphs, blockquotes.

**Step 4: Commit**

```bash
git add app/lab-notes/[slug]/
git commit -m "feat: implement lab notes post page with MDX rendering"
```

---

## Task 13: Final wiring — jsconfig paths + cleanup

**Files:**
- Modify: `jsconfig.json`
- Delete: unused default Next.js boilerplate

**Step 1: Verify jsconfig.json has the @ alias**

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

If missing, add it.

**Step 2: Remove unused boilerplate from page.js if any remains**

Check that `app/page.js` no longer imports Geist fonts or default Next.js styles.

**Step 3: Run a production build to catch any issues**

```bash
pnpm build
```

Expected: build completes successfully, all routes listed.

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete HCI Design Lab site redesign with blog"
```

---

## Verification checklist

- [ ] `/` — homepage renders with all 5 sections, scroll reveal animates
- [ ] `/work` — featured hero card + 4-project grid + filter buttons work
- [ ] `/lab-notes` — 3 posts listed, first has featured highlight, filter buttons work
- [ ] `/lab-notes/a11y-logger` — post renders with header, lede, MDX body, prev/next nav
- [ ] `pnpm build` completes with zero errors
- [ ] Design tokens (warm background, Playfair headings, burnt orange accents) match HTML mockups
