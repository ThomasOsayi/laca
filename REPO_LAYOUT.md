# LACA — Repository layout and implementation summary

Marketing and information site for **LACA (Los Angeles Concierge Association)**. Built with **Next.js 16** (App Router), **React 19**, **TypeScript**, and **Tailwind CSS v4**.

---

## Directory tree

Omitted: `node_modules/`, `.git/`, `.next/` (build output).

```
laca/
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
├── REPO_LAYOUT.md
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── src/
    ├── app/
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx                 # Home (landing)
    │   ├── about/page.tsx
    │   ├── contact/page.tsx
    │   ├── events/page.tsx
    │   ├── membership/page.tsx
    │   └── sponsors/page.tsx
    └── components/
        ├── Nav.tsx
        ├── Footer.tsx
        ├── Hero.tsx
        ├── About.tsx
        ├── Expo.tsx
        ├── Benefits.tsx
        ├── Membership.tsx
        ├── Gallery.tsx
        ├── CTA.tsx
        ├── about/
        │   ├── PageHero.tsx
        │   ├── Mission.tsx
        │   ├── President.tsx
        │   ├── Board.tsx
        │   ├── Ethics.tsx
        │   ├── LesClefs.tsx
        │   └── ContactBand.tsx
        ├── contact/
        │   ├── ContactMain.tsx
        │   ├── Directory.tsx
        │   ├── QuickLinks.tsx
        │   └── ContactCTA.tsx
        ├── events/
        │   ├── ExpoFeature.tsx
        │   ├── ExpoStats.tsx
        │   ├── Meetings.tsx
        │   ├── HostEvent.tsx
        │   ├── WinterGala.tsx
        │   ├── Calendar.tsx
        │   └── EventsCTA.tsx
        ├── membership/
        │   ├── MembershipTiers.tsx
        │   ├── Qualifications.tsx
        │   ├── MembershipBenefits.tsx
        │   ├── HowToApply.tsx
        │   ├── HotelManagement.tsx
        │   ├── DeadlineBanner.tsx
        │   └── MembershipCTA.tsx
        ├── shared/
        │   └── PageHero.tsx          # Reusable hero for inner pages
        └── sponsors/
            ├── WhyPartner.tsx
            ├── SponsorTiers.tsx
            ├── SponsorsGallery.tsx
            ├── HowToSponsor.tsx
            ├── Ambassador.tsx
            ├── LogoPlaceholders.tsx
            └── SponsorCTA.tsx
```

---

## What is implemented

### Stack and configuration

- **Next.js App Router** under `src/app/` with one route per major section.
- **Global layout** (`layout.tsx`): **Cormorant Garamond** (display) and **Outfit** (body) via `next/font/google`; site-wide **metadata** (title, description, keywords, Open Graph) for LACA / thelaca.com.
- **Styling**: Tailwind v4 with PostCSS (`globals.css` holds design tokens and component-oriented styles).
- **Linting**: ESLint with `eslint-config-next`.

### Global chrome

- **`Nav`**: Logo/home link, links to About, Events, Membership, Sponsors, and a **Contact / Join** CTA; scroll-based styling; **mobile menu** with body scroll lock; **active route** highlighting via `usePathname`.
- **`Footer`**: Site footer (shared across pages).

### Home page (`/`)

Single-scroll landing composed of: **Hero**, **About**, **Expo**, **Benefits**, **Membership** preview, **Gallery**, **CTA**, plus Nav/Footer. Uses an **IntersectionObserver** (when reduced motion is not preferred) to add a `visible` class to `.fade-in` elements for scroll-in animation.

### Inner pages (each: Nav → sections → Footer)

| Route | Purpose | Section components (order) |
|-------|---------|----------------------------|
| **`/about`** | Organization story and leadership | Custom about **PageHero**, Mission, President, Board, Ethics, Les Clefs, Contact band |
| **`/events`** | Programs and calendar narrative | Shared **PageHero**, Expo feature/stats, Meetings, Host an event, Winter Gala, Calendar, Events CTA |
| **`/membership`** | Joining LACA | Shared **PageHero**, Tiers, Qualifications, Benefits, How to apply, Hotel management note, Deadline banner, Membership CTA |
| **`/sponsors`** | Partnerships | Shared **PageHero**, Why partner, Sponsor tiers, Sponsors gallery, How to sponsor, Ambassador, Logo placeholders, Sponsor CTA |
| **`/contact`** | Get involved / reach out | Shared **PageHero**, Main contact block, Directory, Quick links, Contact CTA |

Inner pages also **scroll to top on mount** and reuse the same **fade-in / IntersectionObserver** pattern as the home page when motion is allowed.

### Shared patterns

- **`components/shared/PageHero.tsx`**: Breadcrumb-style label, title + emphasized span, description, and optional background image (Unsplash URLs on Events, Membership, Sponsors, Contact).
- **`components/about/PageHero.tsx`**: About-specific hero variant.
- **Public assets**: Default Next.js SVG placeholders under `public/` (plus `favicon.ico` in `app/`).

### Not in scope (from codebase)

- No API routes, database, auth, or form backends observed; content is presentational.
- `README.md` is still the generic create-next-app template (not customized for LACA).

---

## Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |

---

*Generated for the LACA codebase. Update this file when routes or major sections change.*
