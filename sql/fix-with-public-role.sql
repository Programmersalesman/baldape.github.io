-- Fix RLS policies using public role (standard Supabase approach)
-- The anon role might need to inherit from public role

-- Drop existing policies
DROP POLICY IF EXISTS "anon_insert" ON testimonials;
DROP POLICY IF EXISTS "anon_select" ON testimonials;

-- Create policies using public role (which anon inherits from)
CREATE POLICY "public_insert" ON testimonials
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "public_select" ON testimonials
  FOR SELECT 
  USING (approved = true AND permission = 'public');

-- Test as postgres first
INSERT INTO testimonials (name, community, rating, text, permission) 
VALUES ('Postgres Test 3', 'test-community', 5, 'Testing as postgres with public role', 'public')
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

-- Check if anon role is a member of public role
SELECT 
    r.rolname as role_name,
    m.rolname as member_name
FROM pg_roles r
JOIN pg_auth_members am ON r.oid = am.roleid
JOIN pg_roles m ON am.member = m.oid
WHERE r.rolname = 'public' OR m.rolname = 'anon'; 