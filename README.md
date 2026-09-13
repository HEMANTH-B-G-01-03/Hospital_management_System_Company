# NexusCare — Hospital Management System

A futuristic, fully-animated hospital management platform: React on the front end, Node.js/Express/MongoDB on the back end. All visuals — the 3D hospital model, DNA helix, animated charts, and payment card — are generated in code with React Three Fiber and SVG, so there are no external image or model files to source.

## What's inside

```
hms/
├── frontend/                  React + Vite + Tailwind + Framer Motion + React Three Fiber
│   └── src/
│       ├── components/        Navbar, Footer, cards, calendar, modals
│       │   └── three/         3D scenes: hospital hero, DNA helix, 3D chart, payment card
│       ├── pages/              Landing, Login, Signup, Dashboards, Appointments,
│       │                      Patient Records, Billing, Doctors, Reports, Settings
│       ├── context/            Auth + theme state
│       └── lib/                Demo data used by the UI
└── backend/                   Node.js + Express + Mongoose
    ├── models/                User, Doctor, Patient, Appointment, Billing
    ├── controllers/, routes/  REST API for auth, doctors, patients, appointments, billing
    ├── middleware/            JWT auth guard, role authorization, error handling
    └── seed.js                Populates MongoDB with demo doctors/patients/invoices
```

## Design direction

- **Palette** — near-black void background (`#060B14`) with a bio-teal (`#22E5C8`) and violet (`#7C6CFF`) accent pair, evoking monitoring displays and bioluminescence rather than a generic SaaS look.
- **Type** — Space Grotesk for display headings, Inter for body copy, JetBrains Mono for data labels.
- **Motion** — Framer Motion handles page transitions, card reveals, and the flip/drawer interactions; the 3D scenes run on React Three Fiber (Three.js) built entirely from primitive geometry, so nothing needs to be downloaded or licensed.

## Running the frontend

```bash
cd frontend
npm install
npm start        # alias not defined — use:
npm run dev
```

The app runs at `http://localhost:5173`. **The frontend works fully on its own** — authentication and all dashboards use an in-memory demo mode (any email/password signs you in), so you can explore the whole UI without standing up the backend or a database.

## Running the backend

```bash
cd backend
npm install
cp .env.example .env     # then edit MONGO_URI / JWT_SECRET if needed
npm run seed              # populates MongoDB with demo doctors, patients, appointments, invoices
node server.js            # or: npm run dev (requires nodemon, already in devDependencies)
```

The API runs at `http://localhost:5000`, and the frontend's Vite dev server proxies `/api/*` requests to it (see `frontend/vite.config.js`). You'll need a MongoDB instance — either local (`mongod`) or a free MongoDB Atlas cluster; put its connection string in `backend/.env` as `MONGO_URI`.

After seeding, you can log in against the real API with:
- **Admin:** `admin@nexuscare.dev` / `password123`

### API overview

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Create an account (patient/doctor/admin) |
| POST | `/api/auth/login` | Log in, returns a JWT |
| GET | `/api/auth/me` | Current user (requires `Authorization: Bearer <token>`) |
| GET | `/api/doctors` | List/search doctors |
| GET/POST/PUT/DELETE | `/api/patients` | Patient records CRUD |
| POST | `/api/patients/:id/history` | Append a note to a patient's history |
| GET/POST/PUT/DELETE | `/api/appointments` | Appointment booking, with double-booking prevention |
| GET | `/api/billing`, `/api/billing/summary` | Invoices and revenue summary |
| PUT | `/api/billing/:id/pay` | Mark an invoice paid |

### Wiring the frontend to the live API

The frontend currently ships with `AuthContext` resolving logins locally (demo mode) so the UI is explorable with zero setup. To point it at the real backend, swap the `login`/`signup` functions in `frontend/src/context/AuthContext.jsx` for `fetch('/api/auth/login', ...)` calls, and replace the arrays in `frontend/src/lib/mockData.js` with `fetch` calls to the corresponding endpoints above. The API shapes match the mock data field names closely to make this a mechanical change.

## Pages included

1. **Landing** — animated 3D hospital hero, feature grid, specialist preview, CTA
2. **Login / Signup** — DNA-helix background, glowing input fields, role selector
3. **Dashboard** — separate Admin, Doctor, and Patient views with live-feeling charts
4. **Appointments** — interactive weekly calendar with animated slot booking
5. **Patient Records** — searchable grid with a 3D "drawer-open" record modal
6. **Billing & Payments** — animated 3D credit card, invoice table, PDF/Excel export
7. **Doctor Directory** — filterable grid with flip-card hover reveal
8. **Reports & Analytics** — 3D animated bar chart, pie breakdown, PDF/Excel export
9. **Settings** — avatar accent picker, dark/light toggle, notification preferences

## Notes

- This is a demo-data build meant to be a complete, runnable starting point — swap the mock arrays and demo auth for real API calls as described above to go to production.
- All 3D content is procedural (Three.js primitives), so there's nothing to license or re-host.
