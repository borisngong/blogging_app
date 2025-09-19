import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreatePostPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>
            Fill out the form below to create a new blog post.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter the post title" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <textarea
                id="content"
                placeholder="Enter the post content"
                className="min-h-[200px] p-2 border rounded-md"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Create Post</Button>
        </CardFooter>
      </Card>
    </div>
  );
}