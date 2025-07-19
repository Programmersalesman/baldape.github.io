-- Fix RLS Policies for Testimonials
-- This script ensures anonymous users can insert testimonials

-- First, drop any existing policies that might conflict
DROP POLICY IF EXISTS "Anyone can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Public can view approved testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admins can view all testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admins can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admins can delete testimonials" ON testimonials;

-- Recreate the policies with proper permissions
-- Anyone can insert testimonials (including anonymous users)
CREATE POLICY "Anyone can insert testimonials" ON testimonials
  FOR INSERT WITH CHECK (true);

-- Only approved testimonials are visible to public
CREATE POLICY "Public can view approved testimonials" ON testimonials
  FOR SELECT USING (approved = true AND permission = 'public');

-- Admins can view all testimonials (when authenticated)
CREATE POLICY "Admins can view all testimonials" ON testimonials
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'moderator')
    )
  );

-- Admins can update testimonials (when authenticated)
CREATE POLICY "Admins can update testimonials" ON testimonials
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'moderator')
    )
  );

-- Admins can delete testimonials (when authenticated)
CREATE POLICY "Admins can delete testimonials" ON testimonials
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'moderator')
    )
  );

-- Verify the policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'testimonials'; 