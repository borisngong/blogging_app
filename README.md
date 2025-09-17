# Blogging App

## 🔖 Project Title & Description

**Project Title:** Blogging App  

**Description:**  
A modern, full-stack blogging platform where users can create, edit, and share blog posts. The app supports user authentication, post management, comments, and a clean, responsive UI. It’s designed for writers, hobbyists, and anyone who wants to share their thoughts online.  

The platform also includes features for discovering trending posts, following favorite authors, and rendering content in Markdown for a smooth writing experience.  

**Why it matters:**  
Blogging remains a powerful tool for self-expression, learning, and community-building. This app makes it easy for anyone to share their ideas while demonstrating best practices in modern web development and AI-assisted workflows.  

---

## ✨ Features

- 🔑 User authentication (Supabase Auth + JWT)  
- 📝 Create, edit, and delete blog posts  
- 💬 Comment system for user interaction  
- 📈 Discover trending posts & follow authors  
- 📱 Responsive design (mobile & desktop)  
- 🖋️ Markdown support for posts  
- 🔍 Search and filter posts  

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (React + Tailwind CSS)  
- **Backend:** Next.js API Routes (Node.js)  
- **Database & Authentication:** Supabase (PostgreSQL, Auth, and Storage), JWT tokens for secure access  
- **Markdown Rendering:** `react-markdown`  
- **Testing:** Jest (unit/integration), React Testing Library  
- **Deployment:** Vercel (frontend & backend), Supabase (database)  
- **AI Tooling:** Cursor (IDE), CodeRabbit (PR reviews & commit summaries), OpenAI API (optional for content suggestions)  

---

## 🧠 AI Integration Strategy

### 1. Code or Feature Generation
- **Scaffolding:**  
  Use Cursor to generate boilerplate for Next.js components, API routes, Supabase queries, and JWT auth.  
  Example:  
  > “Generate a Next.js API route for creating and fetching blog posts using Supabase client and JWT authentication.”  

- **Component Design:**  
  Use AI to build reusable UI components (PostCard, CommentSection) with Tailwind CSS.  

### 2. Testing Support
- **Test Generation:**  
  Use AI to generate Jest + React Testing Library tests for routes and components.  
  Example:  
  > “Write Jest tests for the user registration endpoint with Supabase Auth and JWT, including edge cases.”  

- **Test Review:**  
  AI reviews coverage and suggests improvements.  

### 3. Schema-Aware or API-Aware Generation
- **Schema-Driven Prompts:**  
  Provide Supabase schema (users, posts, comments) to AI for CRUD operations and validation.  
  Example:  
  > “Given this Supabase schema, generate CRUD operations for the Post table, protected by JWT.”  

- **Contextual Awareness:**  
  Use Cursor’s file tree + diff awareness for code generation aligned with project structure.  

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

1. “Generate a test suite for the `createPost` API route using Supabase and JWT, including cases for missing fields and unauthorized access.”  
2. “Scaffold a Next.js form component for creating a blog post with validation and TailwindCSS.”  
3. “Summarize the changes in this PR and generate a commit message in conventional commit format.”  

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
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the development server**  
   ```bash
   npm run dev
   ```

5. **Open in browser**  
   Visit [http://localhost:3000](http://localhost:3000) to view the app.
