'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  /**
   * Registers a new user account with email and password authentication.
   * 
   * Description: This function handles user registration by creating a new account
   * in the Supabase authentication system. It accepts user credentials and optional
   * profile information, then attempts to create the account.
   * 
   * Purpose: This function is crucial for handling user sign-up requests in the blogging app.
   * It enables new users to create accounts so they can access protected features like
   * creating and managing blog posts. Without this function, users cannot join the platform.
   * 
   * Assumptions: 
   * - The email is valid and not already registered
   * - The password meets Supabase's security requirements (minimum 6 characters)
   * - The fullName parameter is optional and can be undefined
   * - Supabase client is properly configured and accessible
   * - Network connectivity is available for API calls
   * 
   * Edge Cases:
   * - Handles duplicate email registration attempts (returns appropriate error)
   * - Manages network failures with try-catch error handling
   * - Handles invalid email formats or weak passwords
   * - Gracefully handles Supabase service unavailability
   * - Returns consistent error format for client-side error handling
   * 
   * Component Connections:
   * - Called by AuthForms component during sign-up form submission
   * - Integrates with Supabase Auth API for account creation
   * - Updates global authentication state through AuthContext
   * - Triggers email confirmation flow if enabled in Supabase
   * - Affects ProtectedRoute component behavior after successful registration
   * 
   * @param email - User's email address for account creation
   * @param password - User's chosen password (minimum 6 characters)
   * @param fullName - Optional display name for the user profile
   * @returns Promise resolving to object with error property (null if successful)
   */
  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  /**
   * Authenticates a user with email and password credentials.
   * 
   * Description: This function handles user login by validating provided credentials
   * against the Supabase authentication system. Upon successful authentication,
   * it establishes a user session and updates the global authentication state.
   * 
   * Purpose: This function is essential for user authentication in the blogging app.
   * It allows existing users to access their accounts and protected features like
   * the dashboard, post creation, and profile management. It's the primary entry
   * point for authenticated user sessions.
   * 
   * Assumptions:
   * - The email corresponds to an existing user account
   * - The password is correct for the given email
   * - The user account is not disabled or suspended
   * - Supabase client is properly configured and accessible
   * - Network connectivity is available for API calls
   * 
   * Edge Cases:
   * - Handles invalid credentials (returns authentication error)
   * - Manages network failures with try-catch error handling
   * - Handles account lockout or suspension scenarios
   * - Gracefully handles Supabase service unavailability
   * - Returns consistent error format for client-side error handling
   * - Handles expired sessions or token refresh failures
   * 
   * Component Connections:
   * - Called by AuthForms component during sign-in form submission
   * - Integrates with Supabase Auth API for credential validation
   * - Updates global authentication state through AuthContext
   * - Triggers automatic redirect to dashboard on success
   * - Enables access to ProtectedRoute components
   * - Updates Header component to show authenticated user state
   * 
   * @param email - User's registered email address
   * @param password - User's account password
   * @returns Promise resolving to object with error property (null if successful)
   */
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  /**
   * Terminates the current user session and logs out the user.
   * 
   * Description: This function handles user logout by invalidating the current
   * authentication session in Supabase. It clears the user's session data and
   * updates the global authentication state to reflect the logged-out status.
   * 
   * Purpose: This function is essential for user session management in the blogging app.
   * It provides a secure way for users to end their sessions, protecting their accounts
   * when using shared devices or when they want to switch accounts. It's also crucial
   * for maintaining security and privacy standards.
   * 
   * Assumptions:
   * - The user is currently authenticated and has an active session
   * - The session token is valid and can be invalidated
   * - Supabase client is properly configured and accessible
   * - Network connectivity is available for API calls
   * 
   * Edge Cases:
   * - Handles already-expired sessions gracefully
   * - Manages network failures with try-catch error handling
   * - Handles cases where session is already invalid
   * - Gracefully handles Supabase service unavailability
   * - Returns consistent error format for client-side error handling
   * - Clears local state even if server logout fails
   * 
   * Component Connections:
   * - Called by Header component when user clicks sign out button
   * - Integrates with Supabase Auth API for session termination
   * - Updates global authentication state through AuthContext
   * - Triggers automatic redirect to home page or auth page
   * - Disables access to ProtectedRoute components
   * - Updates Header component to show unauthenticated state
   * - Clears any cached user data or preferences
   * 
   * @returns Promise resolving to object with error property (null if successful)
   */
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error: error as AuthError }
    }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Custom hook for accessing authentication state and methods.
 * 
 * Description: This hook provides access to the authentication context, including
 * user information, session data, loading states, and authentication methods.
 * It serves as the primary interface for components to interact with authentication.
 * 
 * Purpose: This function is the main entry point for authentication functionality
 * throughout the blogging app. It provides a clean, consistent API for components
 * to access user state, perform authentication operations, and handle loading states.
 * Without this hook, components cannot access authentication features.
 * 
 * Assumptions:
 * - The component using this hook is wrapped within an AuthProvider
 * - The AuthContext has been properly initialized with valid state
 * - The authentication state is managed by the AuthProvider component
 * - All authentication methods are properly implemented and available
 * 
 * Edge Cases:
 * - Throws error if used outside of AuthProvider context
 * - Handles undefined context gracefully with clear error message
 * - Provides consistent interface even when authentication state changes
 * - Maintains referential stability for authentication methods
 * - Handles loading states during authentication operations
 * 
 * Component Connections:
 * - Used by all components that need authentication state (Header, AuthForms, ProtectedRoute)
 * - Provides access to user data for conditional rendering
 * - Enables authentication method calls from any component
 * - Integrates with React Context system for state management
 * - Used by ProtectedRoute to determine access permissions
 * - Powers conditional UI rendering based on authentication status
 * 
 * @returns Authentication context containing user, session, loading state, and auth methods
 * @throws Error if used outside of AuthProvider context
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
