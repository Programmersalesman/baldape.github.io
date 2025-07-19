-- Fix RLS policies for anon role
-- The issue is that anon role can't insert even with permissive policies

-- First, let's see the current policies
SELECT 
    policyname,
    cmd,
    permissive,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'testimonials';

-- Drop all existing policies
DROP POLICY IF EXISTS "allow_all_inserts" ON testimonials;
DROP POLICY IF EXISTS "allow_public_select" ON testimonials;
DROP POLICY IF EXISTS "insert_all" ON testimonials;
DROP POLICY IF EXISTS "simple_insert" ON testimonials;
DROP POLICY IF EXISTS "simple_select" ON testimonials;

-- Create a policy that explicitly includes anon role
CREATE POLICY "anon_insert" ON testimonials
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Create a select policy for anon role
CREATE POLICY "anon_select" ON testimonials
  FOR SELECT 
  TO anon, authenticated
  USING (approved = true AND permission = 'public');

-- Test as postgres (should work)
INSERT INTO testimonials (name, community, rating, text, permission) 
VALUES ('Postgres Test 2', 'test-community', 5, 'Testing as postgres after policy fix', 'public')
RETURNING id, name, created_at;

-- Show the new policies
SELECT 
    policyname,
    cmd,
    permissive,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'testimonials';

-- Now switch to anon role and test
-- (You'll need to do this manually in the SQL Editor) 