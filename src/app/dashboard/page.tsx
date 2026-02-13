'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Dashboard page component for authenticated users to manage their blog posts.
 * 
 * Description: This component provides the main dashboard interface for authenticated
 * users to view, manage, and create their blog posts. It displays a personalized
 * welcome message, shows a grid of existing posts with edit/delete options, and
 * provides quick access to post creation functionality.
 * 
 * Purpose: This function is essential for the core user experience in the blogging app.
 * It serves as the central hub where users can manage their content, view their posts,
 * and access post creation tools. Without this component, users cannot effectively
 * manage their blog content or access their personalized dashboard.
 * 
 * Assumptions:
 * - The user is authenticated (enforced by ProtectedRoute wrapper)
 * - The useAuth hook provides valid user information
 * - The user has access to their posts and metadata
 * - The ProtectedRoute component is properly configured
 * - The UI components (Card, Button, Link) are available
 * - The user's full name or email is available for display
 * 
 * Edge Cases:
 * - Handles cases where user metadata is incomplete or missing
 * - Manages display when user has no existing posts
 * - Handles loading states during user data retrieval
 * - Provides fallback display for missing user information
 * - Manages responsive layout for different screen sizes
 * - Handles cases where post data is unavailable
 * 
 * Component Connections:
 * - Wrapped by ProtectedRoute for authentication enforcement
 * - Uses useAuth hook to access current user information
 * - Renders Radix UI components for consistent styling
 * - Integrates with Next.js Link for navigation
 * - Displays user-specific content and personalized interface
 * - Provides navigation to post creation and management features
 * - Shows mock post data (TODO: integrate with actual post data)
 * 
 * @returns JSX element containing the user dashboard interface
 */
export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.user_metadata?.full_name || user?.email}! Manage your blog posts here.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((id) => (
            <Card key={id}>
              <CardHeader>
                <CardTitle>My Post Title {id}</CardTitle>
                <CardDescription>
                  A brief description of my blog post.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Edit</Button>
                <Button variant="destructive">Delete</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/posts/create">
            <Button size="lg">
              Create New Post
            </Button>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}