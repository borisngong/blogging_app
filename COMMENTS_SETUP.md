# Comments Feature Setup Guide

This guide explains how to set up the comments feature for the blogging app.

## Database Setup

### 1. Run the Migration

The comments feature requires a new database table. Run the following SQL migration in your Supabase dashboard:

```sql
-- The migration file is located at: supabase/migrations/20241201_create_comments_table.sql
```

Or apply it directly in your Supabase SQL editor:

```sql
-- Create comments table
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

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for comments table
CREATE TRIGGER handle_comments_updated_at
    BEFORE UPDATE ON public.comments
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
```

### 2. Verify the Setup

After running the migration, verify that:

1. The `comments` table exists in your database
2. The Row Level Security policies are active
3. The indexes are created for performance
4. The trigger for `updated_at` is working

## Features

### What's Included

✅ **Database Schema**: Complete comments table with proper relationships and security
✅ **Real-time Updates**: Comments appear instantly without page refresh
✅ **Authentication**: Only logged-in users can comment
✅ **Security**: Row Level Security policies protect user data
✅ **UI Components**: Clean, responsive design using Shadcn components
✅ **Server Actions**: Proper Next.js 15 server actions for comment creation
✅ **Error Handling**: Comprehensive error handling and user feedback
✅ **Performance**: Optimized queries with proper indexing

### How It Works

1. **Comment Display**: Comments are fetched and displayed in chronological order
2. **Real-time Updates**: Uses Supabase real-time subscriptions to show new comments instantly
3. **Comment Form**: Only visible to authenticated users
4. **Security**: All database operations are protected by RLS policies
5. **Validation**: Server-side validation ensures data integrity

### File Structure

```
src/
├── components/
│   └── CommentsSection.tsx          # Main comments component
├── lib/
│   ├── actions/
│   │   └── comments.ts              # Server actions for comments
│   └── supabase.ts                  # Updated with comments types
├── app/posts/[id]/
│   └── page.tsx                     # Updated to include comments
└── supabase/migrations/
    └── 20241201_create_comments_table.sql
```

## Usage

### For Users

1. Navigate to any blog post (`/posts/[id]`)
2. Scroll down to see the comments section
3. If logged in, you can add a comment using the form
4. Comments appear in real-time as they're added

### For Developers

The comments feature is fully integrated and ready to use. The component automatically:

- Fetches comments for the current post
- Sets up real-time listeners
- Handles authentication state
- Provides proper error handling
- Uses server actions for data mutations

## Security Features

- **Row Level Security**: All database operations are protected
- **Authentication Required**: Only logged-in users can comment
- **Data Validation**: Server-side validation prevents invalid data
- **User Isolation**: Users can only modify their own comments
- **Post Validation**: Comments can only be added to published posts

## Performance Optimizations

- **Database Indexes**: Optimized queries for post_id, author_id, and created_at
- **Real-time Subscriptions**: Efficient real-time updates
- **Server Actions**: Optimized data mutations
- **Proper Caching**: Next.js revalidation for updated content

## Troubleshooting

### Common Issues

1. **Comments not showing**: Check if the post is published and RLS policies are active
2. **Can't add comments**: Verify user authentication and RLS policies
3. **Real-time not working**: Check Supabase real-time settings and network connection
4. **Database errors**: Verify the migration was applied correctly

### Debug Steps

1. Check browser console for client-side errors
2. Verify Supabase dashboard for database errors
3. Test RLS policies in Supabase SQL editor
4. Check network tab for failed requests

## Future Enhancements

Potential improvements for the comments feature:

- Comment editing and deletion
- Nested/reply comments
- Comment moderation
- Comment reactions/likes
- Comment notifications
- Rich text formatting
- Comment pagination for large threads
