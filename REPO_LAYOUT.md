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
├── next.config.ts
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
    │   ├── globals.css           # Large single-file design system + admin styles (~2k+ lines)
    │   ├── layout.tsx            # Root layout: fonts, metadata (no SiteDataProvider here)
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
    │           ├── EventsEditor.tsx
    │           ├── MembershipEditor.tsx
    │           ├── SponsorsEditor.tsx
    │           ├── ContactsEditor.tsx
    │           ├── SiteEditor.tsx
    │           ├── SettingsEditor.tsx
    │           └── ImageUpload.tsx
    ├── components/               # Public marketing sections (many read Firestore via useSiteData)
    │   ├── Nav.tsx, Footer.tsx
    │   ├── Hero.tsx, About.tsx, Expo.tsx, Benefits.tsx, Membership.tsx, Gallery.tsx, CTA.tsx
    │   ├── about/, contact/, events/, membership/, sponsors/, shared/
    └── lib/
        ├── firebase.ts           # init app, export db + storage (env-based config)
        ├── hooks.ts              # useSiteDoc, fetchSiteDoc, saveSiteDoc
        ├── SiteDataContext.tsx   # useSiteData + SiteDataProvider (7 doc subscriptions)
        └── seed.ts               # One-off Firestore seed script (tsx); embeds config in file
```

---

## Tech stack

| Piece | Detail |
|--------|--------|
| App | Next.js 16.2.2, App Router under `src/app/` |
| UI | React 19.2.4, TypeScript 5 |
| Styling | Tailwind v4 (`@tailwindcss/postcss`) + extensive `globals.css` |
| Fonts | Cormorant Garamond + Outfit via `next/font/google` in `layout.tsx` |
| Firebase | `firebase` ^12.11 — Firestore (`db`) and Storage (`storage`) |
| Tooling | ESLint 9 + `eslint-config-next`; **tsx** (devDep) to run `seed.ts` |

---

## Firebase (`src/lib/firebase.ts`)

- Single app instance via `getApps()` / `initializeApp` to avoid duplicate-app errors in dev HMR.
- Config from `NEXT_PUBLIC_FIREBASE_*` env vars (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId).
- Exports: `db` (Firestore), `storage` (Firebase Storage), default `app`.

---

## Firestore data model (`site` collection)

Each document id is a fixed slug; admin and public UI expect these shapes (see `seed.ts` for defaults).

| Document | Purpose |
|----------|---------|
| `site/board` | `members[]` — id, name, role, email, affiliation, photo URL, initials |
| `site/events` | `expo` (name, year, venue, date, time, description, counts, image), `gala` (name, description, image), `meetings[]` (id, title, description, tag) |
| `site/membership` | `dues` (full, affiliate, sponsor), `deadline`, `deadlineYear`, `qualifications[]` |
| `site/sponsors` | `logos[]`, `galleryImages[]` (URLs; used for sponsor logos and horizontal galleries) |
| `site/contacts` | `emails` (membership, corporateAmbassador, publicRelations, president, lesClefs), `socials`, `address`, `website` |
| `site/content` | `hero` (tagline, title lines, description, stats[], badge, image), `president`, `mission`, `copyrightYear` |
| `site/settings` | Feature toggles: `showExpo`, `showGala`, `showDeadlineBanner`, `showSponsorLogos`; `adminPassword` (plain string used for admin login) |

**Seeding:** run with `npx tsx src/lib/seed.ts` (not wired as an npm script). `seed.ts` duplicates Firebase web config in source for the script runtime—treat as sensitive and prefer env-only config for production workflows.

---

## Public site ↔ CMS (`SiteDataContext` + components)

- **`useSiteData()`** reads `board`, `events`, `membership`, `sponsors`, `contacts`, `content`, `settings`, and `loading` from React context.
- **`SiteDataProvider`** subscribes with `onSnapshot` to all seven `site/*` documents and updates context in real time.

**Components that call `useSiteData()`** (merge Firestore with local fallbacks): `Hero`, `About`, `Expo`, `Board`, `Mission`, `President`, `ContactBand`, `Footer`, `CTA`, `Gallery`, `Membership`, event blocks (`ExpoFeature`, `ExpoStats`, `Meetings`, `HostEvent`, `WinterGala`, `Calendar`, `EventsCTA`), membership blocks (`MembershipTiers`, `Qualifications`, `MembershipBenefits`, `HowToApply`, `HotelManagement`, `DeadlineBanner`, `MembershipCTA`), sponsor blocks (`WhyPartner`, `SponsorTiers`, `SponsorsGallery`, `HowToSponsor`, `Ambassador`, `LogoPlaceholders`, `SponsorCTA`), and contact blocks (`ContactMain`, `Directory`, `QuickLinks`, `ContactCTA`).

**Still static (no `useSiteData`)** examples: `Benefits`, `Ethics`, `LesClefs`, `Nav` (hardcoded nav links).

**Layout wiring:** `SiteDataProvider` is **not** imported in `src/app/layout.tsx`. Until a client `Providers` wrapper mounts it around `{children}`, context stays at the **default** value (all `null`, `loading: true`), so the public site shows **built-in fallback copy** rather than live Firestore—admin edits will not appear on the marketing pages until the provider wraps the app.

---

## Admin (`/admin`)

- **Route:** `src/app/admin/page.tsx` — client-only admin shell.
- **Auth:** Password compared on the client to `settings.adminPassword` from Firestore (fallback `"laca2025admin"` while settings load). On success, `sessionStorage.setItem("laca-admin", "true")`. **Not** Firebase Authentication; password is stored in Firestore as plaintext.
- **UX:** Loading gate while `settings` loads; sidebar grouped into Overview / Content / Settings; “View Live Site” opens `/` in a new tab.
- **Data access:** Editors use `useSiteDoc` / `saveSiteDoc` from `hooks.ts` (per-document listeners and `setDoc(..., { merge: true })`).

### Admin components

| File | Role |
|------|------|
| `AdminLogin.tsx` | Branded login card, show/hide password, Enter to submit |
| `Dashboard.tsx` | Cards linking to sections; shows counts from board/sponsors/contacts |
| `BoardEditor.tsx` | CRUD-style editing for board `members` + image upload |
| `EventsEditor.tsx` | Expo, gala, meetings |
| `MembershipEditor.tsx` | Dues, deadline, qualifications list |
| `SponsorsEditor.tsx` | Sponsor logos and gallery image lists |
| `ContactsEditor.tsx` | Emails, social URLs, address, website |
| `SiteEditor.tsx` | Tabs: hero, president’s note, mission; modals for detailed fields; `copyrightYear`; saves whole `content` doc |
| `SettingsEditor.tsx` | Toggles (expo / gala / deadline banner / sponsor logos), change admin password (min 8 chars), logout (clears sessionStorage, reload) |
| `AdminModal.tsx` | Overlay modal, locks body scroll while open |
| `ImageUpload.tsx` | Client upload to Storage (`uploadBytes` + `getDownloadURL`); 5 MB max, images only; path `folder/timestamp-sanitizedname` |

---

## `src/lib/hooks.ts`

- **`useSiteDoc(docId)`** — real-time `onSnapshot` on `site/{docId}`.
- **`fetchSiteDoc(docId)`** — one-time `getDoc`.
- **`saveSiteDoc(docId, data)`** — `setDoc` with `{ merge: true }`.

---

## Public pages (unchanged routing)

| Route | Composition |
|-------|-------------|
| `/` | Nav + Hero, About, Expo, Benefits, Membership, Gallery, CTA, Footer + home fade-in observer |
| `/about` | Nav + about PageHero, Mission, President, Board, Ethics, LesClefs, ContactBand, Footer |
| `/events` | Nav + shared PageHero + Expo/Gala/Meetings/Host/Winter/Calendar/Events CTA, Footer |
| `/membership` | Nav + PageHero + tiers, qualifications, benefits, how to apply, hotel mgmt, deadline, CTA, Footer |
| `/sponsors` | Nav + PageHero + why partner, tiers, gallery, how to sponsor, ambassador, logos, CTA, Footer |
| `/contact` | Nav + PageHero + ContactMain, Directory, QuickLinks, ContactCTA, Footer |

Inner pages keep scroll-to-top and the same `IntersectionObserver` + `.fade-in` pattern as home where implemented.

---

## Forms on the marketing site

`Membership.tsx` (home) and `ContactMain.tsx` (contact) still expose **UI-only** inquiry forms (no API route, email send, or server action).

---

## Security and ops notes (for maintainers)

- Admin gate is **client-side password check** + sessionStorage; `adminPassword` lives in Firestore.
- **`seed.ts`** contains a copy of Firebase web API credentials in source—avoid committing real production keys in tracked files; rotate if exposed.
- Storage uploads require **Firebase Storage rules** allowing writes for admin usage (not described in this repo).
- Firestore **security rules** must restrict writes to trusted admins; public reads may be allowed for `site/*` if the provider is mounted.

---

## Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Dev server |
| `npm run build` / `npm run start` | Production build / serve |
| `npm run lint` | ESLint |
| `npx tsx src/lib/seed.ts` | Seed Firestore (manual; requires network + valid project) |

---

*Update this file when you add routes, providers, or change the Firestore schema.*
