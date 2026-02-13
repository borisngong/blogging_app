# My Blog

## 🔖 Project Title & Description

**Project Title:** Blogging App

**Description:**  
A modern, full-stack blogging platform where users can create, edit, and share blog posts. The app supports user authentication, post management, comments, and a clean, responsive UI. It's designed for writers, hobbyists, and anyone who wants to share their thoughts online.

The platform also includes features for discovering trending posts, following favorite authors, and rendering content in Markdown for a smooth writing experience.

**Why it matters:**  
Blogging remains a powerful tool for self-expression, learning, and community-building. This app makes it easy for anyone to share their ideas while demonstrating best practices in modern web development and AI-assisted workflows.

---

## ✨ Features

- 🔑 **User authentication (Supabase Auth + JWT)** - ✅ **IMPLEMENTED**
- 📝 Create, edit, and delete blog posts - _UI Ready, Database Integration Coming Soon_
- 💬 Comment system for user interactions - _Coming Soon_
- 📈 Discover trending posts & follow authors - _Coming Soon_
- 📱 Responsive design (mobile & desktop) - ✅ **IMPLEMENTED**
- 🖋️ Markdown support for posts - _Coming Soon_
- 🔍 Search and filter posts - _Coming Soon_
- 🎨 Modern UI with Radix UI components - ✅ **IMPLEMENTED**
- 🌙 Dark mode support - ✅ **IMPLEMENTED**
- ⚡ Fast performance with Next.js 15 - ✅ **IMPLEMENTED**
- 🔒 Protected routes with automatic redirects - ✅ **IMPLEMENTED**
- 👤 User profile management - ✅ **IMPLEMENTED**

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (React 19 + TypeScript) - ✅ **IMPLEMENTED**
- **Styling:** Tailwind CSS v4 - ✅ **IMPLEMENTED**
- **UI Components:** Radix UI (Button, Card, Input, Label) - ✅ **IMPLEMENTED**
- **Authentication:** Supabase Auth with JWT tokens - ✅ **IMPLEMENTED**
- **State Management:** React Context API - ✅ **IMPLEMENTED**
- **Backend:** Next.js API Routes (Node.js) - _Ready for Implementation_
- **Database:** Supabase (PostgreSQL) - _Schema Ready, Integration Pending_
- **Storage:** Supabase Storage - _Coming Soon_
- **Markdown Rendering:** `react-markdown` - _Coming Soon_
- **Testing:** Jest (unit/integration), React Testing Library - _Coming Soon_
- **Deployment:** Vercel (frontend & backend), Supabase (database) - _Ready for Deployment_
- **AI Tooling:** Cursor (IDE), CodeRabbit (PR reviews & commit summaries), OpenAI API (optional for content suggestions)

---

## 🧠 AI Integration Strategy

### 1. Code or Feature Generation

- **Scaffolding:**  
  Use Cursor to generate boilerplate for Next.js components, API routes, Supabase queries, and JWT auth.  
  Example:

  > "Generate a Next.js API route for creating and fetching blog posts using Supabase client and JWT authentication."

- **Component Design:**  
  Use AI to build reusable UI components (PostCard, CommentSection) with Tailwind CSS.

### 2. Testing Support

- **Test Generation:**  
  Use AI to generate Jest + React Testing Library tests for routes and components.  
  Example:

  > "Write Jest tests for the user registration endpoint with Supabase Auth and JWT, including edge cases."

- **Test Review:**  
  AI reviews coverage and suggests improvements.

### 3. Schema-Aware or API-Aware Generation

- **Schema-Driven Prompts:**  
  Provide Supabase schema (users, posts, comments) to AI for CRUD operations and validation.  
  Example:

  > "Given this Supabase schema, generate CRUD operations for the Post table, protected by JWT."

- **Contextual Awareness:**  
  Use Cursor's file tree + diff awareness for code generation aligned with project structure.

### 4. Documentation

- **Docstrings & Inline Comments:**  
  AI maintains function/class/API documentation.

- **README & Guides:**  
  AI helps draft setup instructions, usage examples, and contribution guidelines.

---

## 📡 In-Editor / PR Review Tooling

- **Tool:** CodeRabbit (automated PR reviews, commit messages, release notes)
- **Editor:** Cursor (AI-powered IDE with schema-aware scaffolding and inline suggestions)

**Usage:**

- Generate code, tests, and docs directly in-editor.
- Summarize PRs and auto-generate commit messages.
- Refactor or debug with context-aware prompts.

---

## 📝 Prompting Strategy

**Sample Prompts:**

1. "Generate a test suite for the `createPost` API route using Supabase and JWT, including cases for missing fields and unauthorized access."
2. "Scaffold a Next.js form component for creating a blog post with validation and TailwindCSS."
3. "Summarize the changes in this PR and generate a commit message in conventional commit format."

---

## ⚙️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/borisngong/blogging_app.git
   cd blogging_app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env.local` file and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   **📋 Quick Setup:**

   - Get your credentials from [Supabase Dashboard](https://supabase.com/dashboard)
   - Copy the Project URL and Anon Key from Settings > API
   - See `SETUP_AUTH.md` for detailed instructions

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Set up database schema** (Optional for basic testing)

   - Follow the detailed guide in `SETUP_AUTH.md`
   - Run the provided SQL schema in your Supabase dashboard
   - This enables full functionality with user profiles and posts

6. **Open in browser**  
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

## 🔐 Authentication Features

### ✅ **Implemented Authentication**

- **User Registration**: Email/password sign-up with validation
- **User Login**: Secure authentication with session persistence
- **Protected Routes**: Automatic redirect to login for unauthorized access
- **Session Management**: Persistent login across browser refreshes
- **User Profile**: Display user information in header and dashboard
- **Sign Out**: Secure logout with session cleanup

### 🎯 **Available Pages**

- **Home** (`/`) - Landing page with feature overview
- **Posts** (`/posts`) - Browse all blog posts (public)
- **Create Post** (`/posts/create`) - Write new blog posts (🔒 **Protected**)
- **Post Detail** (`/posts/[id]`) - View individual posts (public)
- **Dashboard** (`/dashboard`) - Manage your posts (🔒 **Protected**)
- **Auth** (`/auth`) - Sign in/Sign up page

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication page (sign-in/sign-up)
│   ├── dashboard/         # User dashboard (🔒 Protected)
│   ├── posts/             # Blog posts
│   │   ├── [id]/         # Dynamic post pages (public)
│   │   └── create/       # Create new post (🔒 Protected)
│   ├── layout.tsx         # Root layout with AuthProvider
│   └── page.tsx           # Home page (public)
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (Radix UI)
│   ├── Header.tsx        # Navigation header with auth state
│   ├── auth-forms.tsx    # Sign-in/sign-up forms
│   └── ProtectedRoute.tsx # Route protection component
├── contexts/             # React Context providers
│   └── AuthContext.tsx   # Authentication state management
└── lib/                  # Utility functions
    ├── utils.ts          # Helper functions
    └── supabase.ts       # Supabase client configuration
```

## � Development & Troubleshooting

### Environment Variables

Make sure to set the following environment variables in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development Commands

To run the development server, use:

```bash
npm run dev
```

### RLS/Auth Tips

When working with server actions, ensure you pass the access token to authenticate requests.

### Hydration Fix

If you encounter issues with `<div>` elements inside `<p>`, ensure proper nesting to avoid hydration errors.

### getServerClient Import Note

Make sure to import `getServerClient` correctly to avoid runtime errors.

## �🚀 Quick Start Guide

### 1. **Clone and Install**

```bash
git clone https://github.com/borisngong/blogging_app.git
cd blogging_app
npm install
```

### 2. **Set up Supabase** (5 minutes)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get your Project URL and Anon Key from Settings > API
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

### 3. **Run the App**

```bash
npm run dev
```

### 4. **Test Authentication**

- Visit `http://localhost:3000`
- Click "Sign In" → "Sign Up" to create account
- Test protected routes (Dashboard, Create Post)

## 📋 Current Status

### ✅ **Ready to Use**

- Complete authentication system with Supabase
- Responsive UI with dark mode support
- Protected routes with automatic redirects
- User profile management and session persistence
- Modern Next.js 15 + TypeScript setup
- Form validation and error handling

### 🔄 **Next Steps** (Optional)

- Set up database schema (see `SETUP_AUTH.md`)
- Implement post creation/editing with Supabase
- Add user profile management features
- Deploy to Vercel

## 🔧 Authentication Implementation

### **Architecture Overview**

- **Supabase Auth**: Handles user registration, login, and session management
- **React Context**: Global state management for authentication
- **Protected Routes**: Automatic redirect for unauthorized access
- **TypeScript**: Full type safety throughout the auth system

### **Key Components**

- `AuthContext.tsx` - Global authentication state and methods
- `auth-forms.tsx` - Sign-in/sign-up forms with validation
- `ProtectedRoute.tsx` - Route protection wrapper component
- `supabase.ts` - Supabase client configuration

### **Security Features**

- JWT token validation
- Row Level Security (RLS) ready
- Secure password requirements
- Session persistence and cleanup

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Deploy with zero configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Fonts by [Vercel](https://vercel.com/font)
