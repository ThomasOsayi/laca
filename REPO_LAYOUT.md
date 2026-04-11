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
│   └── file.svg, globe.svg, next.svg, vercel.svg, window.svg
└── src/
    ├── app/
    │   ├── favicon.ico
    │   ├── globals.css           # ~2 150 lines: design tokens, marketing, admin, special-events, mobile overrides
    │   ├── layout.tsx            # Fonts, metadata/OG, SiteDataProvider wraps body
    │   ├── page.tsx              # Home
    │   ├── about/page.tsx
    │   ├── contact/page.tsx
    │   ├── events/page.tsx       # Includes SpecialEvents between WinterGala and Calendar
    │   ├── membership/page.tsx
    │   ├── sponsors/page.tsx
    │   └── admin/
    │       ├── page.tsx          # Login gate, sidebar nav, tab panels
    │       └── components/
    │           ├── AdminLogin.tsx
    │           ├── AdminModal.tsx    # Overlay, Esc to close, Save & Close runs onSave + onClose
    │           ├── Dashboard.tsx     # Welcome, “Needs Attention”, shortcut cards, Preview Site
    │           ├── BoardEditor.tsx   # members CRUD; edit modal: grouped Photo + Member Details
    │           ├── EventsEditor.tsx  # Tabs: Expo, Winter Gala, Monthly Meetings, Special Events
    │           ├── MembershipEditor.tsx
    │           ├── SponsorsEditor.tsx
    │           ├── ContactsEditor.tsx
    │           ├── SiteEditor.tsx    # Hero / president / mission / copyright (large editor)
    │           ├── SettingsEditor.tsx # Section visibility toggles, admin password, logout
    │           └── ImageUpload.tsx   # Storage upload; optional empty label (section title outside)
    ├── components/
    │   ├── Nav.tsx, Footer.tsx, Hero, About, Expo, Benefits, Membership, Gallery, CTA
    │   ├── about/, contact/, events/, membership/, sponsors/, shared/
    │   └── events/SpecialEvents.tsx  # Renders events.specialEvents from Firestore; hidden if empty
    └── lib/
        ├── firebase.ts
        ├── hooks.ts                # useSiteDoc, fetchSiteDoc, saveSiteDoc
        ├── SiteDataContext.tsx     # SiteDataProvider + useSiteData (7 × onSnapshot on site/*)
        └── seed.ts                 # Seeds all site docs including specialEvents: []
```

---

## Tech stack

| Layer | Detail |
|--------|--------|
| App | Next.js 16.2.2, App Router (`src/app/`) |
| UI | React 19.2.4, TypeScript 5 |
| Styling | Tailwind v4 (`@tailwindcss/postcss`) + monolithic `globals.css` |
| Fonts | Cormorant Garamond + Outfit via `next/font/google` |
| Images | `next.config.ts` — `remotePatterns` for `images.unsplash.com` |
| Backend | Firebase 12 — Firestore + Storage; web config via `NEXT_PUBLIC_*` |
| Tooling | ESLint + `eslint-config-next`; **tsx** to run `src/lib/seed.ts` |

---

## Root layout

`layout.tsx` sets `lang`, font CSS variables, global CSS, static **metadata** and **Open Graph** (thelaca.com), and wraps **`SiteDataProvider`** around `{children}` so every route receives live `site/*` snapshots.

---

## Firebase (`src/lib/firebase.ts`)

Single app instance (`getApps` / `initializeApp`). Exports **`db`**, **`storage`**, default **`app`**. Config from environment variables only in app code.

---

## Firestore — `site` collection

| Document | Contents (high level) |
|----------|------------------------|
| **`board`** | `members[]`: `id`, `name`, `role`, `email`, `affiliation`, `photo` URL, `initials` |
| **`events`** | `expo`, `gala`, `meetings[]`, **`specialEvents[]`** — each special event: `id`, `title`, `date`, `time`, `venue`, `description`, `image` |
| **`membership`** | `dues`, `deadline`, `deadlineYear`, `qualifications[]` |
| **`sponsors`** | `logos[]`, `galleryImages[]` (URLs) |
| **`contacts`** | `emails`, `socials`, `address`, `website` |
| **`content`** | `hero`, `president`, `mission`, `copyrightYear` |
| **`settings`** | `showExpo`, `showGala`, `showDeadlineBanner`, `showSponsorLogos`, `adminPassword` |

**Seed:** `npx tsx src/lib/seed.ts` writes defaults including **`specialEvents: []`**. `seed.ts` embeds a Firebase web config for the CLI — treat as sensitive.

---

## Public site and CMS

**`SiteDataProvider`** listens to all seven documents; **`useSiteData()`** returns `{ board, events, membership, sponsors, contacts, content, settings, loading }`. Most public sections merge Firestore with **hardcoded fallbacks**; few components read **`loading`**.

**`useSiteData()` consumers** include: `Hero`, `About`, `Expo`, `Board`, `Mission`, `President`, `ContactBand`, `Footer`, `CTA`, `Gallery`, `Membership`, all major **`events/*`** blocks (`ExpoFeature`, `ExpoStats`, `Meetings`, `HostEvent`, `WinterGala`, **`SpecialEvents`**, `Calendar`, `EventsCTA`), membership and sponsor blocks, and contact blocks.

**`SpecialEvents`** — reads **`events.specialEvents`**; renders a titled grid (`.special-events`, `.se-card`, date badge, venue/time row). Returns **`null`** when the array is empty.

**Still static (examples):** `Benefits`, `Ethics`, `LesClefs`, **`Nav`** (links, logo, mobile menu; **`useEffect` on `pathname`** closes mobile menu and clears body overflow).

---

## Public routes

| Route | Sections (order) |
|-------|-------------------|
| `/` | Nav → Hero, About, Expo, Benefits, Membership, Gallery, CTA, Footer + fade-in observer |
| `/about` | Nav → about PageHero, Mission, President, Board, Ethics, LesClefs, ContactBand, Footer |
| `/events` | Nav → PageHero → ExpoFeature, ExpoStats, Meetings, HostEvent, WinterGala, **SpecialEvents**, Calendar, EventsCTA, Footer |
| `/membership` | Nav → PageHero → tiers, qualifications, benefits, how to apply, hotel, deadline, CTA, Footer |
| `/sponsors` | Nav → PageHero → partner story, tiers, gallery, how to sponsor, ambassador, logos, CTA, Footer |
| `/contact` | Nav → PageHero → ContactMain, Directory, QuickLinks, ContactCTA, Footer |

Shared **`PageHero`**: breadcrumb, label, title + `<em>`, description, optional `bgImage`. About uses **`about/PageHero`** as a thin wrapper.

---

## Admin (`/admin`)

- **Auth:** Client compares password to **`settings.adminPassword`** (fallback while loading); **`sessionStorage`** flag **`laca-admin`**. Not Firebase Auth.
- **Shell:** `admin/page.tsx` — loads settings first, then login or sidebar + main panel. **NAV_ITEMS**: Dashboard, Board, Events, Membership, Sponsors, Contacts, Site Content, Settings.
- **Data:** Editors use **`useSiteDoc`** / **`saveSiteDoc`** (`setDoc` with `{ merge: true }`).

### Editors (behavioral notes)

| Component | Role |
|-----------|------|
| **Dashboard** | Subscribes to board, contacts, sponsors, events; **“Needs Attention”** (e.g. no logos, Expo TBA, missing board photos); metric cards; **Preview Site** |
| **BoardEditor** | List/edit/delete members; **AdminModal** with cream **Photo** block (`ImageUpload`, circle preview) and **Member Details** (name, role `<select>`, email, affiliation) |
| **EventsEditor** | **Four tabs:** Expo, Winter Gala, Monthly Meetings, **Special Events**. Card previews + modals with grouped cream sections (Event Details / Description / Stats / Image for Expo; similar for Gala and Special Event). CRUD for **`meetings`** and **`specialEvents`**; **`toSpecialEvents`** normalizes arrays. **`ReactElement`** for icon maps (no `JSX` namespace). Save persists **`{ expo, gala, meetings, specialEvents }`**. |
| **MembershipEditor**, **SponsorsEditor**, **ContactsEditor** | Structured fields for respective `site/*` docs |
| **SiteEditor** | Multi-tab / modal editing for **`site/content`** |
| **SettingsEditor** | **ToggleCard** UI for section visibility; save toggles batch; change admin password (min 8 chars); logout |
| **AdminModal** | Body scroll lock; **Escape** closes; footer **Save & Close** |
| **ImageUpload** | Firebase Storage upload; 5 MB, images only; **`label=""`** when section title is outside the component |

---

## Marketing forms

**`Membership`** (home) and **`ContactMain`** — presentational inquiry forms only (no API, email pipe, or server actions).

---

## CSS highlights (`globals.css`)

- **CSS variables** — gold/navy/cream palette, shadows, radii, fonts.
- **Marketing** — hero, sections, buttons, gallery scroll, page hero, etc.
- **`.special-events*`** and **`.se-*`** — public Special Events grid and cards.
- **Admin** — `.admin-layout`, `.sidebar`, `.tabs`, `.card`, `.field-row`, `.btn-add` (including **`.btn-add svg`** explicit size), toggles, login screen, modals, dashboard cards.
- **Mobile** — large trailing block with `!important` overrides for containers and breakpoints.

---

## Security and ops

- Admin password stored **in Firestore** as plaintext; gate is **client-only**.
- **Firestore** and **Storage** rules must be configured for production (public read of `site/*` if desired; writes restricted).
- **`seed.ts`** contains embedded credentials — rotate if exposed.

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` / `npm run start` | Production build / serve |
| `npm run lint` | ESLint |
| `npx tsx src/lib/seed.ts` | Seed Firestore |

---

*Update this file when you add routes, Firestore fields, or major UI surfaces.*
