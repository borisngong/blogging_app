import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// In test environments or when env vars are not present, avoid throwing at import time.
// Export a lightweight stub so modules can import `supabase` safely and tests can
// mock it or pass a client override. When env vars are present we create the real client.
let supabaseImpl: any = null;
if (supabaseUrl && supabaseAnonKey) {
  supabaseImpl = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Minimal stubbed client with the shape our code expects. Methods return
  // resolved Promises with null data and an error object by default. Tests
  // should mock `@/lib/supabase` or pass a clientOverride to provide behavior.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const noConfigError = new Error(
    "Supabase not configured (missing NEXT_PUBLIC_SUPABASE_URL/NEXT_PUBLIC_SUPABASE_ANON_KEY)"
  );

  supabaseImpl = {
    auth: {
      // Return a null user and an error object so callers can handle it
      getUser: async () => ({ data: { user: null }, error: noConfigError }),
    },
    from: (_: string) => ({
      select: () => ({
        eq: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: noConfigError }),
          }),
        }),
      }),
      insert: () => ({
        select: () => ({
          single: async () => ({ data: null, error: noConfigError }),
        }),
      }),
      delete: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: noConfigError }),
        }),
      }),
    }),
  } as any;
}

export const supabase = supabaseImpl;

// Types for TypeScript
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          author_id: string;
          created_at: string;
          updated_at: string;
          published: boolean;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          author_id: string;
          created_at?: string;
          updated_at?: string;
          published?: boolean;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          author_id?: string;
          created_at?: string;
          updated_at?: string;
          published?: boolean;
        };
      };
      comments: {
        Row: {
          id: string;
          content: string;
          author_id: string;
          post_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          content: string;
          author_id: string;
          post_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          content?: string;
          author_id?: string;
          post_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          user_id: string;
          post_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          post_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          post_id?: string;
          created_at?: string;
        };
      };
    };
  };
};
