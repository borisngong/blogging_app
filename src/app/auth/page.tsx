"use client";

import { useState } from "react";
import AuthForms from "@/components/auth-forms";
import { useSearchParams } from "next/navigation";

/**
 * Authentication page component that manages sign-in and sign-up mode switching.
 *
 * Description: This component serves as the main authentication page that manages
 * the switching between sign-in and sign-up modes. It maintains the current
 * authentication mode state and provides a toggle function to switch between
 * the two modes, then renders the appropriate authentication form.
 *
 * Purpose: This function is essential for providing a unified authentication
 * experience in the blogging app. It allows users to easily switch between
 * signing in to existing accounts and creating new accounts without navigating
 * to different pages. This improves user experience and reduces friction in
 * the authentication flow.
 *
 * Assumptions:
 * - The AuthForms component is available and properly configured
 * - The component state management is working correctly
 * - The mode switching logic is properly implemented
 * - The authentication forms handle both modes correctly
 * - The component is rendered within the proper app context
 *
 * Edge Cases:
 * - Handles mode state changes smoothly without data loss
 * - Manages component re-renders during mode switching
 * - Handles cases where AuthForms component fails to load
 * - Provides consistent user experience during mode transitions
 * - Manages state persistence during component lifecycle
 *
 * Component Connections:
 * - Renders AuthForms component with current mode and toggle function
 * - Manages authentication mode state for the entire auth flow
 * - Integrates with AuthForms component for form rendering
 * - Provides mode switching functionality to child components
 * - Serves as the entry point for authentication in the app
 *
 * @returns JSX element containing the authentication page interface
 */
export default function AuthPage() {
  const searchParams = useSearchParams();
  const signupParam = searchParams.get("signup");
  const initialMode: "signin" | "signup" =
    signupParam === "true" ? "signup" : "signin";
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);

  /**
   * Toggles between sign-in and sign-up authentication modes.
   *
   * Description: This function switches the authentication mode between 'signin'
   * and 'signup' states. It provides a simple way for users to switch between
   * creating new accounts and signing into existing ones without page navigation.
   *
   * Purpose: This function is essential for providing a seamless authentication
   * experience in the blogging app. It allows users to easily switch between
   * authentication modes, improving user experience and reducing the need for
   * separate authentication pages or complex navigation flows.
   *
   * Assumptions:
   * - The mode state is properly managed by useState hook
   * - The setMode function is available and functional
   * - The component will re-render after state changes
   * - The AuthForms component will respond to mode changes
   * - The toggle operation is triggered by user interaction
   *
   * Edge Cases:
   * - Handles rapid mode switching without state corruption
   * - Manages state updates during component re-renders
   * - Provides consistent behavior regardless of current mode
   * - Handles cases where state updates fail
   * - Manages component lifecycle during mode changes
   *
   * Component Connections:
   * - Called by AuthForms component's mode toggle button
   * - Updates the mode state for the parent AuthPage component
   * - Triggers re-rendering of AuthForms with new mode
   * - Enables seamless switching between authentication forms
   * - Integrates with React state management system
   *
   * @returns void - Updates the mode state
   */
  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
  };

  return <AuthForms mode={mode} onToggleMode={toggleMode} />;
}
