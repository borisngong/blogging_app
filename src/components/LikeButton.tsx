"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { toggleLike } from "@/lib/actions/likes";
import { useAuth } from "@/contexts/AuthContext";

export default function LikeButton({ postId }: { postId: string }) {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCount = async () => {
    try {
      const { data, error } = await supabase
        .from("likes")
        .select("id", { count: "exact" })
        .eq("post_id", postId);
      if (!error) setCount(data?.length ?? 0);
    } catch (err) {
      console.error("Failed to fetch like count:", err);
    }
  };

  const checkLiked = async () => {
    if (!user) return setLiked(false);
    try {
      const { data, error } = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .limit(1)
        .single();
      setLiked(!!data);
    } catch (err) {
      setLiked(false);
    }
  };

  useEffect(() => {
    fetchCount();
    checkLiked();

    const channel = supabase.channel(`likes:${postId}`);

    channel.on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "likes",
        filter: `post_id=eq.${postId}`,
      },
      () => setCount((c) => c + 1)
    );

    channel.on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "likes",
        filter: `post_id=eq.${postId}`,
      },
      () => setCount((c) => Math.max(0, c - 1))
    );

    channel.subscribe();

    return () => {
      try {
        supabase.removeChannel(channel);
      } catch (err) {}
    };
  }, [postId, user]);

  const handleToggle = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await toggleLike(postId, user.id);
      if (res.success) {
        setLiked(!!res.liked);
        setCount((c) => c + (res.liked ? 1 : -1));
      }
    } catch (err) {
      console.error("Failed to toggle like:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <Button size="sm" onClick={handleToggle} disabled={loading}>
        {liked ? "♥ Liked" : "♡ Like"}
      </Button>
      <span className="text-sm text-muted-foreground">{count}</span>
    </div>
  );
}
