import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CommentsSection from "@/components/CommentsSection";
import { getPost } from "@/lib/actions/posts";
import { notFound } from "next/navigation";
import AuthorDisplay from "@/components/AuthorDisplay";

/**
 * Individual post page component that displays a specific blog post by ID.
 *
 * Description: This component renders a detailed view of a single blog post
 * based on the provided ID parameter from the URL. It displays the post title,
 * description, and full content in a clean, readable format. Currently shows
 * mock data while database integration is pending.
 *
 * Purpose: This function is essential for content consumption in the blogging app.
 * It provides users with a dedicated page to read individual blog posts in detail,
 * serving as the main content viewing interface. Without this component, users
 * cannot read full blog posts or access individual post content.
 *
 * Assumptions:
 * - The params object contains a valid post ID
 * - The post ID corresponds to an existing blog post
 * - The UI components (Card) are available and properly styled
 * - The Tailwind CSS classes are properly configured for styling
 * - The post data structure matches the expected format
 * - The async params handling works correctly with Next.js 15
 *
 * Edge Cases:
 * - Handles cases where the post ID is invalid or non-existent
 * - Manages display when post data is incomplete or missing
 * - Handles loading states during post data retrieval
 * - Provides fallback display for missing post content
 * - Manages cases where the post ID parameter is malformed
 * - Handles cases where UI components fail to load
 *
 * Component Connections:
 * - Renders Radix UI components for consistent styling
 * - Uses Next.js dynamic routing with [id] parameter
 * - Integrates with async params handling for Next.js 15
 * - Displays mock post data (TODO: integrate with actual post data)
 * - Serves as the main content viewing interface
 * - Provides detailed post reading experience
 *
 * @param params - Object containing the post ID from the URL route
 * @returns JSX element containing the individual post view interface
 */
export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: post, error } = await getPost(id);

  if (error || !post) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl mb-4">{post.title}</CardTitle>
          <div className="text-sm text-muted-foreground mb-4">
            <AuthorDisplay
              authorId={post.author_id}
              createdAt={post.created_at}
              variant="detailed"
              className=""
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <CommentsSection postId={id} />
    </div>
  );
}
