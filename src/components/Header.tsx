"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Navigation header component with authentication-aware UI.
 *
 * Description: This component renders the main navigation header of the blogging app,
 * providing navigation links and authentication controls. It displays different UI
 * elements based on the user's authentication status, including sign-in/sign-out
 * buttons and user-specific navigation options.
 *
 * Purpose: This function is essential for navigation and user experience in the
 * blogging app. It provides the primary navigation interface, allows users to
 * access different sections of the app, and manages authentication state display.
 * Without this component, users cannot navigate the app or manage their sessions.
 *
 * Assumptions:
 * - The useAuth hook is available and properly configured
 * - The authentication state is accurately maintained in AuthContext
 * - The loading state properly reflects authentication status
 * - Navigation links are valid and accessible
 * - User metadata is available for display
 *
 * Edge Cases:
 * - Handles loading states during authentication operations
 * - Manages authentication state changes during component lifecycle
 * - Handles cases where user data is incomplete or missing
 * - Provides fallback display for missing user information
 * - Handles navigation errors gracefully
 * - Manages component updates during authentication state changes
 *
 * Component Connections:
 * - Uses useAuth hook to access user and loading state
 * - Renders conditional UI based on authentication status
 * - Provides navigation links to different app sections
 * - Integrates with Next.js Link component for client-side navigation
 * - Displays user information from authentication context
 * - Handles sign-out functionality through authentication context
 *
 * @returns JSX element containing the navigation header interface
 */
export default function Header() {
  const { user, signOut, loading } = useAuth();

  /** Handle user sign-out by calling signOut from auth context. */
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Blog
          </h1>
        </Link>
        <nav className="flex items-center space-x-2">
          <Link href="/posts">
            <Button
              variant="ghost"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Posts
            </Button>
          </Link>

          {user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/posts/create">
                <Button variant="outline" className="mr-2">
                  Create Post
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Welcome, {user.user_metadata?.full_name || user.email}
                </span>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  disabled={loading}
                >
                  {loading ? "Signing out..." : "Sign Out"}
                </Button>
              </div>
            </>
          ) : (
            <Link href="/auth">
              <Button>Sign In</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
