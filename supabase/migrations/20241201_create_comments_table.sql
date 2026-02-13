-- Create comments table (requires posts table to exist first)
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS comments_post_id_idx ON public.comments(post_id);
CREATE INDEX IF NOT EXISTS comments_author_id_idx ON public.comments(author_id);
CREATE INDEX IF NOT EXISTS comments_created_at_idx ON public.comments(created_at);

-- Enable Row Level Security
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Create policies for comments
-- Users can read all comments for published posts
CREATE POLICY "Users can read comments for published posts" ON public.comments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.posts 
            WHERE posts.id = comments.post_id 
            AND posts.published = true
        )
    );

-- Authenticated users can insert their own comments
CREATE POLICY "Authenticated users can insert their own comments" ON public.comments
    FOR INSERT WITH CHECK (
        auth.uid() = author_id 
        AND EXISTS (
            SELECT 1 FROM public.posts 
            WHERE posts.id = comments.post_id 
            AND posts.published = true
        )
    );

-- Users can update their own comments
CREATE POLICY "Users can update their own comments" ON public.comments
    FOR UPDATE USING (auth.uid() = author_id)
    WITH CHECK (auth.uid() = author_id);

-- Users can delete their own comments
CREATE POLICY "Users can delete their own comments" ON public.comments
    FOR DELETE USING (auth.uid() = author_id);

-- Create trigger for comments table (function already created in posts migration)
CREATE TRIGGER handle_comments_updated_at
    BEFORE UPDATE ON public.comments
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
