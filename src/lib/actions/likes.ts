"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function getLikeCount(postId: string) {
  try {
    const { count, error } = await supabase
      .from("likes")
      .select("id", { count: "exact" })
      .eq("post_id", postId);

    if (error) {
      console.error("Error fetching like count:", error);
      return { count: 0, error: "Failed to fetch like count" };
    }

    return { count: count ?? 0, error: null };
  } catch (err) {
    console.error("Unexpected error in getLikeCount:", err);
    return { count: 0, error: "Unexpected error" };
  }
}

export async function toggleLike(postId: string, userId: string) {
  try {
    // Check existing like
    const { data: existing, error: checkError } = await supabase
      .from("likes")
      .select("id")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .limit(1)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking existing like:", checkError);
      return { success: false, error: "Failed to toggle like" };
    }

    if (existing && existing.id) {
      const { error: deleteError } = await supabase
        .from("likes")
        .delete()
        .eq("id", existing.id);

      if (deleteError) {
        console.error("Error deleting like:", deleteError);
        return { success: false, error: "Failed to unlike" };
      }

      revalidatePath(`/posts/${postId}`);
      revalidatePath(`/posts`);
      return { success: true, liked: false };
    }

    const { data: inserted, error: insertError } = await supabase
      .from("likes")
      .insert({ user_id: userId, post_id: postId })
      .select("id")
      .single();

    if (insertError) {
      console.error("Error inserting like:", insertError);
      return { success: false, error: "Failed to like" };
    }

    revalidatePath(`/posts/${postId}`);
    revalidatePath(`/posts`);
    return { success: true, liked: true };
  } catch (err) {
    console.error("Unexpected error in toggleLike:", err);
    return { success: false, error: "Unexpected error" };
  }
}
