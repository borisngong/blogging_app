-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    published BOOLEAN DEFAULT false NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS posts_author_id_idx ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS posts_published_idx ON public.posts(published);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON public.posts(created_at);

-- Enable Row Level Security
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create policies for posts
-- Anyone can read published posts
CREATE POLICY "Anyone can read published posts" ON public.posts
    FOR SELECT USING (published = true);

-- Authenticated users can insert their own posts
CREATE POLICY "Authenticated users can insert their own posts" ON public.posts
    FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Users can update their own posts
CREATE POLICY "Users can update their own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = author_id)
    WITH CHECK (auth.uid() = author_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete their own posts" ON public.posts
    FOR DELETE USING (auth.uid() = author_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for posts table
CREATE TRIGGER handle_posts_updated_at
    BEFORE UPDATE ON public.posts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
