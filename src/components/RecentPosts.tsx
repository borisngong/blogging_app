import Link from "next/link";

interface Post {
  id: string;
  title: string;
  created_at?: string;
}

export default function RecentPosts({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) return null;

  const recent = posts.slice(0, 8);

  return (
    <aside>
      <h4 className="text-lg font-medium mb-3">Recent Posts</h4>
      <ul className="space-y-2">
        {recent.map((p) => (
          <li key={p.id} className="flex justify-between items-center">
            <Link
              href={`/posts/${p.id}`}
              className="text-sm text-gray-800 dark:text-gray-200 hover:underline truncate"
            >
              {p.title}
            </Link>
            <span className="text-xs text-muted-foreground ml-4">
              {p.created_at?.slice(0, 10)}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
