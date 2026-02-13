import { getPosts } from "@/lib/actions/posts";
import HomeHero from "@/components/HomeHero";
import FeaturedPosts from "@/components/FeaturedPosts";
import RecentPosts from "@/components/RecentPosts";

export default async function Home() {
  const { data: postsData } = await getPosts();
  const posts = Array.isArray(postsData) ? postsData : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white/60 via-slate-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <HomeHero />

            <FeaturedPosts posts={posts} />
          </div>

          <div>
            <RecentPosts posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}
