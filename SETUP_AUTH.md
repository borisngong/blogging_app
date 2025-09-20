# Authentication Setup Guide

This guide will help you set up Supabase authentication for your Next.js blogging app.

## 1. Supabase Project Setup

### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - Name: `blogging-app` (or your preferred name)
   - Database Password: Create a strong password
   - Region: Choose the closest region to your users
6. Click "Create new project"

### Get Your Project Credentials
1. Once your project is created, go to Settings > API
2. Copy the following values:
   - Project URL
   - Anon/Public Key

## 2. Environment Variables Setup

### Update .env.local
Add your Supabase credentials to the `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDU2Nzg5MCwiZXhwIjoxOTUwMTQzODkwfQ.example_key_here
```

## 3. Database Schema Setup

### Create Tables in Supabase
Go to the SQL Editor in your Supabase dashboard and run the following SQL:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT false
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for posts
CREATE POLICY "Anyone can view published posts" ON posts
  FOR SELECT USING (published = true);

CREATE POLICY "Users can view their own posts" ON posts
  FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Users can create their own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts" ON posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own posts" ON posts
  FOR DELETE USING (auth.uid() = author_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 4. Authentication Configuration

### Configure Authentication Settings
1. Go to Authentication > Settings in your Supabase dashboard
2. Configure the following:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add `http://localhost:3000/auth/callback` (for production, add your domain)
   - **Email Templates**: Customize if desired

### Enable Email Authentication
1. Go to Authentication > Providers
2. Ensure "Email" provider is enabled
3. Configure email settings if needed

## 5. Testing the Authentication

### Start the Development Server
```bash
npm run dev
```

### Test the Flow
1. Navigate to `http://localhost:3000`
2. Click "Sign In" in the header
3. Try creating a new account:
   - Enter email and password
   - Check your email for confirmation (if email confirmation is enabled)
4. Sign in with your credentials
5. Test protected routes:
   - Try accessing `/dashboard` (should work when signed in)
   - Try accessing `/posts/create` (should work when signed in)
   - Sign out and try accessing protected routes (should redirect to auth page)

## 6. Features Implemented

### ✅ Authentication Features
- User registration with email/password
- User sign-in with email/password
- Session persistence across browser refreshes
- Automatic sign-out on token expiration
- Protected routes with redirect logic
- User profile display in header
- Conditional UI rendering based on auth status

### ✅ UI Components
- Sign-up/Sign-in forms with validation
- Loading states and error handling
- Responsive design with Tailwind CSS
- Dark mode support
- User-friendly error messages

### ✅ Security Features
- Row Level Security (RLS) policies
- JWT token validation
- Secure password requirements
- Protected API routes (ready for implementation)

## 7. Next Steps

### Immediate Next Steps
1. Set up your Supabase project and add credentials to `.env.local`
2. Run the database schema SQL in your Supabase dashboard
3. Test the authentication flow

### Future Enhancements
1. Implement actual post creation/editing with Supabase
2. Add user profile management
3. Implement comment system
4. Add image upload functionality
5. Implement search and filtering
6. Add email verification flow
7. Implement password reset functionality

## Troubleshooting

### Common Issues
1. **"Invalid API key" error**: Check your `.env.local` file has the correct Supabase URL and anon key
2. **CORS errors**: Ensure your site URL is correctly configured in Supabase
3. **Database errors**: Make sure you've run the SQL schema setup
4. **Authentication not working**: Check browser console for errors and verify environment variables

### Getting Help
- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the [Next.js Documentation](https://nextjs.org/docs)
- Check the browser console for detailed error messages

