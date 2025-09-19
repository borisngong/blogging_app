import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Blog</h1>
        </Link>
        <nav className="flex items-center space-x-2">
          <Link href="/posts">
            <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Posts
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Dashboard
            </Button>
          </Link>
          <Link href="/posts/create">
            <Button variant="outline" className="mr-2">
              Create Post
            </Button>
          </Link>
          <Link href="/auth">
            <Button>Login</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}