# StackGuard Frontend

> **Task:** Implement authentication/user flow for StackGuard frontend (Sign-In/Sign-Up, Configuration, Dashboard) and deploy to Vercel. This README documents setup, structure, validation rules, and deployment steps.


## Project Overview

This frontend implements the following flow required by the task:

1. **Sign-In / Sign-Up (Public route)**

   * Single public page where the user can toggle between Sign-In and Sign-Up.
   * Input validation (email format, password strength, required fields).
2. **Configuration (Protected route)**

   * After authentication users are redirected to a configuration page that requires entering a configuration key (string length between **100 and 1000 characters**).
   * The configuration page is a protected route — users cannot access the Dashboard until they provide a valid configuration key.
3. **Dashboard (Private route)**

   * Basic dashboard page that displays a `Dashboard Page` heading. Accessible only after both authentication and providing the configuration key.

Design reference: [https://www.figma.com/design/ZaJtOkR5AQxfic3cNhgCjN/Untitled?node-id=0-1&t=hghlYCOrIqMnRGCm-1](https://www.figma.com/design/ZaJtOkR5AQxfic3cNhgCjN/Untitled?node-id=0-1&t=hghlYCOrIqMnRGCm-1)

## Features

* Toggle-able Sign-In / Sign-Up UI (client-side validation)
* Protected routing for Configuration & Dashboard pages
* Configuration key validation (100–1000 characters)
* Simple stateless mock authentication (example provided; swap for real auth back-end easily)
* Clean component structure and sample usage of a component library (suggested: `shadcn/ui` or `Ant Design`)
* Instructions for deployment to Vercel and pushing to GitHub


## Tech Stack (suggested)

* React (Vite or Create React App) or Next.js
* React Router (for CRA/Vite) or Next.js built-in routing
* Optional: `shadcn/ui` or `antd` for components
* Tailwind CSS for quick styling (optional)

> The README uses generic commands; adjust if you scaffolded with Next.js.


## Quick Start (local)

1. **Clone**

```bash
git clone <your-github-repo-url>
cd stackguard-frontend
```

2. **Install**

```bash
npm install
# or
yarn
```

3. **Environment**

Create a `.env.local` file at project root. Example variables used by the sample app:

```env
VITE_API_URL=http://localhost:4000
# or for Next.js
NEXT_PUBLIC_API_URL=http://localhost:4000
```

4. **Run (development)**

```bash
npm run dev
# or
npm start
```

5. **Build**

```bash
npm run build
npm run start:prod
```


## Validation Rules

* **Email**: must be a valid email format.
* **Password**: minimum 8 characters; should include letters and numbers (you can add stronger rules if required).
* **Configuration Key**: must be a string with **length between 100 and 1000 characters**. Block navigation to Dashboard if not valid.

Client-side validation feedback should be visible and user-friendly (inline errors, disabled submit buttons when invalid).


## Routing & Auth Flow (implementation notes)

* Public route: `/auth` (Sign-In / Sign-Up toggle)
* Protected route: `/config` (Configuration page)
* Private route: `/dashboard` (only accessible when auth + valid config key exist)

Suggested route guard approach:

* Keep a minimal auth state in `localStorage` or React Context: e.g. `{ isAuthenticated: true, user: { ... } }`.
* After successful sign-in / sign-up, set `isAuthenticated = true` and redirect to `/config`.
* In `/config`, validate the configuration key. When valid, save it (e.g. `localStorage.setItem('stackguard_config_key', key)`) and redirect to `/dashboard`.
* Protected route wrapper: check `isAuthenticated` and presence/validity of config key; otherwise redirect to `/auth` or `/config`.

Security note: localStorage is used here for demonstration only. For production, use secure, HttpOnly cookies and a real backend.


## Suggested Folder Structure

```
stackguard-frontend/
├─ public/
├─ src/
│  ├─ components/        # Reusable UI components (Inputs, Buttons, Form validators)
│  ├─ pages/
│  │  ├─ Auth/           # SignInSignUp component + subcomponents
│  │  ├─ Config/         # Configuration page and form
│  │  └─ Dashboard/      # Dashboard page
│  ├─ routes/            # Route guards and route definitions (if using react-router)
│  ├─ context/           # Auth and Config context providers
│  ├─ utils/             # helpers and validators
│  ├─ styles/            # global CSS / tailwind
│  └─ main.jsx
├─ .env.local
├─ package.json
└─ README.md
```

## Component & Code Style Tips

* Keep forms small and focused. Separate validation logic into `utils/validators.js`.
* Create `ProtectedRoute` and `ConfigRequiredRoute` wrappers to avoid duplicating guards.
* Use small presentational components (e.g. `FormField`, `ToggleAuthMode`) to simplify tests and reuse.
* Keep side effects in hooks (e.g. `useAuth`, `useConfigKey`) for clarity.


## Example pseudo-code for route guard (React Router)

```jsx
// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
}

// ConfigRequiredRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ConfigRequiredRoute({ children }) {
  const key = localStorage.getItem('stackguard_config_key');
  if (!key || key.length < 100 || key.length > 1000) {
    return <Navigate to="/config" replace />;
  }
  return children;

```


## UX Enhancements (good-to-have)

* Inline field hints and real-time validation feedback.
* Show a progress indicator during authentication and redirects.
* Remember the user preference (keep me signed in) with a clear expiry strategy.
* Copy-to-clipboard helper for the configuration key preview area (if necessary).
* Component library: using `shadcn/ui` or `antd` will quickly make forms look polished.



## Deployment to Vercel

1. Push your code to GitHub: `git push origin main`.
2. Go to [https://vercel.com](https://vercel.com) and import your GitHub repository.
3. Set up environment variables in Vercel dashboard (e.g., `VITE_API_URL` or `NEXT_PUBLIC_API_URL`).
4. Select the proper framework preset (Next.js, Vite, Create React App) — Vercel auto-detects in most cases.
5. Deploy. Vercel will provide a production URL. Share this URL along with your GitHub repo.

**Tip:** Ensure your `package.json` contains correct build scripts:

```json
"scripts": {
  "dev": "vite",
  "start": "vite preview",
  "build": "vite build"
}


How to test:
1. Open the Auth page: /auth
2. Use the Sign-Up or Sign-In form (mock credentials are accepted)
3. After sign-in, you will be redirected to /config — enter a config key between 100 and 1000 characters.
4. Once the config key is accepted, you'll be forwarded to /dashboard.



---

## Contact

If you want me to generate a sample GitHub repo structure or a starter codebase with this flow implemented (including example components and route guards), reply and I can scaffold a ready-to-deploy template for you.
