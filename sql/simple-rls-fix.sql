-- Simple RLS Fix for Testimonials
-- This ensures the insert policy works correctly

-- Check current policies
SELECT policyname, cmd, permissive, roles, qual, with_check 
FROM pg_policies 
WHERE tablename = 'testimonials';

-- If the insert policy exists but isn't working, recreate it
DROP POLICY IF EXISTS "Anyone can insert testimonials" ON testimonials;

-- Create a new insert policy that definitely works
CREATE POLICY "testimonials_insert_policy" ON testimonials
  FOR INSERT 
  WITH CHECK (true);

-- Verify the new policy
SELECT policyname, cmd, permissive, roles, qual, with_check 
FROM pg_policies 
WHERE tablename = 'testimonials' AND cmd = 'INSERT'; 