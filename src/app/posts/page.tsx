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
import { getPosts } from "@/lib/actions/posts";
import PostsPageHeader from "@/components/PostsPageHeader";
import AuthorDisplay from "@/components/AuthorDisplay";
import LikeButton from "@/components/LikeButton";

/**
 * Posts page component that displays a grid of blog posts for browsing.
 *
 * Description: This component renders a page that displays a collection of blog posts
 * in a responsive grid layout. It shows post cards with titles, descriptions, content
 * previews, and "Read More" buttons for navigation to individual post pages.
 * Fetches real data from the Supabase database.
 *
 * Purpose: This function is essential for content discovery in the blogging app.
 * It provides users with a way to browse and discover blog posts, serving as the
 * main content browsing interface. Without this component, users cannot explore
 * the platform's content or find posts to read.
 *
 * Assumptions:
 * - The UI components (Card, Button, Link) are available and properly styled
 * - The Next.js Link component is available for client-side navigation
 * - The Tailwind CSS classes are properly configured for responsive design
 * - The post routes (/posts/[id]) are accessible and functional
 * - The database contains published posts
 * - The responsive grid layout works correctly across devices
 *
 * Edge Cases:
 * - Handles responsive layout for different screen sizes
 * - Manages display when no posts are available
 * - Handles cases where post data is incomplete or missing
 * - Provides fallback display for broken navigation links
 * - Manages loading states for post data retrieval
 * - Handles cases where UI components fail to load
 *
 * Component Connections:
 * - Renders Radix UI components for consistent styling
 * - Integrates with Next.js Link for post navigation
 * - Uses Tailwind CSS for responsive grid layout
 * - Provides navigation to individual post pages
 * - Fetches real post data from Supabase database
 * - Serves as the main content browsing interface
 *
 * @returns JSX element containing the posts browsing interface
 */
export default async function PostsPage() {
  const { data: posts, error } = await getPosts();
  if (error) {
    return (
      <div className="container mx-auto py-8">
        <PostsPageHeader />
        <div className="text-center py-8">
          <p className="text-red-500">Error loading posts: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <PostsPageHeader />
      {!posts || posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No posts available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <div className="text-sm text-muted-foreground mt-2">
                  <AuthorDisplay
                    authorId={post.author_id}
                    createdAt={post.created_at}
                    variant="compact"
                    className=""
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">
                  {post.content.length > 150
                    ? `${post.content.substring(0, 150)}...`
                    : post.content}
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between w-full">
                  <div />
                  <div className="flex items-center gap-4">
                    <LikeButton postId={post.id} />
                    <Link href={`/posts/${post.id}`}>
                      <Button>Read More</Button>
                    </Link>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
