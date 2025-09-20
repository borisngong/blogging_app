'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

/**
 * Route protection component that restricts access to authenticated users only.
 * 
 * Description: This component acts as a guard for protected routes, ensuring that
 * only authenticated users can access certain parts of the application. It checks
 * the user's authentication status and either renders the protected content or
 * redirects unauthenticated users to the authentication page.
 * 
 * Purpose: This function is essential for maintaining security and access control
 * in the blogging app. It protects sensitive features like the dashboard, post
 * creation, and user management from unauthorized access. Without this component,
 * unauthenticated users could access protected features, compromising security.
 * 
 * Assumptions:
 * - The useAuth hook is available and properly configured
 * - The useRouter hook is available for navigation
 * - The authentication state is accurately maintained in AuthContext
 * - The loading state properly reflects authentication status
 * - The redirectTo path is valid and accessible
 * 
 * Edge Cases:
 * - Handles loading states with appropriate loading UI
 * - Manages authentication state changes during component lifecycle
 * - Handles cases where user becomes unauthenticated while on protected route
 * - Provides smooth user experience during authentication checks
 * - Handles navigation errors gracefully
 * - Manages component unmounting during authentication state changes
 * 
 * Component Connections:
 * - Uses useAuth hook to access user and loading state
 * - Integrates with useRouter for redirecting unauthenticated users
 * - Wraps protected page components (Dashboard, CreatePost, etc.)
 * - Responds to authentication state changes from AuthContext
 * - Provides loading UI during authentication verification
 * - Enables conditional rendering based on authentication status
 * 
 * @param children - React components to render if user is authenticated
 * @param redirectTo - Path to redirect to if user is not authenticated (default: '/auth')
 * @returns JSX element containing protected content or loading/redirect logic
 */
export default function ProtectedRoute({ 
  children, 
  redirectTo = '/auth' 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
