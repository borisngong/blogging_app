'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface AuthFormsProps {
  mode: 'signin' | 'signup'
  onToggleMode: () => void
}

/**
 * Authentication forms component for user sign-in and sign-up.
 * 
 * Description: This component renders a unified authentication interface that can
 * switch between sign-in and sign-up modes. It provides form validation, error
 * handling, and user feedback for authentication operations. The component manages
 * its own form state and integrates with the global authentication context.
 * 
 * Purpose: This function is the primary user interface for authentication in the
 * blogging app. It provides a clean, accessible way for users to create accounts
 * or sign into existing ones. Without this component, users cannot access the
 * platform's features. It's essential for user onboarding and account management.
 * 
 * Assumptions:
 * - The component receives valid mode and onToggleMode props
 * - The useAuth hook is available and properly configured
 * - The useRouter hook is available for navigation
 * - Form validation requirements are met (email format, password length)
 * - Network connectivity is available for authentication API calls
 * 
 * Edge Cases:
 * - Handles form validation errors with user-friendly messages
 * - Manages network failures and API errors gracefully
 * - Handles loading states during authentication operations
 * - Provides clear feedback for successful operations
 * - Handles unexpected errors with fallback error messages
 * - Manages form state reset after successful operations
 * 
 * Component Connections:
 * - Uses useAuth hook to access authentication methods
 * - Integrates with useRouter for post-authentication navigation
 * - Renders Radix UI components for consistent styling
 * - Called by AuthPage component with mode switching
 * - Triggers navigation to dashboard on successful sign-in
 * - Displays success messages for sign-up completion
 * - Updates global authentication state through AuthContext
 * 
 * @param mode - Current authentication mode ('signin' or 'signup')
 * @param onToggleMode - Function to switch between sign-in and sign-up modes
 * @returns JSX element containing the authentication form interface
 */
export default function AuthForms({ mode, onToggleMode }: AuthFormsProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const { signIn, signUp } = useAuth()
  const router = useRouter()

  /**
   * Handles form submission for both sign-in and sign-up operations.
   * 
   * Description: This function processes form submissions by validating input data,
   * calling the appropriate authentication method based on the current mode, and
   * handling the response with proper error handling and user feedback.
   * 
   * Purpose: This function is crucial for processing user authentication requests
   * in the blogging app. It orchestrates the entire authentication flow, from
   * form validation to API calls to user feedback. Without this function, the
   * authentication forms would be non-functional.
   * 
   * Assumptions:
   * - The form data (email, password, fullName) is properly captured from state
   * - The authentication methods (signIn, signUp) are available and functional
   * - The router is available for navigation after successful authentication
   * - The component state management is working correctly
   * - Network connectivity is available for API calls
   * 
   * Edge Cases:
   * - Handles form validation errors before making API calls
   * - Manages authentication API errors with user-friendly messages
   * - Handles network failures with fallback error messages
   * - Manages loading states during API operations
   * - Provides different feedback for sign-in vs sign-up operations
   * - Handles unexpected errors with generic error messages
   * - Resets form state appropriately after operations
   * 
   * Component Connections:
   * - Called by form onSubmit event handler
   * - Uses signIn and signUp methods from useAuth hook
   * - Integrates with useRouter for post-authentication navigation
   * - Updates component state for loading, error, and message display
   * - Triggers different UI flows based on authentication mode
   * - Handles success and error states for user feedback
   * 
   * @param e - React form event from form submission
   * @returns Promise that resolves when authentication operation completes
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password)
        if (error) {
          setError(error.message)
        } else {
          router.push('/dashboard')
        }
      } else {
        const { error } = await signUp(email, password, fullName)
        if (error) {
          setError(error.message)
        } else {
          setMessage('Check your email for a confirmation link!')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </CardTitle>
          <CardDescription>
            {mode === 'signin' 
              ? 'Enter your credentials to access your account'
              : 'Create a new account to start blogging'
            }
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                {error}
              </div>
            )}
            {message && (
              <div className="text-green-500 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                {message}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Loading...' : (mode === 'signin' ? 'Sign In' : 'Sign Up')}
            </Button>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={onToggleMode}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
