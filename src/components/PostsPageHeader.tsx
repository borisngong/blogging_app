'use client';

import CreatePostButton from "@/components/CreatePostButton";

/**
 * Client-side header component for the posts page that includes
 * the create post button for authenticated users.
 */
export default function PostsPageHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-4xl font-bold">Blog Posts</h1>
      <CreatePostButton />
    </div>
  );
}
