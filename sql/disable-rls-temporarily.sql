-- Temporarily disable RLS to test if that's the issue
-- This will allow all operations without any policy restrictions

-- First, let's see what we have
SELECT 
    policyname,
    cmd,
    permissive,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'testimonials';

-- Disable RLS completely
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;

-- Test insert without any RLS restrictions
INSERT INTO testimonials (
  name, 
  discord_username, 
  community, 
  role, 
  email, 
  rating, 
  text, 
  features_liked, 
  permission, 
  anonymous, 
  approved
) VALUES (
  'RLS Disabled Test',
  'testuser#1234',
  'test-community',
  'member',
  'test@example.com',
  5,
  'Testing with RLS completely disabled',
  ARRAY['organization', 'bots'],
  'public',
  'public',
  false
);

-- Verify it worked
SELECT * FROM testimonials WHERE name = 'RLS Disabled Test' ORDER BY created_at DESC LIMIT 1;

-- Clean up test data
DELETE FROM testimonials WHERE name = 'RLS Disabled Test';

-- Show that RLS is disabled
SELECT 
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'testimonials'; 