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

- 🔑 User authentication (Supabase Auth + JWT) - *Coming Soon*
- 📝 Create, edit, and delete blog posts
- 💬 Comment system for user interactions - *Coming Soon*
- 📈 Discover trending posts & follow authors - *Coming Soon*
- 📱 Responsive design (mobile & desktop)
- 🖋️ Markdown support for posts - *Coming Soon*
- 🔍 Search and filter posts - *Coming Soon*
- 🎨 Modern UI with Radix UI components
- 🌙 Dark mode support
- ⚡ Fast performance with Next.js 15

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (React 19 + TypeScript)
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI (Button, Card, Input, Label)
- **Backend:** Next.js API Routes (Node.js) - *In Development*
- **Database & Authentication:** Supabase (PostgreSQL, Auth, and Storage), JWT tokens for secure access - *Coming Soon*
- **Markdown Rendering:** `react-markdown` - *Coming Soon*
- **Testing:** Jest (unit/integration), React Testing Library - *Coming Soon*
- **Deployment:** Vercel (frontend & backend), Supabase (database) - *Coming Soon*
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
   Create a `.env.local` file and add your Supabase credentials (when ready):

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

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication page
│   ├── dashboard/         # User dashboard
│   ├── posts/             # Blog posts
│   │   ├── [id]/         # Dynamic post pages
│   │   └── create/       # Create new post
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── Header.tsx        # Navigation header
└── lib/                  # Utility functions
    └── utils.ts          # Helper functions
```

## 🎯 Available Pages

- **Home** (`/`) - Landing page with feature overview
- **Posts** (`/posts`) - Browse all blog posts
- **Create Post** (`/posts/create`) - Write new blog posts
- **Post Detail** (`/posts/[id]`) - View individual posts
- **Dashboard** (`/dashboard`) - Manage your posts
- **Auth** (`/auth`) - Login/register page

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
