"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { createComment } from "@/lib/actions/comments";
import AuthorDisplay from "@/components/AuthorDisplay";
import type { Database } from "@/lib/supabase";

type Comment = Database["public"]["Tables"]["comments"]["Row"];

interface CommentsSectionProps {
  postId: string;
}

/**
 * Comments section component that displays comments for a blog post and allows
 * authenticated users to add new comments with real-time updates.
 *
 * Features:
 * - Displays all comments for the current post
 * - Real-time updates when new comments are added
 * - Comment form for authenticated users only
 * - Proper error handling and loading states
 * - Responsive design with Shadcn components
 */
export default function CommentsSection({ postId }: CommentsSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Fetch comments for the current post
  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching comments:", error);
        setError("Failed to load comments");
        return;
      }

      setComments(data || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  // Set up real-time listener for new comments
  useEffect(() => {
    fetchComments();

    const channel = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          // Fetch the new comment
          const fetchNewComment = async () => {
            const { data, error } = await supabase
              .from("comments")
              .select("*")
              .eq("id", payload.new.id)
              .single();

            if (data && !error) {
              setComments((prev) => {
                // Ignore if we already have this comment
                if (prev.some((c) => c.id === data.id)) return prev;
                return [...prev, data];
              });
            }
          };

          fetchNewComment();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  // Handle comment submission
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !newComment.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Get session access token to pass into the server action so RLS/auth works
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const accessToken = session?.access_token;

      const result = await createComment(postId, newComment, accessToken);

      if (!result.success) {
        setError(result.error || "Failed to submit comment");
        return;
      }

      // Append the returned comment immediately so it shows up in the UI
      const created = result.comment;
      if (created) {
        setComments((prev) => {
          if (created.id && prev.some((c) => c.id === created.id)) return prev;
          return [...prev, created];
        });
      }

      // Clear the form
      setNewComment("");
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError("Failed to submit comment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading comments...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Comments ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comments List */}
        {comments.length === 0 ? (
          <p className="text-muted-foreground">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="border-l-4 border-muted pl-4 py-3"
              >
                <AuthorDisplay
                  authorId={comment.author_id}
                  createdAt={comment.created_at}
                  variant="compact"
                  className="mb-2"
                />
                <p className="text-sm text-foreground whitespace-pre-wrap ml-10">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Comment Form - Only show for authenticated users */}
        {user ? (
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="comment">Add a comment</Label>
              <Input
                id="comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                disabled={submitting}
                required
              />
            </div>
            <Button type="submit" disabled={submitting || !newComment.trim()}>
              {submitting ? "Posting..." : "Post Comment"}
            </Button>
          </form>
        ) : (
          <div className="p-4 bg-muted/50 rounded-md">
            <p className="text-sm text-muted-foreground">
              Please sign in to leave a comment.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
