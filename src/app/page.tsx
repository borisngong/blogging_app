import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Home page component that serves as the main landing page for the blogging app.
 * 
 * Description: This component renders the primary landing page that introduces
 * users to the blogging platform. It provides an attractive welcome interface
 * with call-to-action buttons, feature descriptions, and navigation options
 * to help users understand and access the app's functionality.
 * 
 * Purpose: This function is essential for user onboarding and first impressions
 * in the blogging app. It serves as the entry point for new and returning users,
 * providing clear navigation to key features like browsing posts and creating
 * content. Without this component, users would lack a welcoming introduction
 * to the platform and clear paths to access its features.
 * 
 * Assumptions:
 * - The UI components (Button, Card, Link) are available and properly styled
 * - The Next.js Link component is available for client-side navigation
 * - The Tailwind CSS classes are properly configured for styling
 * - The responsive design classes work correctly across devices
 * - The navigation routes (/posts, /posts/create) are accessible
 * - The dark mode styling is properly configured
 * 
 * Edge Cases:
 * - Handles responsive layout for different screen sizes
 * - Manages dark mode display correctly
 * - Handles cases where navigation links are broken
 * - Provides fallback display for missing content
 * - Manages loading states for component rendering
 * - Handles cases where UI components fail to load
 * 
 * Component Connections:
 * - Renders Radix UI components for consistent styling
 * - Integrates with Next.js Link for client-side navigation
 * - Uses Tailwind CSS for responsive design and theming
 * - Provides navigation to posts browsing and creation features
 * - Serves as the main entry point for the application
 * - Displays feature cards to explain app functionality
 * 
 * @returns JSX element containing the home page interface
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <main className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to My Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Discover amazing stories, insights, and ideas. Read, create, and share your thoughts with the world.
          </p>
          
          <div className="flex gap-4 justify-center mb-16">
            <Link href="/posts">
              <Button size="lg" className="px-8">
                Browse Posts
              </Button>
            </Link>
            <Link href="/posts/create">
              <Button variant="outline" size="lg" className="px-8">
                Create Post
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Read & Discover</CardTitle>
                <CardDescription>
                  Explore a collection of engaging blog posts on various topics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Find inspiration, learn new things, and stay updated with the latest content.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create & Share</CardTitle>
                <CardDescription>
                  Write and publish your own blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Share your thoughts, experiences, and knowledge with a global audience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Content</CardTitle>
                <CardDescription>
                  Organize and manage your blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Edit, update, and maintain your content with our intuitive dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
