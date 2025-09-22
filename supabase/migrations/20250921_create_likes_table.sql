-- Migration: Create likes table

create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  post_id uuid references public.posts(id) on delete cascade,
  created_at timestamptz default now()
);

create index if not exists idx_likes_post_id on public.likes(post_id);
create index if not exists idx_likes_user_id on public.likes(user_id);
