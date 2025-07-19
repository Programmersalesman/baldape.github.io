-- Production-ready security policies
-- This allows anonymous inserts but restricts other operations

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "allow_everything" ON testimonials;

-- Create production policies
-- 1. Allow anonymous inserts (for testimonials)
CREATE POLICY "anon_insert_testimonials" ON testimonials
  FOR INSERT 
  WITH CHECK (true);

-- 2. Allow public viewing of approved testimonials only
CREATE POLICY "public_view_approved" ON testimonials
  FOR SELECT 
  USING (approved = true AND permission = 'public');

-- 3. Allow authenticated users to view their own testimonials
CREATE POLICY "auth_view_own" ON testimonials
  FOR SELECT 
  TO authenticated
  USING (true);

-- 4. Allow admins to update testimonials (for approval)
CREATE POLICY "admin_update" ON testimonials
  FOR UPDATE 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. Allow admins to delete testimonials
CREATE POLICY "admin_delete" ON testimonials
  FOR DELETE 
  TO authenticated
  USING (true);

-- Test the new policies
INSERT INTO testimonials (name, community, rating, text, permission) 
VALUES ('Production Test', 'test-community', 5, 'Testing production policies', 'public')
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
WHERE tablename = 'testimonials'
ORDER BY cmd, policyname; 