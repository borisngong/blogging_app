-- Add parent_comment_id to comments for nested replies
ALTER TABLE public.comments
ADD COLUMN IF NOT EXISTS parent_comment_id UUID NULL REFERENCES public.comments(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS comments_parent_comment_id_idx ON public.comments(parent_comment_id);

-- Update policies: allow authenticated users to insert comments with an optional parent_comment_id
-- Existing policies that check the insert WITH CHECK on author_id and post published status remain valid.

-- Note: Run this migration against your Supabase database to enable nested comments.
