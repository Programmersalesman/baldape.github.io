-- Clean start: Testimonials table with RLS disabled
-- This gives you a working testimonials system without RLS complications

-- Drop existing table if it exists
DROP TABLE IF EXISTS testimonials CASCADE;

-- Create testimonials table
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  discord_username TEXT,
  community TEXT NOT NULL,
  role TEXT DEFAULT 'Member',
  email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  features_liked TEXT[] DEFAULT '{}',
  permission TEXT DEFAULT 'public' CHECK (permission IN ('public', 'private')),
  anonymous TEXT DEFAULT 'public' CHECK (anonymous IN ('public', 'anonymous')),
  approved BOOLEAN DEFAULT false,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_testimonials_approved ON testimonials(approved);
CREATE INDEX idx_testimonials_community ON testimonials(community);
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at);
CREATE INDEX idx_testimonials_rating ON testimonials(rating);

-- Disable RLS (no security policies needed)
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;

-- Insert some sample testimonials
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
) VALUES 
  ('John Doe', 'johndoe#1234', 'baldapes-lab', 'Member', 'john@example.com', 5, 'Amazing service! The bots are incredible and the organization tools are top-notch.', ARRAY['bots', 'organization'], 'public', 'public', true),
  ('Jane Smith', 'janesmith#5678', 'baldapes-lab', 'Moderator', 'jane@example.com', 5, 'The best Discord management service I have ever used. Highly recommend!', ARRAY['organization', 'security'], 'public', 'public', true),
  ('Bob Wilson', 'bobwilson#9012', 'baldapes-lab', 'Member', 'bob@example.com', 4, 'Great experience with the team. Very responsive and professional.', ARRAY['bots'], 'public', 'public', true);

-- Show the final table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'testimonials' 
ORDER BY ordinal_position;

-- Show sample data
SELECT 
    id,
    name,
    community,
    rating,
    approved,
    created_at
FROM testimonials 
ORDER BY created_at DESC; 