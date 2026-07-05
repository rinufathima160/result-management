# Greenfield Public School — Result Management System

A frontend-only school examination result management system built with React 19, Vite,
React Router DOM, and Bootstrap 5.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Demo credentials (Admin / Office Login)

- Username: `admin`
- Password: `admin123`

## Try the sample data

Seeded results are already loaded for:

| Exam         | Class | Division | Roll numbers |
|--------------|-------|----------|--------------|
| Mid Term 1   | 8     | A        | 1–5          |
| Mid Term 1   | 9     | B        | 1–2          |
| Final Exam   | 10    | A        | 1–3          |

Go to the homepage → **Check Examination Results** → pick an exam card → search using the
table above. Any other class/division combination will correctly show **"No Result Found"**
until an admin creates a table for it.

## Project structure

```
src/
  assets/          static images (placeholder)
  components/      reusable UI: Navbar, Footer, ExamCard, ResultSlip, SchoolSeal, etc.
  layouts/         MainLayout (public site) and AdminLayout (office console)
  pages/
    Home/          public school homepage
    Results/       student result search (/results/:examId)
    Admin/         login, dashboard, and exam management screens
  routes/          AppRoutes.jsx — all route definitions in one place
  utils/           auth.js, gradeUtils.js, resultTablesStore.js
  data/            mock JSON-like data (exams, seeded results, school info)
  styles/          design tokens (variables.css) and global styles
```

## How this is wired for a real backend later

Nothing in this project talks to `localStorage` or mock data directly from a page component —
everything goes through small service modules, which is what makes swapping in a real
Node.js + Express + MongoDB API straightforward:

- **`src/utils/auth.js`** — `login()` currently checks a hardcoded username/password and stores
  a fake token in `sessionStorage`. Replace the body with a `fetch('/api/auth/login')` call and
  store the real JWT the same way. `isAuthenticated()` and `getSession()` don't need to change
  their signatures.
- **`src/utils/resultTablesStore.js`** — reads/writes result tables. Today it falls back to the
  seed data in `src/data/mockResults.js` and persists admin edits to `localStorage` so the demo
  works statefully with zero backend. Each exported function (`getTable`, `createTable`,
  `addStudent`, `updateStudentMarks`, `findStudent`) maps one-to-one onto a REST endpoint, listed
  in the comments at the top of the file.
- **`src/utils/gradeUtils.js`** — pure grading functions with no dependency on storage, so the
  exact same rules can be copied into an Express service or a Mongoose virtual without behaviour
  drifting between client and server.
- **`ProtectedRoute`** — currently guards `/admin/dashboard` and `/admin/manage/:examId` based on
  `isAuthenticated()`. Once real JWTs exist, this only needs to start checking token expiry.

## Notes

- All data is mock/in-memory plus `localStorage` — refreshing the page keeps admin edits, but
  clearing browser storage resets everything back to the seed data.
- Print buttons use the browser's native print dialog (`window.print()`); print-only styling is
  in `src/styles/global.css` under the `@media print` block.
