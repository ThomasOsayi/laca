# LACA — Repository Layout & Implementation Summary

Marketing and information website for **LACA (Los Angeles Concierge Association)**. Built with **Next.js 16** (App Router), **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Firebase**.

---

## Directory tree

```
laca/
├── .env.local                    # Firebase Web SDK credentials (git-ignored)
├── .gitignore                    # Standard Next.js gitignore + .env*
├── eslint.config.mjs             # ESLint flat config (eslint-config-next)
├── next.config.ts                # Next.js configuration
├── next-env.d.ts                 # TypeScript ambient types for Next.js
├── package.json                  # Dependencies & scripts
├── package-lock.json
├── postcss.config.mjs            # PostCSS with @tailwindcss/postcss
├── tsconfig.json                 # TypeScript config
├── README.md                     # Default create-next-app README
├── REPO_LAYOUT.md                # This file
│
├── public/                       # Static assets (default Next.js SVGs)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
└── src/
    ├── app/                      # Next.js App Router pages
    │   ├── favicon.ico
    │   ├── globals.css           # ~1 905-line master stylesheet
    │   ├── layout.tsx            # Root layout (fonts, metadata, OG)
    │   ├── page.tsx              # Home / landing page
    │   ├── about/page.tsx        # About page
    │   ├── events/page.tsx       # Events & Meetings page
    │   ├── membership/page.tsx   # Membership page
    │   ├── sponsors/page.tsx     # Sponsors & Partners page
    │   └── contact/page.tsx      # Contact / Join page
    │
    └── components/
        ├── Nav.tsx               # Global navbar
        ├── Footer.tsx            # Global footer
        │
        │   ── Home-page sections ──
        ├── Hero.tsx
        ├── About.tsx
        ├── Expo.tsx
        ├── Benefits.tsx
        ├── Membership.tsx
        ├── Gallery.tsx
        ├── CTA.tsx
        │
        ├── shared/
        │   └── PageHero.tsx      # Reusable inner-page hero
        │
        ├── about/
        │   ├── PageHero.tsx      # About-specific hero wrapper
        │   ├── Mission.tsx
        │   ├── President.tsx
        │   ├── Board.tsx
        │   ├── Ethics.tsx
        │   ├── LesClefs.tsx
        │   └── ContactBand.tsx
        │
        ├── events/
        │   ├── ExpoFeature.tsx
        │   ├── ExpoStats.tsx
        │   ├── Meetings.tsx
        │   ├── HostEvent.tsx
        │   ├── WinterGala.tsx
        │   ├── Calendar.tsx
        │   └── EventsCTA.tsx
        │
        ├── membership/
        │   ├── MembershipTiers.tsx
        │   ├── Qualifications.tsx
        │   ├── MembershipBenefits.tsx
        │   ├── HowToApply.tsx
        │   ├── HotelManagement.tsx
        │   ├── DeadlineBanner.tsx
        │   └── MembershipCTA.tsx
        │
        ├── sponsors/
        │   ├── WhyPartner.tsx
        │   ├── SponsorTiers.tsx
        │   ├── SponsorsGallery.tsx
        │   ├── HowToSponsor.tsx
        │   ├── Ambassador.tsx
        │   ├── LogoPlaceholders.tsx
        │   └── SponsorCTA.tsx
        │
        └── contact/
            ├── ContactMain.tsx
            ├── Directory.tsx
            ├── QuickLinks.tsx
            └── ContactCTA.tsx
```

---

## Tech stack & configuration

| Layer | Detail |
|-------|--------|
| Framework | Next.js 16.2.2 (App Router, `src/app/`) |
| UI | React 19.2.4, react-dom 19.2.4 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 via PostCSS (`@tailwindcss/postcss`); ~1 905-line `globals.css` with CSS custom properties |
| Fonts | **Cormorant Garamond** (display / headings) and **Outfit** (body) via `next/font/google` |
| Backend / DB | **Firebase 12.11** — Web SDK credentials in `.env.local` (project `laca-db236`) |
| Linting | ESLint 9 with `eslint-config-next` |
| Icons | All inline SVGs (no icon library) |
| Images | External Unsplash URLs; no local image assets beyond default Next.js SVGs |

### Firebase configuration (`.env.local`)

Firebase Web SDK is configured for project **laca-db236** with the following `NEXT_PUBLIC_` environment variables: API key, auth domain, project ID, storage bucket, messaging sender ID, app ID, and measurement ID (Google Analytics `G-SCT75CCFXT`). The `firebase` package (^12.11.0) is installed as a production dependency. No Firebase SDK initialisation file or usage exists in the codebase yet — the credentials are provisioned but not wired up.

---

## Design system (`globals.css`)

### Colour palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--gold` | `#C9A84C` | Brand accent, labels, icons, CTAs |
| `--gold-light` | `#E2C97E` | Hover states |
| `--gold-pale` | `#F5ECD5` | Light accent backgrounds |
| `--gold-deep` | `#A68A3A` | Active / pressed states |
| `--navy` | `#1A2744` | Primary text, headings |
| `--navy-deep` | `#0F1A2E` | Dark backgrounds (hero, footer, CTAs) |
| `--navy-mid` | `#243555` | Cards on dark backgrounds |
| `--cream` | `#FAF8F3` | Page background |
| `--cream-warm` | `#F3EDE0` | Alternate section backgrounds |

### Typography

- Headings: `var(--font-display)` — Cormorant Garamond, weight 500, tight line-height.
- Body: `var(--font-body)` — Outfit, weight 400, 15 px base.
- `.section-label`: 11 px uppercase tracking-wide gold label used above every section heading.
- `h2 em`: Gold italic treatment for emphasized title words.

### Layout tokens

- `.container`: Max 1 280 px, responsive horizontal padding (32 → 48 → 64 px with `!important`).
- `--section-pad`: `clamp(80px, 10vw, 120px)` vertical section spacing.
- `--radius` / `--radius-md` / `--radius-lg`: 4 / 8 / 12 px.

### Shared UI elements

- **`.btn-primary`**: Gold background, navy text, arrow icon, hover glow.
- **`.btn-secondary`**: Transparent border, navy text.
- **`.btn-secondary-light`**: Transparent border, white text (dark backgrounds).
- **`.btn-outline`**: Gold border, dark text.
- **`.gold-divider`**: 48 px × 2 px gold horizontal rule.

### SVG reset

A global SVG reset (`svg:not(.nav-logo-icon) { width: revert; height: revert; display: revert; }`) prevents Tailwind's base styles from collapsing inline SVG icons. Per-component overrides pin specific icon sizes (`.channel-icon svg`, `.dir-card-icon svg`, `.social-btn svg`, `.ql-link svg`).

### Scroll animation

Every page registers an `IntersectionObserver` (skipped when `prefers-reduced-motion`) that adds `.visible` to `.fade-in` elements at 10 % intersection. Stagger classes `.stagger-1` through `.stagger-4` add incremental transition delays for card grids.

---

## Global chrome

### `Nav.tsx`

- SVG text-based LACA logo + "Los Angeles Concierge Association" subtitle.
- Desktop link bar: About, Events, Membership, Sponsors, and a gold "Contact / Join" CTA button.
- Scroll detection: adds `.scrolled` class at 40 px for backdrop blur / background.
- Active route highlighting using `usePathname()`.
- Mobile hamburger toggle with 3-span animated icon; opens full-screen mobile menu overlay, locks body scroll.
- **Auto-closes mobile menu on route change**: a `useEffect` on `pathname` resets `mobileOpen` and clears body overflow, so navigating from the mobile menu closes it automatically.

### `Footer.tsx`

- Copyright line ("© 2025 Los Angeles Concierge Association").
- Social links row: Facebook, Instagram, Twitter, YouTube — all inline SVGs with `aria-label`.
- Motto: "In Service Through Friendship".

---

## Page-by-page implementation

### Home (`/`) — `src/app/page.tsx`

Client component. Scrolls to top implicitly. Applies `IntersectionObserver` animation.

| Order | Component | What it renders |
|-------|-----------|-----------------|
| 1 | **Hero** | Full-bleed dark background with overlay + decorative element. Left column: "Los Angeles, California" tagline, "In Service Through Friendship" headline, description, two CTA buttons (Become a Member → `#membership`, Expo & Trade Show → `#expo`). Right column: framed Unsplash hotel image, "Established Mid-1980s" badge, floating stat strip (10+ Years, 350 Hospitality Experts, 65 Vendor Partners). |
| 2 | **About** | Two-column grid. Left: "Our Mission" label + gold divider + "Concierge: The Original Influencer" heading. Right: Two body paragraphs about LACA history. Four value cards (Professional Development, Ethical Standards, Service Excellence, Community) each with a gold circle icon + description. |
| 3 | **Expo** | Section `#expo`. Header with label + heading + description. Three stat cards (200–350 Front-Line Experts, 45–65 Top-Tier Vendors, 10+ Years Running) with staggered fade-in. Venue highlight: Unsplash image of event venue, "Taglyan Complex" info card with location/date SVG icons, "Inquire About Participation" mailto link. |
| 4 | **Benefits** | Section `#benefits`. Four benefit cards (Unmatched Exposure, Professional Standards, Education & Growth, Valuable Partnerships) each with inline SVG icon, heading, and description. |
| 5 | **Membership** | Section `#membership`. Left column: "Join the Association" heading, description, checklist of 6 qualification items (age, title, hours, probation, meeting attendance, dues) with gold check icons. Right column: "Get in Touch" contact form — first/last name, phone, email, subject dropdown (Membership Inquiry, Vendor/Sponsorship, Expo Participation, General Question), message textarea, "Submit Inquiry" button. **Form is presentational only** (no backend). |
| 6 | **Gallery** | "The City We Serve" heading. Horizontally scrolling image strip with 6 Unsplash photos duplicated for seamless CSS loop (LA cityscape, hotel pool, fine dining, Beverly Hills, hotel lobby, Malibu beach). |
| 7 | **CTA** | Section `#contact`. Dark background. "Ready to Elevate Your Network?" heading. Two mailto buttons (Apply for Membership → `membership@thelaca.com`, Vendor Inquiry → `corporateambassador@thelaca.com`). Four contact cards: Membership email, Public Relations email, Les Clefs d'Or Liaison email, mailing address (269 S. Beverly Dr. Suite 701, Beverly Hills, CA 90212). |

---

### About (`/about`) — `src/app/about/page.tsx`

| Order | Component | What it renders |
|-------|-----------|-----------------|
| 1 | **about/PageHero** | Wraps shared `PageHero` with About-specific copy, breadcrumb "About / Mission / Board", Unsplash background. |
| 2 | **Mission** | Two-column layout. Left: "Our Mission" label, gold divider, heading, pull-quote of the official LACA mission statement with `<cite>`. Right: Three body paragraphs about founding history and Les Clefs d'Or mentorship. Four pillar cards (Education & Training, Ethical Standards, Service Excellence, Community & Networking) each with SVG icon + description. |
| 3 | **President** | Two-column layout. Left: Unsplash portrait photo of Chamian Coates in a framed container + name card overlay. Right: "President's Note" section label, three-paragraph letter from the president about the art of concierge, followed by a signature block ("In Service Through Friendship — Chamian Coates · President, Los Angeles Concierge Association"). |
| 4 | **Board** | "The 2025–2026 Board" heading. Eight board member cards in a grid. Each card shows a photo or initials fallback, role, name, and contact detail (email rendered as mailto link or plain text). Members: Chamian Coates (President), Alejandro Sosa (Director of Membership), Frank Parr (Corporate Ambassador), Adriano Bartoli (Public Relations), David Hyland (Public Relations Co-Chair), Matt Beritich (Les Clefs d'Or Liaison), Board Treasurer (TBA), Board Secretary (TBA). |
| 5 | **Ethics** | "Board Code of Ethics" heading. Six numbered principle cards (01–06): Integrity & Accountability, Confidentiality, Conflict of Interest, Commitment & Participation, Compliance, Respect & Professionalism. |
| 6 | **LesClefs** | Two-column layout. Left: "Les Clefs d'Or USA Mentorship" heading, two paragraphs about the global concierge society, three highlight cards (Mentorship Program, Scholarship Opportunities, Global Network) with SVG icons. Right: Framed Unsplash photo + "Les Clefs d'Or USA Affiliate" badge overlay. |
| 7 | **ContactBand** | Dark accent band with three contact cards: Membership (Alejandro Sosa), Public Relations (Adriano Bartoli & David Hyland), Les Clefs d'Or Liaison (Matt Beritich). Each with role, name, and mailto link. |

---

### Events (`/events`) — `src/app/events/page.tsx`

| Order | Component | What it renders |
|-------|-----------|-----------------|
| 1 | **shared/PageHero** | "Events & Meetings" title, Unsplash background (event venue), breadcrumb. |
| 2 | **ExpoFeature** | Two-column card. Left: Unsplash image of Taglyan Complex. Right: "Premier Annual Event" badge, heading, description, three metadata items with SVG icons (Taglyan Complex LA, 2025 Date TBA, Evening Event), "Inquire About Participation" mailto CTA. |
| 3 | **ExpoStats** | Three stat cards (200–350 Front-Line Experts, 45–65 Top-Tier Vendors, 10+ Years Running) with staggered fade-in. |
| 4 | **Meetings** | "Monthly Meetings & Gatherings" heading. Four meeting-type cards: Monthly Member Meetings (35–50 attendees), Social Mixers (30–50 guests), LACA Supper Club (Intimate Dining), Featured Restaurant of the Month (3–4 Events/Month). Each with SVG icon, description, and attendance tag. |
| 5 | **HostEvent** | Two-column layout. Left: "Host an Event With LACA" heading, two description paragraphs, four hosting type cards (Monthly Meeting Venue, Social Mixer Host, Board Meeting Dinner, Supper Club Partner) with icon + short requirements. Right: Framed Unsplash image + "Interested in Hosting?" card with `president@thelaca.com` mailto. |
| 6 | **WinterGala** | Full-width card. Left: Unsplash gala dinner image. Right: "Annual Celebration" badge, heading, description, three check-marked perks (Gold Key Partner admission, member recognition, networking), "Inquire About the Gala" mailto CTA. |
| 7 | **Calendar** | "LACA Event Calendar" heading. Five timeline items: Jan–Jun (Monthly Meetings & Mixers), May 15 (Membership Renewal Deadline), Aug–Sep (Annual Expo), Oct–Nov (Board Nominations & Elections), Dec (Winter Gala & Officer Installation). |
| 8 | **EventsCTA** | Dark background CTA: "Attend, Host, or Sponsor" heading, two mailto buttons (Event Inquiries → `publicrelations@thelaca.com`, Host a Meeting → `president@thelaca.com`). |

---

### Membership (`/membership`) — `src/app/membership/page.tsx`

| Order | Component | What it renders |
|-------|-----------|-----------------|
| 1 | **shared/PageHero** | "Membership Information" title, Unsplash background (luxury hotel), breadcrumb. |
| 2 | **MembershipTiers** | "Choose Your Path" heading. Three pricing tier cards: **Full Member** ($150/yr, featured — voting rights, office eligibility, all events, Les Clefs d'Or pathway, scholarships), **Affiliate Member** ($175/yr — trial period, board approval), **General Sponsor** ($800/yr — 6 meetings for 2 guests, Gala admission, Expo table, website recognition, member roster). Each card has check-marked feature list and a mailto CTA. |
| 3 | **Qualifications** | Two-column layout. Left: "Full Member Qualifications" heading, body paragraphs, "Social Affiliate Membership" info box. Right: "Eligibility Criteria" checklist grouped into Personal Requirements, Employment Requirements (4 items), and Ongoing Requirements (2 items). |
| 4 | **MembershipBenefits** | Six benefit cards: Professional Network, Les Clefs d'Or Pathway, Education & Growth, Industry Standards, Exclusive Events, Vendor Partnerships. |
| 5 | **HowToApply** | Three numbered step cards: 01 Submit Application, 02 Pay Annual Dues, 03 Attend & Connect. Below: two info cards — submissions to `membership@thelaca.com` (Alejandro Sosa) and mailing address (269 South Beverly Drive, Suite 701, Beverly Hills, CA 90212). |
| 6 | **HotelManagement** | Two-column layout addressed to hotel management. Left: "Support Your Concierge Team" heading, persuasion copy, three perk cards (Professional Development, Unmatched Networking, Preferred Partnerships). Right: Framed Unsplash photo + "$150 per concierge / year" price badge overlay. |
| 7 | **DeadlineBanner** | Dark accent card: "Applications Due May 15, 2026", description, "Apply Before the Deadline" mailto CTA. |
| 8 | **MembershipCTA** | Dark background CTA: "Elevate Your Career" heading, two mailto buttons (Apply for Membership, Questions? Contact Us). |

---

### Sponsors (`/sponsors`) — `src/app/sponsors/page.tsx`

| Order | Component | What it renders |
|-------|-----------|-----------------|
| 1 | **shared/PageHero** | "Sponsors & Partners" title, Unsplash background (palm trees), breadcrumb. |
| 2 | **WhyPartner** | Two-column layout. Left: "Why Partner With LACA" heading, two paragraphs, four stat badges (200–350 Concierges per Expo, 45–65 Vendor Partners, 10+ Years, 8+ Events/Year). Right: Four value cards (Direct Access, Brand Credibility, Year-Round Exposure, Exclusive Guest Access). |
| 3 | **SponsorTiers** | Two tier cards: **Gold Key Partner** (Invitation Only, featured — 6+ meetings for 2, Gala for 2, complimentary Expo table, discount additional tables, website recognition, member roster, special events) and **General Sponsor** ($800/yr — 3+ meetings for 1, Expo + Gala access, discounted table, recognition, roster). General Sponsor has "Request Invitation" mailto CTA. |
| 4 | **SponsorsGallery** | Horizontally scrolling image strip with 6 Unsplash photos duplicated for seamless loop. |
| 5 | **HowToSponsor** | Three numbered step cards: 01 Express Interest, 02 Board Review, 03 Welcome Aboard. |
| 6 | **Ambassador** | Two-column layout. Left: Framed Unsplash portrait + name card (Frank Parr, Corporate Ambassador, Peninsula Beverly Hills). Right: heading, two description paragraphs, two contact cards (`corporateambassador@thelaca.com`, `membership@thelaca.com`). |
| 7 | **LogoPlaceholders** | "Current Sponsors" heading with note that logos will appear once provided. Grid of 6 gray placeholder boxes. |
| 8 | **SponsorCTA** | Dark background CTA: "Reach LA's Most Influential Voices" heading, two mailto buttons (Sponsorship Inquiry, General Questions). |

---

### Contact (`/contact`) — `src/app/contact/page.tsx`

| Order | Component | What it renders |
|-------|-----------|-----------------|
| 1 | **shared/PageHero** | "Get Involved" title, Unsplash background (hotel lobby), breadcrumb "Contact / Join". |
| 2 | **ContactMain** | Two-column layout. Left: "Contact LACA" heading. Four contact channels with icons: Membership email, Corporate Ambassador email, Public Relations email, Website (thelaca.com). Social media row: Facebook, Instagram, Twitter, YouTube icon buttons. Right: "Send a Message" form — first/last name, phone, email, subject dropdown (Membership Inquiry, Vendor/Sponsorship, Expo Participation, Host an Event, General Question), message textarea, "Submit Inquiry" button. **Form is presentational only**. |
| 3 | **Directory** | "Board Contacts" heading. Six directory cards: President (Chamian Coates), Director of Membership (Alejandro Sosa), Corporate Ambassador (Frank Parr), Public Relations (Adriano Bartoli & David Hyland), Les Clefs d'Or Liaison (Matt Beritich), Mailing Address. Each with SVG icon, role, name, description, and mailto link (or address). |
| 4 | **QuickLinks** | Three link cards using Next.js `<Link>`: Become a Member → `/membership`, Sponsor LACA → `/sponsors`, Upcoming Events → `/events`. |
| 5 | **ContactCTA** | Dark background CTA: "Join the Community" heading, two mailto buttons (Apply for Membership, Sponsorship Inquiry). |

---

## Shared patterns and conventions

### Reusable `shared/PageHero`

Accepts `label`, `title`, `titleEm`, `description`, `breadcrumb`, and optional `bgImage` (defaults to Unsplash hotel). Renders: background image with overlay, breadcrumb (Home → current page), section label, `h1` with `<em>` accent, and description. Used by Events, Membership, Sponsors, and Contact. About page wraps it in `about/PageHero` with pre-filled props.

### Scroll animation

Every page's top-level `useEffect` creates an `IntersectionObserver` (threshold 0.1, rootMargin -40 px bottom) that adds `.visible` to `.fade-in` elements. CSS transitions opacity 0 → 1 and translateY 20 px → 0. `.stagger-1` through `.stagger-4` add 0.1 s incremental delays.

### Inline SVGs

All icons are hand-coded inline SVGs — no icon library. Common icons (arrow, check, star, people, shield, book, globe, calendar, map pin, bell, layers, mail) are repeated as local `const` components where needed.

### Contact emails

| Department | Email |
|------------|-------|
| Membership | membership@thelaca.com |
| President | president@thelaca.com |
| Corporate Ambassador | corporateambassador@thelaca.com |
| Public Relations | publicrelations@thelaca.com |
| Les Clefs d'Or Liaison | liaison.lcd@thelaca.com |

### Forms

Two contact / inquiry forms exist (home Membership section + Contact page). Both are **presentational HTML only** — no form handlers, API routes, or submission logic.

---

## What is not yet implemented

- **Firebase not initialised** — the `firebase` package is installed and `.env.local` holds credentials for project `laca-db236`, but no SDK init file (`lib/firebase.ts` or similar) or Firestore/Auth usage exists yet.
- No API routes or server actions.
- No authentication or user accounts.
- No form submission handling (forms are visual only).
- No CMS — all content is hardcoded in components.
- No real sponsor logos (6 gray placeholders).
- No image hosting — all photos are external Unsplash URLs.
- No tests.
- `README.md` is still the default create-next-app boilerplate.

---

## Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

*Generated for the LACA codebase. Update this file when routes or major sections change.*
