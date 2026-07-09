# Academic Portal — Project Notes

**Last Updated:** July 10, 2026
**Live URL:** https://academic-1.netlify.app
**Repository:** https://github.com/haseebfarooqi101/academic-portal
**Deploy Branch:** `academic-portal` (Netlify) / `master` (backup)

---

## Tech Stack

- **Next.js** 16.2.9 (Pages Router, Webpack)
- **React** 19.2.0
- **Redux Toolkit** ^2.11.1 + redux-persist ^6.0.0
- **Tailwind CSS** v4 + @tailwindcss/postcss
- **ECharts** ^6.0.0 (admin analytics charts)
- **Lucide React** ^1.21.0 (icons)
- **Netlify** + @netlify/plugin-nextjs for deployment

---

## ✅ Completed Features

### Auth & Signup

- Student signup (`/Signup`) — name, registration number, email, department, password
- Teacher signup (`/TeacherSignup`) — name, email, department, password
- Both pages: tab switcher (Student / Teacher Admin), internal scroll on fields, fixed card height, no page scroll
- Login (`/Login`) — student and teacher/admin tabs, forgot password modal
- Account approval flow — students start as `status: "pending"`, admin must approve
- Redux-persist — auth state survives page refresh
- Cross-tab sync — leave state syncs across browser tabs via localStorage events

### Dashboards

- **Unified dashboard layout** — responsive sidebar, header, module routing
- **Student Dashboard** — overview stats, courses, grades, attendance, assignments, schedule, leave requests
- **Teacher Dashboard** — classes, students, grades, attendance, assignments, leave management
- **Admin Dashboard** — approvals module, students module, teachers module, overview with ECharts analytics

### API Routes

- `POST /api/students` — saves new student to `students.json`
- `POST /api/teachers` — saves new teacher to `teachers.json`
- `GET /api/students` — returns all students

### UI Components

- `FormField` — `TextInput`, `PasswordInput`, `SelectInput` with error states and focus styles
- `Toast` — error/success notifications
- `AccountCreatedSuccess` — post-signup success modal
- `ApprovalPending` — shown when student account is awaiting admin approval
- `ForgotPasswordModal` — email + new password + confirm, updates Redux store
- `DashboardCard` — reusable stat card for dashboards
- `AdminChart` — ECharts wrapper for admin analytics

---

## 📂 Key File Map

| File                                | Purpose                                                               |
| ----------------------------------- | --------------------------------------------------------------------- |
| `src/pages/Login/index.js`          | Login page — student + teacher/admin tabs                             |
| `src/pages/Signup/index.js`         | Signup page — student + teacher tabs, defaults to student             |
| `src/pages/TeacherSignup/index.js`  | Teacher signup — same layout, defaults to teacher tab                 |
| `src/pages/Dashboard/index.js`      | Dashboard router — renders correct dashboard by role                  |
| `src/components/UnifiedDashboard/`  | Layout, sidebar, header shared by all dashboards                      |
| `src/components/FormField/index.js` | All input field components                                            |
| `src/redux/slices/authSlice.js`     | Auth state — login, logout, users, password updates                   |
| `src/redux/slices/leavesSlice.js`   | Leave requests state                                                  |
| `src/redux/store/index.js`          | Redux store + redux-persist config                                    |
| `src/hooks/useScreenSize.js`        | Responsive breakpoints (mobile < 768, tablet 768–1024, desktop 1024+) |
| `src/hooks/useLogin.js`             | Login submit logic                                                    |
| `src/utils/validations.js`          | `validateForm()`, `validatePasswordConfirmation()`                    |
| `src/data/students.json`            | Persisted student records (written by API)                            |
| `src/data/teachers.json`            | Persisted teacher records (written by API)                            |

---

## 🎨 Design Patterns

### Page Layout (Login / Signup / TeacherSignup)

All auth pages follow the same card pattern:

- Container: `min-h-screen flex justify-center items-end overflow-hidden`
- Card: `flex flex-col h-[calc(100vh-Xpx)] max-h-[672px] overflow-hidden`
- Content: `flex flex-col flex-1 min-h-0`
- Header (logo + title + tabs): `shrink-0`
- Forms container: `flex-1 min-h-0`
- Form outer div: `flex flex-col flex-1 min-h-0 w-full`
- Scroll area: `overflow-y-auto` with fixed `height: 290px` — hidden scrollbar
- Button footer: `shrink-0`

### Responsive Breakpoints (`useScreenSize`)

- Mobile: `width < 768`
- Tablet: `768 <= width < 1024`
- Desktop: `width >= 1024`

### Colors

- Primary: `#8A36D0` (purple)
- Text primary: `#09090B`
- Text secondary: `#5C5E63`
- Border: `#DBE0E6`
- Error: `#EF4444`

---

## 🚀 Running Locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

```bash
npm run build   # production build
npm start       # production server
```

---

## 🚀 Deployment

- **Netlify** auto-deploys on push to `academic-portal` branch
- `netlify.toml` — build command: `npm run build`, publish: `.next`
- Plugin: `@netlify/plugin-nextjs`

To deploy latest changes:

```bash
git add -A
git commit -m "your message"
git push origin academic-portal
```

---

## 🧪 Test Accounts

| Role    | Email                 | Password             |
| ------- | --------------------- | -------------------- |
| Admin   | `admin@school.edu`    | `admin123`           |
| Teacher | `teacher@school.edu`  | `teach123`           |
| Student | Register at `/Signup` | Needs admin approval |

---

## ⚠️ Known Limitations

- Student accounts require admin approval — new signups can't login immediately
- Data persisted in `students.json` / `teachers.json` via API — works on local, on Netlify these files reset on each deploy (serverless limitation)
- Redux-persist stores auth state in localStorage — clearing browser data logs user out
- No email sending — "confirmation email" in forgot password flow is UI only

---

## 📌 Branch Strategy

| Branch            | Purpose                                             |
| ----------------- | --------------------------------------------------- |
| `academic-portal` | Main development branch — Netlify deploys from here |
| `master`          | Merged from academic-portal periodically            |
| `dev`             | Experimental features                               |
