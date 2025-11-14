# 🎯 Task Manager - Complete Full-Stack Application

A **production-ready Task Management Application** built with modern web technologies. This project demonstrates professional-grade architecture, state management, API mocking, and user experience design. Perfect for learning modern React patterns or as a foundation for real-world applications.

![Task Manager](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=400&fit=crop)

## 📖 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture Overview](#-architecture-overview)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Customization](#-customization)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

## ✨ Features

### 🔐 Authentication System
- **User Registration** - Create new accounts with username, email, and password
- **Secure Login** - JWT token-based authentication
- **Protected Routes** - Automatic redirect to login for unauthorized access
- **Session Persistence** - Auth state saved to localStorage
- **Multi-User Support** - Each user has their own task list
- **Demo Credentials** - Quick login with pre-configured test account

### 📋 Task Management
- **Full CRUD Operations** - Create, Read, Update, and Delete tasks
- **Task Properties**:
  - Title and description
  - Status: To Do, In Progress, Completed
  - Priority: Low, Medium, High
  - Automatic timestamps (created/updated)
- **Smart Filtering** - Filter by status with color-coded tabs
- **Task Statistics** - Dashboard shows total, completed, and in-progress counts
- **Sorted Display** - Tasks automatically sorted by creation date (newest first)

### 🎨 User Interface
- **Modern Design** - Clean, professional interface with shadcn/ui components
- **Dark Mode** - Toggle between light and dark themes with persistence
- **Responsive Layout** - Optimized for desktop, tablet, and mobile
- **Color-Coded Elements**:
  - Filter tabs (Blue, Gray, Yellow, Green)
  - Action buttons (Green for create, Red for delete)
  - Toast notifications (Success, Error, Info)
- **Smooth Animations** - Framer Motion for delightful interactions
- **Accessibility** - ARIA labels and keyboard navigation support

### 🛠️ Technical Features
- **Next.js 15** - Latest App Router with React Server Components
- **TypeScript** - Full type safety across the entire codebase
- **Redux Toolkit** - Efficient state management with async thunks
- **MSW (Mock Service Worker)** - Realistic API mocking without a backend
- **React Hook Form** - Performant form handling with validation
- **Zod** - Schema validation for forms and API responses
- **Tailwind CSS v4** - Utility-first styling with custom design system
- **Sonner** - Beautiful toast notifications
- **LocalStorage** - Persistent auth state and theme preference

## 🏗️ Architecture Overview

This application follows modern React architecture patterns:

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                     │
├─────────────────────────────────────────────────────────┤
│  Next.js App Router (React 19)                          │
│  ├── Pages (app/)                                       │
│  ├── Components (components/)                           │
│  └── Providers (Redux, Theme, MSW)                      │
├─────────────────────────────────────────────────────────┤
│  Redux Store (State Management)                         │
│  ├── Auth Slice (user, token, isAuthenticated)         │
│  └── Tasks Slice (tasks[], loading, error, filter)     │
├─────────────────────────────────────────────────────────┤
│  MSW (Mock Service Worker)                              │
│  ├── Intercepts API calls                               │
│  ├── Validates authentication                           │
│  └── Returns mock responses                             │
├─────────────────────────────────────────────────────────┤
│  Mock Database (In-Memory)                              │
│  ├── Users array                                        │
│  └── Tasks array (per user)                             │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → Component → Redux Action → API Call → MSW Intercept
    ↓                                                      ↓
UI Update ← Component Re-render ← Redux State Update ← Mock Response
```

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **Package Manager**: npm, yarn, pnpm, or bun
- **Browser**: Modern browser with JavaScript enabled

## 🚀 Getting Started

### Quick Start (3 Steps)

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Navigate to http://localhost:3000
```

### Detailed Installation

#### 1. Clone or Download

```bash
# Using Git
git clone https://github.com/rajputshivamthakur/ask-Management-Application-with-Mocked-API.git
cd taskflow-mocked-api-main

# Or download ZIP and extract
```

#### 2. Install Dependencies

```bash
# Using npm (recommended)
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

#### 3. Start Development Server

```bash
# Development mode with hot reload
npm run dev

# The app will start on http://localhost:3000
# MSW will automatically initialize and intercept API calls
```

#### 4. Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start

# Production server runs on http://localhost:3000
```

### First Time Setup

1. **Open the application** at `http://localhost:3000`
2. **You'll see the login page** (automatic redirect if not authenticated)
3. **Use demo credentials** or register a new account:
   - Username: `test`
   - Password: `test123`
4. **Start managing tasks!**

## 🔑 Demo Credentials

The application uses mocked authentication with pre-configured accounts:

| Username | Password | Description |
|----------|----------|-------------|
| `test` | `test123` | Demo account with sample tasks |

**Or create your own account:**
1. Click "Don't have an account? Sign up"
2. Fill in username, email, and password
3. Your account is created instantly (stored in browser memory)

> **Note:** All data is stored in browser memory and will reset on page refresh. This is a demo application using MSW for API mocking. In production, you would connect to a real backend database.

## 📁 Project Structure

```
taskflow-mocked-api-main/
├── public/                          # Static assets
│   ├── favicon.svg                  # App icon
│   └── mockServiceWorker.js         # MSW worker script (auto-generated)
│
├── src/
│   ├── app/                         # Next.js App Router (Pages)
│   │   ├── layout.tsx               # Root layout with providers
│   │   ├── page.tsx                 # Home page (Dashboard)
│   │   ├── globals.css              # Global styles + Tailwind
│   │   ├── login/                   # Login page route
│   │   │   └── page.tsx
│   │   └── register/                # Registration page route
│   │       └── page.tsx
│   │
│   ├── components/                  # React Components
│   │   ├── auth/                    # Authentication
│   │   │   ├── LoginPage.tsx        # Login form with validation
│   │   │   └── RegisterPage.tsx     # Registration form
│   │   │
│   │   ├── dashboard/               # Dashboard
│   │   │   ├── Dashboard.tsx        # Main dashboard container
│   │   │   └── Header.tsx           # Navigation header
│   │   │
│   │   ├── tasks/                   # Task Management
│   │   │   ├── TaskList.tsx         # Task list with filtering
│   │   │   ├── TaskItem.tsx         # Individual task card
│   │   │   └── TaskForm.tsx         # Create/Edit task modal
│   │   │
│   │   ├── providers/               # Context Providers
│   │   │   ├── ReduxProvider.tsx    # Redux store provider
│   │   │   ├── ThemeProvider.tsx    # Dark/light theme provider
│   │   │   └── MSWProvider.tsx      # MSW initialization
│   │   │
│   │   ├── ui/                      # Shadcn/UI Components
│   │   │   ├── button.tsx           # Button component
│   │   │   ├── dialog.tsx           # Modal dialog
│   │   │   ├── select.tsx           # Select dropdown
│   │   │   ├── sonner.tsx           # Toast notifications
│   │   │   └── ...                  # Other UI components
│   │   │
│   │   └── ErrorReporter.tsx        # Global error boundary
│   │
│   ├── store/                       # Redux State Management
│   │   ├── store.ts                 # Redux store configuration
│   │   ├── authSlice.ts             # Authentication state + actions
│   │   ├── tasksSlice.ts            # Tasks state + CRUD actions
│   │   └── hooks.ts                 # Typed Redux hooks
│   │
│   ├── mocks/                       # MSW Mock API
│   │   ├── browser.ts               # MSW browser setup
│   │   ├── handlers.ts              # API endpoint handlers
│   │   └── data.ts                  # Mock database (users + tasks)
│   │
│   ├── types/                       # TypeScript Types
│   │   └── index.ts                 # All type definitions
│   │
│   ├── lib/                         # Utilities
│   │   ├── utils.ts                 # Helper functions
│   │   └── localStorage.ts          # LocalStorage utilities
│   │
│   └── hooks/                       # Custom React Hooks
│       └── use-mobile.ts            # Mobile detection hook
│
├── package.json                     # Dependencies + scripts
├── tsconfig.json                    # TypeScript configuration
├── next.config.ts                   # Next.js configuration
├── components.json                  # Shadcn/ui configuration
├── eslint.config.mjs                # ESLint rules
└── README.md                        # This file
```

### Key Directories Explained

| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js pages using App Router |
| `components/` | Reusable React components |
| `store/` | Redux state management logic |
| `mocks/` | MSW API mocking setup |
| `types/` | TypeScript type definitions |
| `lib/` | Utility functions and helpers |

## 🔧 Technology Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.3.5 | React framework with App Router |
| **React** | 19.0.0 | UI library |
| **TypeScript** | 5.x | Type safety and better DX |
| **Node.js** | 18+ | Runtime environment |

### State Management
| Technology | Purpose |
|------------|---------|
| **Redux Toolkit** | Efficient state management with less boilerplate |
| **React Redux** | React bindings for Redux |
| **Redux Thunk** | Async action handling (built into RTK) |

### Styling & UI
| Technology | Purpose |
|------------|---------|
| **Tailwind CSS** | Utility-first CSS framework (v4) |
| **Shadcn/UI** | Pre-built accessible components |
| **Radix UI** | Unstyled, accessible primitives |
| **Lucide React** | Beautiful icon library |
| **Framer Motion** | Animation library |
| **Sonner** | Toast notifications |

### Forms & Validation
| Technology | Purpose |
|------------|---------|
| **React Hook Form** | Performant form handling |
| **Zod** | Schema validation |

### API & Data
| Technology | Purpose |
|------------|---------|
| **MSW (Mock Service Worker)** | API request interception and mocking |
| **LocalStorage** | Client-side data persistence |

### Development Tools
| Technology | Purpose |
|------------|---------|
| **ESLint** | Code linting |
| **TypeScript** | Static type checking |
| **Turbopack** | Fast bundler (Next.js 15) |

## 🔄 How It Works

### Application Flow

```
1. User opens browser → http://localhost:3000
2. Next.js loads layout.tsx
3. Providers initialize:
   - ReduxProvider (state management)
   - ThemeProvider (dark/light mode)
   - MSWProvider (mock API)
4. MSW starts intercepting API calls
5. Check authentication state from localStorage
6. If authenticated → Show Dashboard
   If not → Redirect to /login
```

### Authentication Flow

```
Registration:
User fills form → Validation → Redux dispatch register()
→ Fetch POST /api/auth/register → MSW intercepts
→ Check if username/email exists → Create user
→ Generate JWT token → Return user + token
→ Redux updates state → Save to localStorage
→ Redirect to dashboard → Show success toast

Login:
User enters credentials → Redux dispatch login()
→ Fetch POST /api/auth/login → MSW validates
→ Return user + token → Update Redux state
→ Save to localStorage → Redirect to dashboard
```

### Task Management Flow

```
Create Task:
Click "New Task" → Modal opens → Fill form
→ Validation → Redux dispatch createTask()
→ Fetch POST /api/tasks → MSW creates task
→ Return new task → Redux adds to state
→ UI updates → Show success toast

Update Task:
Click edit icon → Modal with pre-filled data
→ Modify fields → Redux dispatch updateTask()
→ Fetch PUT /api/tasks/:id → MSW updates task
→ Return updated task → Redux updates state → UI re-renders

Delete Task:
Click delete icon → Redux dispatch deleteTask()
→ Fetch DELETE /api/tasks/:id → MSW removes task
→ Redux removes from state → UI updates
```

### State Management

The application uses Redux Toolkit for centralized state management:

```typescript
// Redux Store Structure
{
  auth: {
    user: { id, username, email },
    token: "mock-jwt-token-123",
    isAuthenticated: true,
    loading: false,
    error: null
  },
  tasks: {
    tasks: [
      {
        id: "1",
        title: "Task Title",
        description: "Task Description",
        status: "todo",
        priority: "high",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z"
      }
    ],
    loading: false,
    error: null,
    filter: "all"
  }
}
```

### MSW (Mock Service Worker)

MSW intercepts network requests and provides mock responses:

1. **Browser makes API call** (e.g., `fetch('/api/tasks')`)
2. **MSW intercepts the request** before it reaches the network
3. **Handler function processes the request**:
   - Validates authentication
   - Checks request data
   - Performs mock database operations
4. **Returns mock response** (success or error)
5. **Application receives response** as if from a real API

This allows full-stack development without a backend!

## 🎯 Usage Guide

### Login
1. Navigate to the application
2. You'll be redirected to the login page if not authenticated
3. Enter credentials: `test` / `test123`
4. Click "Sign In" or use the "Use Demo Credentials" button

### Creating a Task
1. Click the "New Task" button
2. Fill in the task details:
   - Title (required)
   - Description (required)
   - Status (To Do, In Progress, Completed)
   - Priority (Low, Medium, High)
3. Click "Create Task"

### Editing a Task
1. Click the edit icon (✏️) on any task card
2. Modify the task details
3. Click "Update Task"

### Deleting a Task
1. Click the delete icon (🗑️) on any task card
2. Confirm the deletion

### Filtering Tasks
Use the tabs at the top of the task list to filter by:
- **All** - Show all tasks
- **To Do** - Show only pending tasks
- **In Progress** - Show tasks being worked on
- **Done** - Show completed tasks

### Dark Mode
Click the moon/sun icon in the header to toggle between light and dark themes.

### Logout
Click the "Logout" button in the header to sign out.

## 📡 API Documentation

All API endpoints are mocked using MSW. Here's the complete API reference:

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}

Response 201:
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  },
  "token": "string"
}

Response 400: { "message": "All fields are required" }
Response 409: { "message": "Username already exists" }
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}

Response 200:
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  },
  "token": "string"
}

Response 401: { "message": "Invalid credentials" }
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer {token}

Response 200: { "message": "Logged out successfully" }
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}

Response 200:
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}

Response 401: { "message": "Unauthorized" }
```

### Task Endpoints

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer {token}

Response 200:
{
  "tasks": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "status": "todo" | "in-progress" | "completed",
      "priority": "low" | "medium" | "high",
      "createdAt": "ISO 8601 date string",
      "updatedAt": "ISO 8601 date string"
    }
  ]
}

Response 401: { "message": "Unauthorized" }
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "status": "todo" | "in-progress" | "completed",
  "priority": "low" | "medium" | "high"
}

Response 201:
{
  "task": {
    "id": "string",
    "title": "string",
    "description": "string",
    "status": "string",
    "priority": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}

Response 401: { "message": "Unauthorized" }
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "status": "todo" | "in-progress" | "completed",
  "priority": "low" | "medium" | "high"
}

Response 200: { "task": { ... } }
Response 401: { "message": "Unauthorized" }
Response 404: { "message": "Task not found" }
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer {token}

Response 200: { "message": "Task deleted successfully" }
Response 401: { "message": "Unauthorized" }
Response 404: { "message": "Task not found" }
```

### Authentication

All task endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer mock-jwt-token-{userId}
```

The token is automatically included by Redux Toolkit when making API calls.

## 🎨 Customization

### Adding New Task Statuses

1. **Update TypeScript types** (`src/types/index.ts`):
```typescript
export interface Task {
  status: 'todo' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
  // ...
}
```

2. **Update TaskForm component** to include new status options

3. **Update filter tabs** in TaskList component

4. **Add color coding** for new statuses in your CSS

### Adding New Task Properties

1. **Update Task interface** (`src/types/index.ts`):
```typescript
export interface Task {
  // ... existing properties
  dueDate?: string;
  assignee?: string;
  tags?: string[];
}
```

2. **Update TaskForm** to include new fields

3. **Update MSW handlers** to handle new properties

4. **Update TaskItem** to display new properties

### Changing Mock Data

Edit `src/mocks/data.ts`:

```typescript
// Add default users
export const mockUsers = [
  {
    id: '1',
    username: 'your-username',
    email: 'your@email.com',
    password: 'your-password',
  },
];

// Add default tasks
export const mockTasks = [
  {
    id: '1',
    title: 'Your Task',
    description: 'Task description',
    status: 'todo',
    priority: 'high',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
```

### Styling Customization

#### Global Styles
Edit `src/app/globals.css`:
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* Add your custom CSS variables */
  }
}
```

#### Component Styles
Use Tailwind utility classes directly in components:
```tsx
<div className="bg-blue-500 hover:bg-blue-600 rounded-lg p-4">
  {/* Your content */}
</div>
```

#### Theme Colors
Modify color schemes in `globals.css` for both light and dark modes.

### Adding New Features

#### Example: Add Task Categories

1. **Update types**:
```typescript
export interface Task {
  // ... existing
  category: 'work' | 'personal' | 'shopping';
}
```

2. **Update Redux slice** to handle category filtering

3. **Update UI** to show category selector

4. **Update MSW handlers** to persist categories

## 🚀 Deployment

### Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"
   - Done! Your app is live

3. **Automatic Deployments**
   - Every push to `main` triggers a new deployment
   - Pull requests get preview deployments
   - Rollback to previous versions anytime

### Netlify

```bash
# 1. Build the project
npm run build

# 2. Install Netlify CLI
npm install -g netlify-cli

# 3. Deploy
netlify deploy --prod
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t task-manager .
docker run -p 3000:3000 task-manager
```

### Manual Deployment

```bash
# 1. Build the production bundle
npm run build

# 2. Start the production server
npm start

# 3. Server runs on http://localhost:3000
```

### Environment Variables

For production deployment, create `.env.production`:

```env
# If connecting to a real API
NEXT_PUBLIC_API_URL=https://your-api.com

# Other environment variables
NEXT_PUBLIC_APP_NAME=Task Manager
```

### Important Notes

⚠️ **MSW in Production**: This demo uses MSW which works in the browser. For production:
- Replace MSW with real API calls
- Set up a backend (Node.js, Python, etc.)
- Use a real database (PostgreSQL, MongoDB, etc.)
- Implement proper authentication (JWT with refresh tokens)

### Production Checklist

Before deploying to production:

- [ ] Remove or disable MSW
- [ ] Connect to real API endpoints
- [ ] Set up proper authentication
- [ ] Configure environment variables
- [ ] Enable error tracking (Sentry, LogRocket)
- [ ] Set up analytics (Google Analytics, Plausible)
- [ ] Configure SEO metadata
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Run security audit (`npm audit`)
- [ ] Optimize images and assets
- [ ] Enable HTTPS
- [ ] Set up monitoring and alerts

## 🧪 Development Notes

### Mock Service Worker (MSW)

MSW is a powerful API mocking library that intercepts requests at the network level:

**How it works:**
1. Service worker registers in the browser
2. Intercepts `fetch` and `XMLHttpRequest` calls
3. Matches requests against defined handlers
4. Returns mock responses

**Benefits:**
- No backend needed for development
- Realistic API behavior
- Works in browser and Node.js
- Easy to test different scenarios

**Location of handlers:** `src/mocks/handlers.ts`

**Mock data:** `src/mocks/data.ts`

### State Persistence

**Authentication:**
- Token and user data saved to localStorage
- Automatically restored on page reload
- Cleared on logout

**Theme:**
- Dark/light preference saved to localStorage
- Persists across sessions

**Tasks:**
- Stored in MSW's in-memory database
- Resets on page refresh (by design)
- In production, would persist to real database

### Protected Routes

The application uses client-side route protection:

```typescript
// In Dashboard component
useEffect(() => {
  if (!isAuthenticated) {
    router.push('/login');
  }
}, [isAuthenticated]);
```

For production, implement:
- Server-side authentication checks
- API route protection
- Token refresh mechanism

### Redux DevTools

Install Redux DevTools browser extension to:
- Inspect state changes
- Time-travel debugging
- Track action history
- Monitor performance

### Hot Module Replacement (HMR)

Next.js with Turbopack provides instant updates:
- Changes reflect immediately
- State is preserved
- No full page reload

### Type Safety

TypeScript provides compile-time safety:
- Catch errors before runtime
- IntelliSense in VS Code
- Better refactoring
- Self-documenting code

## 📝 Scripts Reference

```bash
# Development
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Useful Commands
npm run type-check   # Check TypeScript errors (if configured)
npx msw init public/ # Regenerate MSW worker
```

## 🔒 Security Considerations

**Current Implementation (Demo):**
- ⚠️ Passwords stored in plain text (in-memory)
- ⚠️ Simple JWT tokens (not cryptographically secure)
- ⚠️ No rate limiting
- ⚠️ No CSRF protection

**For Production:**
- ✅ Hash passwords (bcrypt, argon2)
- ✅ Use secure JWT with refresh tokens
- ✅ Implement rate limiting
- ✅ Add CSRF tokens
- ✅ Use HTTPS only
- ✅ Sanitize user inputs
- ✅ Implement proper session management
- ✅ Add security headers

## 🐛 Troubleshooting

### Common Issues

#### MSW Not Starting
**Symptoms:** API calls fail, no mock responses
**Solutions:**
```bash
# 1. Ensure mockServiceWorker.js exists in public/
ls public/mockServiceWorker.js

# 2. Reinstall MSW
npm install msw@latest

# 3. Regenerate worker
npx msw init public/ --save

# 4. Clear browser cache and restart
rm -rf .next
npm run dev
```

#### TypeScript Errors
**Symptoms:** Red squiggly lines, build failures
**Solutions:**
```bash
# Check for type errors
npx tsc --noEmit

# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

# Update TypeScript
npm install typescript@latest
```

#### Build Errors
**Symptoms:** `npm run build` fails
**Solutions:**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

#### Authentication Not Persisting
**Symptoms:** Logged out after page refresh
**Solutions:**
1. Check browser localStorage (DevTools → Application → Local Storage)
2. Ensure localStorage is not disabled
3. Check for browser extensions blocking storage
4. Try incognito/private mode

#### Tasks Not Showing
**Symptoms:** Empty task list after creating tasks
**Solutions:**
1. Check Redux DevTools to see if tasks are in state
2. Verify MSW is intercepting requests (Network tab)
3. Check browser console for errors
4. Ensure you're logged in with the correct user

#### Dark Mode Not Working
**Symptoms:** Theme toggle doesn't change appearance
**Solutions:**
1. Check if `next-themes` is properly installed
2. Clear browser cache
3. Check localStorage for theme preference
4. Restart development server

### Debug Mode

Enable detailed logging:

```typescript
// In src/mocks/handlers.ts
// Add console.log statements to see what MSW is doing

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    console.log('[MSW] Login request received');
    // ... rest of handler
  }),
];
```

### Getting Help

If you're still stuck:
1. Check the browser console for errors
2. Check the Network tab to see API calls
3. Use Redux DevTools to inspect state
4. Open an issue on GitHub with:
   - Error message
   - Steps to reproduce
   - Browser and OS version
   - Screenshots if applicable

## 📚 Learning Resources

### Official Documentation
- [Next.js Documentation](https://nextjs.org/docs) - React framework
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/) - State management
- [MSW Documentation](https://mswjs.io/) - API mocking
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Styling
- [Shadcn/UI Documentation](https://ui.shadcn.com/) - UI components
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Type safety
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod Documentation](https://zod.dev/) - Schema validation

### Tutorials & Guides
- [Next.js App Router Tutorial](https://nextjs.org/learn)
- [Redux Toolkit Quick Start](https://redux-toolkit.js.org/tutorials/quick-start)
- [MSW Getting Started](https://mswjs.io/docs/getting-started)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/installation)

### Video Resources
- [Next.js 15 Crash Course](https://www.youtube.com/results?search_query=nextjs+15+tutorial)
- [Redux Toolkit Tutorial](https://www.youtube.com/results?search_query=redux+toolkit+tutorial)
- [TypeScript for React](https://www.youtube.com/results?search_query=typescript+react+tutorial)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs
1. Check if the bug is already reported
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

### Suggesting Features
1. Open an issue with the `enhancement` label
2. Describe the feature and its benefits
3. Provide examples or mockups if possible

### Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style
- Follow existing code patterns
- Use TypeScript for type safety
- Write meaningful variable names
- Add comments for complex logic
- Keep components small and focused

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

```
MIT License

Copyright (c) 2024 Task Manager

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👏 Acknowledgments

### Built With
- [Next.js](https://nextjs.org/) - The React Framework for Production
- [React](https://react.dev/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Redux Toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Shadcn/UI](https://ui.shadcn.com/) - Beautifully designed components
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [MSW](https://mswjs.io/) - Seamless REST/GraphQL API mocking
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons
- [Sonner](https://sonner.emilkowal.ski/) - An opinionated toast component

### Inspiration
- Modern task management applications
- Clean UI/UX design principles
- Professional development practices

### Special Thanks
- The Next.js team for an amazing framework
- The open-source community for incredible tools
- All contributors and users of this project

---

## 🎉 Final Notes

**This is a complete, production-ready demonstration project** that showcases:
- Modern React development with Next.js 15
- Professional state management with Redux Toolkit
- Realistic API mocking with MSW
- Type-safe development with TypeScript
- Beautiful UI with Tailwind CSS and Shadcn/UI
- Best practices for authentication and data management

**Perfect for:**
- Learning modern React patterns
- Understanding full-stack architecture
- Building your own task management app
- Portfolio projects
- Interview preparation
- Teaching and workshops

**Next Steps:**
1. Explore the codebase
2. Customize it for your needs
3. Add new features
4. Connect to a real backend
5. Deploy to production

---

**Happy Coding! 🚀**

Made with ❤️ by developers, for developers.

For questions, issues, or suggestions, please open an issue on GitHub.