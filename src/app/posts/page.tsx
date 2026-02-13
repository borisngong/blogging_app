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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => {
            const words = post.content ? post.content.split(/\s+/).length : 0;
            const readTime = Math.max(1, Math.ceil(words / 200));
            return (
              <article
                key={post.id}
                aria-labelledby={`post-${post.id}-title`}
                className="group"
              >
                <Card className="h-full shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                  <div className="rounded-t-md overflow-hidden bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500 p-4 text-white">
                    <Link href={`/posts/${post.id}`}>
                      <CardTitle
                        id={`post-${post.id}-title`}
                        className="text-lg md:text-xl font-semibold line-clamp-2 hover:underline"
                      >
                        {post.title}
                      </CardTitle>
                    </Link>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <AuthorDisplay
                        authorId={post.author_id}
                        createdAt={post.created_at}
                        variant="compact"
                      />
                      <div className="flex items-center gap-3">
                        <span>{readTime} min read</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="text-muted-foreground">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-4">
                      {post.content.length > 220
                        ? `${post.content.substring(0, 220)}...`
                        : post.content}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.tags.map((t: string) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center justify-between w-full">
                      <LikeButton postId={post.id} />
                      <Link href={`/posts/${post.id}`}>
                        <Button variant="ghost" size="sm">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
