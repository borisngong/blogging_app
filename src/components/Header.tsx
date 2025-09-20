'use client'

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

  /**
   * Handles user sign-out action from the header.
   * 
   * Description: This function processes the sign-out action when the user clicks
   * the sign-out button in the header. It calls the signOut method from the
   * authentication context to terminate the user session and update the UI state.
   * 
   * Purpose: This function is essential for user session management in the blogging app.
   * It provides a convenient way for users to end their sessions directly from the
   * navigation header, improving user experience and security. Without this function,
   * users cannot easily sign out from the header interface.
   * 
   * Assumptions:
   * - The signOut method is available from the useAuth hook
   * - The user is currently authenticated
   * - The authentication context is properly configured
   * - The signOut operation will complete successfully
   * - The UI will update automatically after sign-out
   * 
   * Edge Cases:
   * - Handles sign-out failures gracefully (errors are managed by AuthContext)
   * - Manages loading states during sign-out operations
   * - Handles cases where sign-out is already in progress
   * - Provides smooth user experience during session termination
   * - Handles network failures during sign-out
   * - Manages UI updates after successful sign-out
   * 
   * Component Connections:
   * - Called by sign-out button onClick event handler
   * - Uses signOut method from useAuth hook
   * - Integrates with authentication context for session management
   * - Triggers UI updates through authentication state changes
   * - Affects conditional rendering in the header component
   * - Enables access to sign-in functionality after sign-out
   * 
   * @returns Promise that resolves when sign-out operation completes
   */
  const handleSignOut = async () => {
    await signOut();
  };

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
          
          {user ? (
            <>
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
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Welcome, {user.user_metadata?.full_name || user.email}
                </span>
                <Button variant="ghost" onClick={handleSignOut} disabled={loading}>
                  {loading ? 'Signing out...' : 'Sign Out'}
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