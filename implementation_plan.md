# Implementation Plan - Expense Management System (Full-Stack SQL + React)

A modern, feature-packed Expense Management System mini project featuring a full SQL database backend (Express.js + SQLite), interactive analytics charts, category budget tracking, transaction filtering, and a sleek, high-aesthetic responsive UI.

## Architecture Overview

```
Expense Management System/
├── backend/
│   ├── src/
│   │   ├── config/          # SQLite database connection & initialization
│   │   ├── database/        # SQL schema setup, migrations, initial seed data
│   │   ├── controllers/     # Express route handlers (Expenses, Budgets, Analytics)
│   │   ├── routes/          # API endpoint routes (/api/expenses, /api/budgets, etc.)
│   │   └── server.js        # Express app entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # UI Components (Dashboard, TransactionList, BudgetTracker, AnalyticsCharts, AddModal)
│   │   ├── api/             # Frontend API client service
│   │   ├── App.jsx          # Main layout & state orchestration
│   │   └── index.css        # Tailwind & custom glassmorphism styles
│   └── package.json
└── package.json            # Root runner (concurrently start backend & frontend)
```

---

## User Review Required

> [!NOTE]
> - **Database choice**: SQLite with `better-sqlite3` / `sqlite3` node package is used for zero-configuration SQL database execution on Windows, executing standard SQL queries (`CREATE TABLE`, `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `GROUP BY`, `SUM`, `strftime`).
> - **Sample Data**: A seed script will auto-generate realistic transaction data upon initial database creation so the dashboard is rich with data immediately.

---

## Proposed Features & Capabilities

1. **Dashboard Overview**:
   - High-level metric cards: **Total Income**, **Total Expense**, **Net Savings**, **Active Budget Progress**.
   - Interactive expense breakdown (Pie/Donut chart) & spending trends over time (Area/Bar chart).
   - Category budget health cards with visual progress bars and over-budget alerts.

2. **Full CRUD Transaction Management**:
   - Add, Edit, Delete expenses and income entries.
   - Assign categories (Food, Shopping, Housing, Transport, Utilities, Entertainment, Salary, Freelance, etc.).
   - Support payment methods (Credit Card, Debit Card, UPI / Cash, Net Banking).

3. **Advanced Filtering & Search**:
   - Filter by date range (This Month, Last 30 Days, Custom Range).
   - Filter by Category and Payment Method.
   - Real-time instant search by description or notes.

4. **Category & Budget Management**:
   - Custom category creation with icon and color customization.
   - Monthly budget cap settings per category with real-time percentage consumption tracking.

5. **Reports & Data Export**:
   - Summary reporting by category and payment mode.
   - One-click CSV export of transaction data.

6. **Design & UX**:
   - Dark & Light mode toggle with sleek glassmorphic card styling.
   - Responsive sidebar layout with smooth micro-animations.
   - Toast alerts for actions (add/edit/delete/budget alert).

---

## Proposed Changes

### Backend (Node.js + Express + SQL / SQLite)

#### [NEW] [backend/package.json](file:///c:/Users/amite/OneDrive/Desktop/Expense%20management%20system/backend/package.json)
- Setup dependencies: `express`, `sqlite3`, `cors`, `dotenv`, `nodemon`.

#### [NEW] [backend/src/config/db.js](file:///c:/Users/amite/OneDrive/Desktop/Expense%20management%20system/backend/src/config/db.js)
- SQLite database connection wrapper, enabling foreign keys, executing DDL schema definitions and seed queries.

#### [NEW] [backend/src/database/schema.sql](file:///c:/Users/amite/OneDrive/Desktop/Expense%20management%20system/backend/src/database/schema.sql)
- SQL schema tables:
  - `categories` (id, name, type ['expense'/'income'], color, icon)
  - `expenses` (id, title, amount, type ['expense'/'income'], category_id, payment_method, date, notes, created_at)
  - `budgets` (id, category_id, monthly_limit)

#### [NEW] [backend/src/controllers/expenseController.js](file:///c:/Users/amite/OneDrive/Desktop/Expense%20management%20system/backend/src/controllers/expenseController.js)
- SQL query execution for fetching expenses with filters, aggregations, insertion, updates, and deletion.

#### [NEW] [backend/src/controllers/analyticsController.js](file:///c:/Users/amite/OneDrive/Desktop/Expense%20management%20system/backend/src/controllers/analyticsController.js)
- SQL queries with `SUM()`, `GROUP BY`, and SQL date functions for generating analytics payloads.

#### [NEW] [backend/src/server.js](file:///c:/Users/amite/OneDrive/Desktop/Expense%20management%20system/backend/src/server.js)
- Main Express application initialization, middleware registration, CORS enablement, API routes mounting.

---

### Frontend (React + Vite + Tailwind CSS + Recharts + Lucide Icons)

#### [NEW] [frontend/package.json](file:///c:/Users/amite/OneDrive/Desktop/Expense%20management%20system/frontend/package.json)
- Vite React setup with Tailwind CSS, Lucide icons, Recharts, Axios / fetch.

#### [NEW] [frontend/src/components/Header.jsx](file:///c:/Users/amite/OneDrive/Desktop/Expense%20management%20system/frontend/src/components/Header.jsx)
- Top navbar with date display, dark mode toggle, quick add expense button, and user profile avatar.

#### [NEW] [frontend/src/components/Sidebar.jsx](file:///c:/Users/amite/OneDrive/Desktop/Expense%20management%20system/frontend/src/components/Sidebar.jsx)
- Sleek navigation menu with Dashboard, Transactions, Analytics, Budgets, and Settings links.

#### [NEW] [frontend/src/components/StatCards.jsx](file:///c:/Users/amite/OneDrive/Desktop/Expense%20management%20system/frontend/src/components/StatCards.jsx)
- Animated metric cards (Total Income, Total Expense, Net Balance, Savings Rate).

#### [NEW] [frontend/src/components/AnalyticsCharts.jsx](file:///c:/Users/amite/OneDrive/Desktop/Expense%20management%20system/frontend/src/components/AnalyticsCharts.jsx)
- Recharts visualizations: Expense by Category (Donut), Monthly Trend (Area Chart), Category Budget progress.

#### [NEW] [frontend/src/components/TransactionTable.jsx](file:///c:/Users/amite/OneDrive/Desktop/Expense%20management%20system/frontend/src/components/TransactionTable.jsx)
- Rich interactive data table with search, category filtering, sorting, edit, and delete functionality.

#### [NEW] [frontend/src/components/TransactionModal.jsx](file:///c:/Users/amite/OneDrive/Desktop/Expense%20management%20system/frontend/src/components/TransactionModal.jsx)
- Modal form for creating and editing expenses/income with validation and category selectors.

#### [NEW] [frontend/src/components/BudgetTracker.jsx](file:///c:/Users/amite/OneDrive/Desktop/Expense%20management%20system/frontend/src/components/BudgetTracker.jsx)
- Budget management panel to adjust limits and monitor spending thresholds per category.

---

## Verification Plan

### Automated / Syntax Verification
- Start Node.js backend server (`npm run dev` in backend) and verify database initialization and API health check endpoint.
- Build frontend (`npm run build` in frontend) to verify no compilation errors.

### Manual & Functional Verification
1. Launch full-stack application (Backend on port 5000, Frontend on port 5173).
2. Perform CRUD operations:
   - Add a new expense (e.g. ₹450 / $45 for Grocery in Food category).
   - Check if total expense updates immediately and charts re-render.
   - Edit transaction details and delete a test transaction.
3. Test Filters & Search:
   - Filter by date range (e.g., "This Month"), category ("Food"), and search keyword.
4. Test Budget alerts:
   - Exceed a category budget limit and verify warning badge / alert highlight.
5. Export CSV:
   - Click "Export CSV" and verify downloaded file output.
