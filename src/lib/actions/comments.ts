"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

/**
 * Validates if a string is a valid UUID format
 */
function isValidUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Server action to create a new comment for a blog post.
 *
 * @param postId - The ID of the post to comment on
 * @param content - The comment content
 * @returns Promise with success status and error message if any
 */
export async function createComment(
  postId: string,
  content: string,
  accessToken?: string
): Promise<{ success: boolean; error?: string; comment?: any }> {
  try {
    // If an accessToken is provided, create a client that sends it so
    // supabase.auth.getUser() and RLS checks work in server actions.
    let client = supabase;
    if (accessToken) {
      // Basic JWT format validation (header.payload.signature)
      const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
      if (!jwtRegex.test(accessToken)) {
        console.error("Invalid access token format passed to createComment");
        return { success: false, error: "Invalid access token" };
      }

      try {
        const { createClient } = await import("@supabase/supabase-js");

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!supabaseUrl || !supabaseAnonKey) {
          console.error(
            "Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL/NEXT_PUBLIC_SUPABASE_ANON_KEY) for authenticated client"
          );
          return { success: false, error: "Server configuration error" };
        }

        client = createClient(
          supabaseUrl as string,
          supabaseAnonKey as string,
          {
            global: { headers: { Authorization: `Bearer ${accessToken}` } },
          }
        );
      } catch (err) {
        console.error(
          "Failed to create token-attached Supabase client in createComment:",
          err
        );
        return {
          success: false,
          error: "Failed to authenticate comment request",
        };
      }
    }

    // Verify the user is authenticated
    let user: any = null;
    try {
      const {
        data: { user: fetchedUser },
        error: authError,
      } = accessToken
        ? await client.auth.getUser(accessToken)
        : await client.auth.getUser();
      if (authError) {
        console.error("Auth error:", authError);
        return {
          success: false,
          error: "Authentication error",
        };
      }

      user = fetchedUser;

      if (!user) {
        return {
          success: false,
          error: "You must be logged in to comment",
        };
      }
    } catch (err: any) {
      console.error("Failed to call auth.getUser():", err);
      return {
        success: false,
        error: err?.message || "Authentication fetch failed",
      };
    }

    // Validate input
    if (!postId || !content.trim()) {
      return {
        success: false,
        error: "Missing required fields",
      };
    }

    // Validate postId format
    if (!isValidUUID(postId)) {
      return {
        success: false,
        error: "Invalid post ID format",
      };
    }

    // Additional content validation
    if (content.trim().length < 1) {
      return {
        success: false,
        error: "Comment cannot be empty",
      };
    }

    if (content.trim().length > 1000) {
      return {
        success: false,
        error: "Comment is too long (maximum 1000 characters)",
      };
    }

    // Check if the post exists and is published
    // Check if the post exists and is published
    let post: any = null;
    try {
      const { data: fetchedPost, error: postError } = await client
        .from("posts")
        .select("id, published")
        .eq("id", postId)
        .eq("published", true)
        .single();

      if (postError || !fetchedPost) {
        return {
          success: false,
          error: "Post not found or not published",
        };
      }

      post = fetchedPost;
    } catch (err: any) {
      console.error("Failed to fetch post:", err);
      return {
        success: false,
        error: err?.message || "Failed to fetch post",
      };
    }

    // Insert the comment using the authenticated user's ID
    // Insert the comment using the authenticated user's ID
    let insertedData: any = null;
    try {
      const { data: created, error: insertError } = await client
        .from("comments")
        .insert({
          content: content.trim(),
          author_id: user.id,
          post_id: postId,
        })
        .select("*")
        .single();

      if (insertError) {
        console.error("Error creating comment:", {
          error: insertError,
          userId: user.id,
          postId,
          contentLength: content.trim().length,
        });

        // Check for specific error types
        if (insertError.code === "PGRST301") {
          return {
            success: false,
            error: "You are not authorized to comment on this post",
          };
        }

        return {
          success: false,
          error: "Failed to create comment. Please try again.",
        };
      }

      insertedData = created;
    } catch (err: any) {
      console.error("Failed to insert comment:", err);
      return {
        success: false,
        error: err?.message || "Failed to create comment",
      };
    }

    // Revalidate the post page to show the new comment
    revalidatePath(`/posts/${postId}`);

    return { success: true, comment: insertedData };
  } catch (error) {
    console.error("Error in createComment:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

/**
 * Server action to fetch comments for a specific post.
 *
 * @param postId - The ID of the post to fetch comments for
 * @returns Promise with comments data or error
 */
export async function getComments(postId: string) {
  try {
    // Validate postId format
    if (!postId || !isValidUUID(postId)) {
      return {
        data: null,
        error: "Invalid post ID format",
      };
    }

    const { data, error } = await supabase
      .from("comments")
      .select(
        `
        *,
        profiles:author_id (
          full_name,
          email
        )
      `
      )
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching comments:", {
        error,
        postId,
      });
      return { data: null, error: "Failed to fetch comments" };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error in getComments:", {
      error,
      postId,
    });
    return { data: null, error: "An unexpected error occurred" };
  }
}

/**
 * Server action to delete a comment.
 * Only the comment author can delete their own comments.
 *
 * @param commentId - The ID of the comment to delete
 * @returns Promise with success status and error message if any
 */
export async function deleteComment(
  commentId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Verify the user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error("Auth error:", authError);
      return {
        success: false,
        error: "Authentication error",
      };
    }

    if (!user) {
      return {
        success: false,
        error: "You must be logged in to delete comments",
      };
    }

    // Validate commentId format
    if (!commentId || !isValidUUID(commentId)) {
      return {
        success: false,
        error: "Invalid comment ID format",
      };
    }
    // Get the post_id before deleting to avoid race (record may be gone after delete)
    const { data: commentRow, error: selectError } = await client
      .from("comments")
      .select("post_id")
      .eq("id", commentId)
      .single();

    let postIdToRevalidate: string | undefined = undefined;
    if (selectError) {
      console.error("Failed to select comment post_id before delete:", {
        error: selectError,
        commentId,
      });
    } else if (commentRow?.post_id) {
      postIdToRevalidate = commentRow.post_id;
    }

    // Delete the comment (RLS policies will ensure only the author can delete)
    const { error: deleteError } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId)
      .eq("author_id", user.id); // Additional security check

    if (deleteError) {
      console.error("Error deleting comment:", {
        error: deleteError,
        userId: user.id,
        commentId,
      });

      if (deleteError.code === "PGRST301") {
        return {
          success: false,
          error: "You are not authorized to delete this comment",
        };
      }

      return {
        success: false,
        error: "Failed to delete comment. Please try again.",
      };
    }

    // Revalidate the post page to reflect the deletion if we have the post_id
    if (postIdToRevalidate) {
      revalidatePath(`/posts/${postIdToRevalidate}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error in deleteComment:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
