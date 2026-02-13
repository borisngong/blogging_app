'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Create Post Button component that shows a "Create Post" button
 * only for authenticated users.
 */
export default function CreatePostButton() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Link href="/posts/create">
      <Button>Create New Post</Button>
    </Link>
  );
}
