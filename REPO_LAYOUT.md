# LACA — Repository layout and implementation summary

Marketing site for **LACA (Los Angeles Concierge Association)** with a **Firestore-backed admin CMS**. Stack: **Next.js 16** (App Router), **React 19**, **TypeScript**, **Tailwind CSS v4**, **Firebase** (Firestore + Storage).

---

## Directory tree

Omitted: `node_modules/`, `.git/`, `.next/`, `tsconfig.tsbuildinfo`.

```
laca/
├── .env.local                    # NEXT_PUBLIC_FIREBASE_* (git-ignored via .env*)
├── .gitignore
├── eslint.config.mjs
├── next.config.ts                # images.remotePatterns → images.unsplash.com
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md                     # Default create-next-app boilerplate
├── REPO_LAYOUT.md
├── public/
│   ├── file.svg, globe.svg, next.svg, vercel.svg, window.svg
│   └── (default Next.js static SVGs)
└── src/
    ├── app/
    │   ├── favicon.ico
    │   ├── globals.css           # Design system + marketing + admin UI (~2 118 lines)
    │   ├── layout.tsx            # Fonts, metadata, wraps body with SiteDataProvider
    │   ├── page.tsx              # Home
    │   ├── about/page.tsx
    │   ├── contact/page.tsx
    │   ├── events/page.tsx
    │   ├── membership/page.tsx
    │   ├── sponsors/page.tsx
    │   └── admin/
    │       ├── page.tsx          # Admin shell: login, sidebar, tab routing
    │       └── components/
    │           ├── AdminLogin.tsx
    │           ├── AdminModal.tsx
    │           ├── Dashboard.tsx
    │           ├── BoardEditor.tsx
    │           ├── EventsEditor.tsx      # larger: expo / gala / meetings / calendar-style data
    │           ├── MembershipEditor.tsx
    │           ├── SponsorsEditor.tsx    # logos + gallery images
    │           ├── ContactsEditor.tsx
    │           ├── SiteEditor.tsx        # hero, president, mission, copyright
    │           ├── SettingsEditor.tsx    # feature toggles + admin password + logout
    │           └── ImageUpload.tsx       # Firebase Storage uploads
    ├── components/               # Public sections; most merge Firestore via useSiteData + fallbacks
    │   ├── Nav.tsx, Footer.tsx
    │   ├── Hero.tsx, About.tsx, Expo.tsx, Benefits.tsx, Membership.tsx, Gallery.tsx, CTA.tsx
    │   ├── about/, contact/, events/, membership/, sponsors/, shared/
    └── lib/
        ├── firebase.ts           # init app, export db + storage (env-based config)
        ├── hooks.ts              # useSiteDoc, fetchSiteDoc, saveSiteDoc
        ├── SiteDataContext.tsx   # SiteDataProvider + useSiteData (7 Firestore listeners)
        └── seed.ts               # One-off Firestore seed (run with tsx); embeds web config in file
```

---

## Tech stack

| Piece | Detail |
|--------|--------|
| App | Next.js 16.2.2, App Router under `src/app/` |
| UI | React 19.2.4, TypeScript 5 |
| Styling | Tailwind v4 (`@tailwindcss/postcss`) + `globals.css` |
| Fonts | Cormorant Garamond + Outfit via `next/font/google` in `layout.tsx` |
| Images | `next.config.ts` allows `next/image` (if used) from **images.unsplash.com** via `remotePatterns` |
| Firebase | `firebase` ^12.11 — Firestore (`db`) and Storage (`storage`) |
| Tooling | ESLint 9 + `eslint-config-next`; **tsx** (devDep) to run `seed.ts` |

---

## Root layout (`src/app/layout.tsx`)

- Sets HTML `lang`, font CSS variables, imports `globals.css`, exports static **metadata** and **Open Graph** for LACA / thelaca.com.
- Wraps all pages in **`SiteDataProvider`** so the public site and admin share the same real-time Firestore subscriptions for `site/*` documents (admin also uses `useSiteDoc` per screen).

---

## Firebase (`src/lib/firebase.ts`)

- Single app instance via `getApps()` / `initializeApp` to avoid duplicate-app errors in dev HMR.
- Config from `NEXT_PUBLIC_FIREBASE_*` env vars (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId).
- Exports: `db` (Firestore), `storage` (Firebase Storage), default `app`.

---

## Firestore data model (`site` collection)

Each document id is a fixed slug; admin UIs and public components expect these shapes (see `seed.ts` for defaults).

| Document | Purpose |
|----------|---------|
| `site/board` | `members[]` — id, name, role, email, affiliation, photo URL, initials |
| `site/events` | `expo` (name, year, venue, date, time, description, attendee/vendor/year counts, image), `gala` (name, description, image), `meetings[]` (id, title, description, tag) |
| `site/membership` | `dues` (full, affiliate, sponsor), `deadline`, `deadlineYear`, `qualifications[]` |
| `site/sponsors` | `logos[]`, `galleryImages[]` (URLs for sponsor strip / home gallery) |
| `site/contacts` | `emails` (membership, corporateAmbassador, publicRelations, president, lesClefs), `socials`, `address`, `website` |
| `site/content` | `hero` (tagline, title lines, description, stats[], badge, image), `president` (name, title, photo, paragraphs[], signature), `mission` (heading, quote, paragraphs[]), `copyrightYear` |
| `site/settings` | `showExpo`, `showGala`, `showDeadlineBanner`, `showSponsorLogos`; `adminPassword` (plaintext string used for `/admin` login gate) |

**Seeding:** `npx tsx src/lib/seed.ts` (not an npm script). `seed.ts` embeds Firebase web config in source for the CLI—treat as sensitive; prefer env-driven tooling for production.

---

## Public site ↔ CMS (`SiteDataContext`)

- **`SiteDataProvider`** (client): seven parallel `onSnapshot` listeners on `site/board`, `events`, `membership`, `sponsors`, `contacts`, `content`, `settings`. Sets `loading` to false after each doc has received at least one snapshot (initial batch).
- **`useSiteData()`** exposes those seven blobs plus `loading`. **No marketing component currently branches on `loading`**; they use optional chaining and **inline fallbacks** when fields are missing, so the first paint may match defaults until Firestore data arrives.

**Components using `useSiteData()`:** `Hero`, `About`, `Expo`, `Board`, `Mission`, `President`, `ContactBand`, `Footer`, `CTA`, `Gallery`, `Membership`, `ExpoFeature`, `ExpoStats`, `Meetings`, `HostEvent`, `WinterGala`, `Calendar`, `EventsCTA`, `MembershipTiers`, `Qualifications`, `MembershipBenefits`, `HowToApply`, `HotelManagement`, `DeadlineBanner`, `MembershipCTA`, `WhyPartner`, `SponsorTiers`, `SponsorsGallery`, `HowToSponsor`, `Ambassador`, `LogoPlaceholders`, `SponsorCTA`, `ContactMain`, `Directory`, `QuickLinks`, `ContactCTA`.

**Still static (examples):** `Benefits`, `Ethics`, `LesClefs`, `Nav` (hardcoded nav and logo).

---

## Admin (`/admin`)

- **Route:** `src/app/admin/page.tsx` — client-only shell.
- **Auth:** Password compared on the client to `settings.adminPassword` from Firestore (fallback `"laca2025admin"` while settings load). Success → `sessionStorage.setItem("laca-admin", "true")`. **Not** Firebase Authentication.
- **UX:** Full-screen loading until `settings` doc is read; sidebar sections Overview / Content / Settings; link to open live site in a new tab.
- **Persistence:** Editors use `useSiteDoc` / `saveSiteDoc` from `hooks.ts` (`setDoc` with `{ merge: true }`).

### Admin components (summary)

| File | Role |
|------|------|
| `AdminLogin.tsx` | Branded login, show/hide password, Enter to submit |
| `Dashboard.tsx` | Shortcut cards into editors; live counts where applicable |
| `BoardEditor.tsx` | Board `members` list + `ImageUpload` for photos |
| `EventsEditor.tsx` | Expo, gala, meetings (richer form surface) |
| `MembershipEditor.tsx` | Dues, deadline fields, qualifications |
| `SponsorsEditor.tsx` | Sponsor logos list, gallery images |
| `ContactsEditor.tsx` | Department emails, social URLs, address blocks, website |
| `SiteEditor.tsx` | Hero, president’s letter, mission copy, copyright year; modals for editing; saves full `content` document |
| `SettingsEditor.tsx` | Save toggles (expo / gala / deadline banner / sponsor logos), rotate admin password (min 8 chars), logout |
| `AdminModal.tsx` | Reusable overlay; locks `body` scroll while open |
| `ImageUpload.tsx` | Upload to Storage (`uploadBytes` + `getDownloadURL`); max **5 MB**, images only; object path `folder/timestamp-sanitizedname` |

---

## `src/lib/hooks.ts`

- **`useSiteDoc(docId)`** — `onSnapshot` on `site/{docId}` for admin panels.
- **`fetchSiteDoc(docId)`** — one-time `getDoc`.
- **`saveSiteDoc(docId, data)`** — `setDoc(..., { merge: true })`.

---

## Public routes

| Route | Composition |
|-------|-------------|
| `/` | Nav → Hero, About, Expo, Benefits, Membership, Gallery, CTA, Footer; home uses `IntersectionObserver` on `.fade-in` when motion allowed |
| `/about` | Nav → about `PageHero`, Mission, President, Board, Ethics, LesClefs, ContactBand, Footer |
| `/events` | Nav → shared `PageHero`, Expo/Gala/Meetings/Host/Winter/Calendar/Events CTA, Footer |
| `/membership` | Nav → `PageHero`, tiers, qualifications, benefits, how to apply, hotel section, deadline, CTA, Footer |
| `/sponsors` | Nav → `PageHero`, partner value, tiers, gallery, how to sponsor, ambassador, logos, CTA, Footer |
| `/contact` | Nav → `PageHero`, ContactMain, Directory, QuickLinks, ContactCTA, Footer |

Inner pages: scroll-to-top on mount + same fade-in observer pattern as home where used.

**Shared `PageHero`:** `src/components/shared/PageHero.tsx` — breadcrumb (Home → current), label, title + emphasized span, description, optional `bgImage` (Unsplash URLs on several routes). About wraps it in `components/about/PageHero.tsx`.

---

## Forms on the marketing site

`Membership.tsx` (home) and `ContactMain.tsx` (contact) are **UI-only** inquiry forms: no `action`, API route, email integration, or server action.

---

## Security and ops (maintainers)

- Admin is a **shared password** checked in the browser; `adminPassword` is stored in Firestore as plaintext.
- **`seed.ts`** includes Firebase web credentials in repo—rotate keys if the file is ever public or leaked.
- Configure **Firestore rules** (writes restricted; reads as needed for public `site/*`) and **Storage rules** for authenticated or trusted upload paths.

---

## Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Dev server |
| `npm run build` / `npm run start` | Production build / serve |
| `npm run lint` | ESLint |
| `npx tsx src/lib/seed.ts` | Seed Firestore (manual) |

---

*Update when routes, schema, or layout providers change.*
