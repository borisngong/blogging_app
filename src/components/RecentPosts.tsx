import Link from "next/link";
import { formatPostDate } from "@/lib/utils/author";

interface Post {
  id: string;
  title: string;
  created_at?: string;
}

function ChevronRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function RecentPosts({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) return null;

  const recent = posts.slice(0, 8);

  return (
    <aside className="w-full">
      <div className="rounded-xl bg-white/60 dark:bg-gray-900/50 p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold tracking-tight">Recent Posts</h4>
          <Link href="/posts" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>

        <ul className="space-y-2">
          {recent.map((p) => (
            <li key={p.id}>
              <Link
                href={`/posts/${p.id}`}
                className="group flex items-center gap-3 justify-between hover:shadow hover:translate-y-0.5 hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-md transition-all"
                aria-label={`Open post ${p.title}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                    {p.title.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-100">
                      {p.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {p.created_at ? formatPostDate(p.created_at) : ""}
                    </p>
                  </div>
                </div>

                <div className="ml-4 flex items-center gap-3 text-muted-foreground">
                  <span className="hidden sm:inline text-xs">
                    {p.created_at
                      ? new Date(p.created_at).toLocaleDateString()
                      : ""}
                  </span>
                  <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
