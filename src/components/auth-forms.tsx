"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface AuthFormsProps {
  mode: "signin" | "signup";
  onToggleMode: () => void;
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleOAuth = async (provider: "google" | "github") => {
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) setError(error.message);
      // On success, Supabase will redirect the user to the OAuth flow
    } catch (err) {
      setError("Unable to start OAuth flow");
    } finally {
      setLoading(false);
    }
  };

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
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === "signin") {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          router.push("/dashboard");
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          setError(error.message);
        } else {
          setMessage("Check your email for a confirmation link!");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-[400px] rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle>{mode === "signin" ? "Sign In" : "Sign Up"}</CardTitle>
          <CardDescription>
            {mode === "signin"
              ? "Enter your credentials to access your account"
              : "Create a new account to start blogging"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Social OAuth buttons */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => handleOAuth("google")}
                  aria-label="Continue with Google"
                  disabled={loading}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M21.35 11.1h-9.18v2.92h5.26c-.23 1.38-1.24 3.04-3.27 3.04-1.97 0-3.58-1.62-3.58-3.61 0-1.99 1.61-3.61 3.58-3.61.88 0 1.47.38 1.81.7l2.47-2.39C16.9 6.1 15.35 5.2 13.2 5.2 9.9 5.2 7.2 7.95 7.2 11.2c0 3.24 2.7 6 6 6 3.45 0 5.74-2.41 5.74-5.81 0-.39-.04-.7-.09-1.09z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="text-sm">Continue with Google</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => handleOAuth("github")}
                  aria-label="Continue with GitHub"
                  disabled={loading}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.56v-2.02c-3.2.7-3.87-1.45-3.87-1.45-.52-1.32-1.26-1.67-1.26-1.67-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.64 1.23 3.28.94.1-.73.4-1.23.73-1.52-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.17-3.1-.12-.29-.51-1.47.11-3.06 0 0 .95-.3 3.12 1.17a10.8 10.8 0 012.84-.38c.96 0 1.93.13 2.84.38 2.17-1.47 3.11-1.17 3.11-1.17.62 1.59.24 2.77.12 3.06.73.81 1.17 1.84 1.17 3.1 0 4.44-2.7 5.41-5.28 5.7.41.36.78 1.08.78 2.18v3.24c0 .31.2.67.79.56C20.71 21.38 24 17.08 24 12 24 5.73 18.27.5 12 .5z" />
                  </svg>
                  <span className="text-sm">GitHub</span>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <span className="text-xs text-muted-foreground">or</span>
                <span className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
            {mode === "signup" && (
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
              {loading
                ? "Loading..."
                : mode === "signin"
                ? "Sign In"
                : "Sign Up"}
            </Button>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              {mode === "signin"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={onToggleMode}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                {mode === "signin" ? "Sign up" : "Sign in"}
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
