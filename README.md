# My Blog

A modern, responsive blogging platform built with Next.js 15, React 19, and Tailwind CSS. Create, read, and manage blog posts with a beautiful, intuitive interface.

## ✨ Features

- 📝 **Create & Manage Posts** - Write and edit blog posts with a clean interface
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- 🎨 **Modern UI** - Beautiful, accessible interface built with Radix UI components
- 🌙 **Dark Mode Support** - Automatic dark/light theme switching
- ⚡ **Fast Performance** - Built with Next.js 15 for optimal speed
- 🔗 **Dynamic Routing** - SEO-friendly URLs for all blog posts

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI (Button, Card, Input, Label)
- **Fonts:** Geist Sans & Geist Mono
- **Build Tool:** Next.js built-in bundler

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd blogging_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the app.

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
