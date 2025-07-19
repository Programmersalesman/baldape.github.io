-- Fix conflicting RLS policies
-- The issue is that even postgres superuser can't insert, which means the policies are broken

-- First, let's see what's actually happening
SELECT 
    policyname,
    cmd,
    permissive,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'testimonials';

-- Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "allow_all_inserts" ON testimonials;
DROP POLICY IF EXISTS "allow_public_select" ON testimonials;
DROP POLICY IF EXISTS "insert_all" ON testimonials;
DROP POLICY IF EXISTS "Anyone can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Public can view approved testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admins can view all testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admins can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admins can delete testimonials" ON testimonials;

-- Temporarily disable RLS to test
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;

-- Test insert without RLS
INSERT INTO testimonials (name, community, rating, text, permission) 
VALUES ('No RLS Test', 'test-community', 5, 'Testing without RLS', 'public')
RETURNING id, name, created_at;

-- Re-enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create a single, simple insert policy
CREATE POLICY "simple_insert" ON testimonials
  FOR INSERT 
  WITH CHECK (true);

-- Create a simple select policy
CREATE POLICY "simple_select" ON testimonials
  FOR SELECT 
  USING (approved = true AND permission = 'public');

-- Test the new policy
INSERT INTO testimonials (name, community, rating, text, permission) 
VALUES ('Policy Test', 'test-community', 5, 'Testing new policy', 'public')
RETURNING id, name, created_at;

-- Show final policies
SELECT 
    policyname,
    cmd,
    permissive,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'testimonials'; 