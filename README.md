# Academic Portal

A full-featured academic management portal for students, teachers, and admins — built with Next.js, Redux Toolkit, and Tailwind CSS.

🌐 **Live Demo:** [https://academic-1.netlify.app](https://academic-1.netlify.app)

---

## Features

### Authentication

- Student signup with registration number, department, and school email validation
- Student and Teacher/Admin login with tab-based role switching
- Forgot password flow with modal (student and teacher)
- Account approval system — new student accounts require admin approval

### Dashboards

- **Student Dashboard** — overview, courses, grades, attendance, assignments, schedule, leave requests
- **Teacher Dashboard** — classes, students, grades, attendance, assignments, leaves
- **Admin Dashboard** — student/teacher approvals, management modules, charts and analytics
- Unified dashboard layout with responsive sidebar navigation

### Signup Flow

- Student signup at `/Signup`
- Teacher/Admin signup at `/TeacherSignup`
- Both forms use internal hidden scroll — card height stays fixed, no page scroll
- Tab switcher to move between Student and Teacher/Admin forms

---

## Tech Stack

| Tech          | Version |
| ------------- | ------- |
| Next.js       | 16.2.9  |
| React         | 19.2.0  |
| Redux Toolkit | ^2.11.1 |
| redux-persist | ^6.0.0  |
| Tailwind CSS  | ^4      |
| ECharts       | ^6.0.0  |
| Lucide React  | ^1.21.0 |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## Project Structure

```
src/
├── pages/
│   ├── index.js                  # Landing / redirect
│   ├── Login/                    # Login page (student + teacher/admin tabs)
│   ├── Signup/                   # Student & teacher signup with tab switcher
│   ├── TeacherSignup/            # Teacher signup (tab-based, teacher default)
│   ├── Dashboard/                # Unified dashboard router
│   └── api/                      # API routes (students, teachers)
├── components/
│   ├── LoginForm/                # Login form fields
│   ├── LoginTabs/                # Student / Teacher-Admin tab switcher
│   ├── SignupForm/               # Student registration form
│   ├── SignupTabs/               # Student / Teacher-Admin tab switcher
│   ├── TeacherSignupForm/        # Teacher registration form
│   ├── FormField/                # Reusable TextInput, PasswordInput, SelectInput
│   ├── ForgotPasswordModal/      # Forgot password modal
│   ├── Toast/                    # Toast notification component
│   ├── AccountCreatedSuccess/    # Success modal after signup
│   ├── ApprovalPending/          # Pending approval screen
│   ├── UnifiedDashboard/         # Dashboard layout, sidebar, header
│   ├── StudentDashboard/         # Student dashboard modules
│   ├── AdminDashboard/           # Admin dashboard modules
│   ├── Dashboard/                # Teacher dashboard modules
│   ├── DashboardCard/            # Reusable dashboard stat card
│   └── AdminChart/               # Admin analytics charts (ECharts)
├── redux/
│   ├── slices/
│   │   ├── authSlice.js          # Auth state (login, logout, users)
│   │   ├── signupSlice.js        # Student signup form state
│   │   ├── teacherSignupSlice.js # Teacher signup form state
│   │   ├── leavesSlice.js        # Leave requests state
│   │   └── uiSlice.js            # UI state (sidebar, active module)
│   └── store/index.js            # Redux store with redux-persist
├── hooks/
│   ├── useLogin.js               # Login logic hook
│   ├── useScreenSize.js          # Responsive breakpoints hook
│   └── useToast.js               # Toast notification hook
├── utils/
│   ├── validations.js            # Form validation helpers
│   └── dashboard/dataHelpers.js  # Dashboard data utilities
├── data/
│   ├── students.json             # Persisted student records
│   └── teachers.json             # Persisted teacher records
└── styles/
    └── globals.css               # Global styles + Tailwind imports
```

---

## Test Accounts

**Admin / Teacher:**
| Email | Password | Role |
|---|---|---|
| `admin@school.edu` | `admin123` | Admin |
| `teacher@school.edu` | `teach123` | Teacher |

**Student:** Register a new account at `/Signup` using a `@school.edu` email. Account requires admin approval before login.

---

## Deployment

Deployed on **Netlify** via GitHub continuous deployment from the `academic-portal` branch.

[![Netlify Status](https://api.netlify.com/api/v1/badges/academic-1/deploy-status)](https://academic-1.netlify.app)
