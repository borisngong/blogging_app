"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

/**
 * Server action to create a new blog post.
 *
 * @param title - The title of the blog post
 * @param content - The content of the blog post
 * @param authorId - The ID of the user creating the post
 * @returns Promise with success status and error message if any
 */
export async function createPost(
  title: string,
  content: string,
  authorId: string,
  accessToken?: string
): Promise<{ success: boolean; error?: string; postId?: string }> {
  try {
    // Validate input
    if (!title.trim() || !content.trim() || !authorId) {
      return {
        success: false,
        error: "Title, content, and author ID are required",
      };
    }

    // Insert the post. If accessToken is provided use a client that sends it
    // so RLS policies that rely on auth.uid() will work.
    let client = supabase;
    let tokenClientUnavailable = false;
    if (accessToken) {
      // Basic JWT format validation (header.payload.signature)
      const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
      if (!jwtRegex.test(accessToken)) {
        console.error("Invalid access token format passed to createPost");
        return { success: false, error: "Invalid access token" };
      }

      try {
        // Dynamically import to avoid SSR/module issues in RSC context
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
          { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
        );
      } catch (err) {
        // If we cannot create the token-attached client, log and decide how to proceed
        console.error(
          "Failed to create token-attached Supabase client in createPost:",
          err
        );
        tokenClientUnavailable = true;
        // Fall back to unauthenticated client but do not silently ignore the fact
        // that the accessToken could not be used. We'll return an error below
        // if strict token usage is required.
        client = supabase;
      }
    }

    // If an accessToken was provided but we couldn't create a token client,
    // it's safer to surface an error than to attempt an unauthenticated insert
    // which would likely violate RLS policies.
    if (accessToken && tokenClientUnavailable) {
      console.error(
        "Access token provided but token client unavailable; aborting createPost"
      );
      return {
        success: false,
        error: "Failed to use access token for authenticated request",
      };
    }

    const { data, error: insertError } = await client
      .from("posts")
      .insert({
        title: title.trim(),
        content: content.trim(),
        author_id: authorId,
        published: true, // Auto-publish for now
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Error creating post:", insertError);
      return {
        success: false,
        error: "Failed to create post",
      };
    }

    // Log the insert result for testing/debugging so the dev server shows the created post id
    console.log("createPost: insert result:", { data, insertError });

    // Revalidate the posts pages to show the new post
    revalidatePath("/posts");
    revalidatePath("/");

    return {
      success: true,
      postId: data.id,
    };
  } catch (error) {
    console.error("Error in createPost:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

/**
 * Server action to fetch all published posts.
 *
 * @returns Promise with posts data or error
 */
export async function getPosts() {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      return { data: null, error: "Failed to fetch posts" };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error in getPosts:", error);
    return { data: null, error: "An unexpected error occurred" };
  }
}

/**
 * Server action to fetch a single post by ID.
 *
 * @param postId - The ID of the post to fetch
 * @returns Promise with post data or error
 */
export async function getPost(postId: string) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId)
      .eq("published", true)
      .single();

    if (error) {
      console.error("Error fetching post:", error);
      return { data: null, error: "Post not found" };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error in getPost:", error);
    return { data: null, error: "An unexpected error occurred" };
  }
}
