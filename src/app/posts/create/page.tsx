"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { createPost } from "@/lib/actions/posts";
import { supabase } from "@/lib/supabase";

/**
 * Page component for creating new blog posts.
 *
 * Description: This component provides a form interface for authenticated users
 * to create new blog posts. It includes fields for post title and content, form
 * validation, error handling, and integration with the authentication system.
 * The component is protected and requires user authentication to access.
 *
 * Purpose: This function is essential for the core blogging functionality of the app.
 * It enables authenticated users to create and publish new content, which is the
 * primary feature of the blogging platform. Without this component, users cannot
 * contribute content to the platform.
 *
 * Assumptions:
 * - The user is authenticated (enforced by ProtectedRoute wrapper)
 * - The useAuth hook provides valid user information
 * - The useRouter hook is available for navigation
 * - Form validation requirements are met (title and content are required)
 * - The component state management is working correctly
 * - Network connectivity is available for future API calls
 *
 * Edge Cases:
 * - Handles form validation errors with user-friendly messages
 * - Manages loading states during post creation operations
 * - Handles network failures and API errors gracefully
 * - Provides clear feedback for successful operations
 * - Handles unexpected errors with fallback error messages
 * - Manages form state reset after successful operations
 * - Handles navigation errors gracefully
 *
 * Component Connections:
 * - Wrapped by ProtectedRoute for authentication enforcement
 * - Uses useAuth hook to access current user information
 * - Integrates with useRouter for post-creation navigation
 * - Renders Radix UI components for consistent styling
 * - Uses form state management for user input
 * - Triggers navigation to posts page after successful creation
 * - Handles error states for user feedback
 *
 * @returns JSX element containing the post creation form interface
 */
export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  /**
   * Handles form submission for creating a new blog post.
   *
   * Description: This function processes the post creation form submission by
   * validating input data, preparing the post data with user information, and
   * handling the creation process with proper error handling and user feedback.
   * Currently simulates the API call while the database integration is pending.
   *
   * Purpose: This function is crucial for the core blogging functionality of the app.
   * It processes user input to create new blog posts, which is the primary feature
   * of the platform. Without this function, users cannot publish content, making
   * the blogging app non-functional.
   *
   * Assumptions:
   * - The form data (title, content) is properly captured from state
   * - The user is authenticated and has a valid user ID
   * - Form validation requirements are met (both title and content are required)
   * - The router is available for navigation after successful creation
   * - The component state management is working correctly
   * - Network connectivity will be available for future API calls
   *
   * Edge Cases:
   * - Handles form validation errors before processing
   * - Manages loading states during post creation operations
   * - Handles network failures and API errors gracefully
   * - Provides clear feedback for successful operations
   * - Handles unexpected errors with fallback error messages
   * - Manages form state reset after successful operations
   * - Handles navigation errors gracefully
   * - Validates required fields before submission
   *
   * Component Connections:
   * - Called by form onSubmit event handler
   * - Uses user information from useAuth hook
   * - Integrates with useRouter for post-creation navigation
   * - Updates component state for loading, error, and success display
   * - Prepares post data with author information
   * - Handles success and error states for user feedback
   * - Currently logs post data for debugging (TODO: implement Supabase integration)
   *
   * @param e - React form event from form submission
   * @returns Promise that resolves when post creation operation completes
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (!user?.id) {
      setError("You must be logged in to create a post");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get current session to retrieve access token for RLS-enabled inserts
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Ensure we have a valid session and access token before calling server action
      if (!session || !session.access_token) {
        console.error("No active session or access token available");
        setError(
          "Your session has expired. Please sign in again to create a post."
        );
        return;
      }

      const accessToken = session.access_token;

      const result = await createPost(title, content, user.id, accessToken);

      if (!result.success) {
        setError(result.error || "Failed to create post");
        return;
      }

      // Clear the form
      setTitle("");
      setContent("");

      // Redirect to posts page
      router.push("/posts");
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>
              Fill out the form below to create a new blog post.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter the post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <textarea
                  id="content"
                  placeholder="Enter the post content"
                  className="min-h-[300px] w-full p-3 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                  {error}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/posts")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Post"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
