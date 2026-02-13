import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface Post {
  id: string;
  title: string;
  content?: string;
  created_at?: string;
}

export default function FeaturedPosts({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) return null;

  const featured = posts.slice(0, 3);

  return (
    <section>
      <h3 className="text-2xl font-semibold mb-4">Featured</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <CardTitle className="truncate">{p.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {p.content}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href={`/posts/${p.id}`}
                className="text-sm text-primary underline"
              >
                Read post
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
