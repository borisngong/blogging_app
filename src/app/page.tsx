import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <main className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to My Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Discover amazing stories, insights, and ideas. Read, create, and share your thoughts with the world.
          </p>
          
          <div className="flex gap-4 justify-center mb-16">
            <Link href="/posts">
              <Button size="lg" className="px-8">
                Browse Posts
              </Button>
            </Link>
            <Link href="/posts/create">
              <Button variant="outline" size="lg" className="px-8">
                Create Post
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Read & Discover</CardTitle>
                <CardDescription>
                  Explore a collection of engaging blog posts on various topics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Find inspiration, learn new things, and stay updated with the latest content.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create & Share</CardTitle>
                <CardDescription>
                  Write and publish your own blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Share your thoughts, experiences, and knowledge with a global audience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Content</CardTitle>
                <CardDescription>
                  Organize and manage your blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Edit, update, and maintain your content with our intuitive dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
