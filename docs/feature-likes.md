# Posts listing and Likes feature

This commit adds a posts listing page and a simple likes backend:

- UI: `src/app/posts/page.tsx` — responsive grid of posts with `LikeButton` and "Read More" links.
- Component: `src/components/LikeButton.tsx` — client-side button to toggle likes.
- Actions: `src/lib/actions/likes.ts` — server-side helpers to create/delete likes.
- DB migration: `supabase/migrations/20250921_create_likes_table.sql` — adds `likes` table referencing posts and profiles.
- Supabase client: `src/lib/supabase.ts` — updated to support additional RPCs for likes.

Notes:
- Requires Supabase project and environment variables configured in `.env` (SUPABASE_URL, SUPABASE_KEY).
- Consider adding tests for the likes actions.
