-- Supabase Schema - Complete Database Setup
-- This file drops and recreates all tables from scratch

BEGIN;

-- ===== DROP EXISTING TABLES =====
-- Drop in reverse dependency order
DROP VIEW IF EXISTS testimonial_reaction_counts CASCADE;
DROP TABLE IF EXISTS testimonial_reactions CASCADE;
DROP TABLE IF EXISTS testimonials_input CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS consultations CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS approve_testimonial(INTEGER) CASCADE;
DROP FUNCTION IF EXISTS reject_testimonial(INTEGER, TEXT) CASCADE;

-- ===== CREATE TABLES =====

-- 1. Profiles table (for admin authentication)
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE,
    full_name TEXT,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Consultations table
CREATE TABLE consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    discord TEXT,
    community TEXT NOT NULL,
    member_count TEXT,
    services TEXT[] NOT NULL,
    goals TEXT NOT NULL,
    challenges TEXT,
    timeline TEXT NOT NULL,
    budget TEXT NOT NULL,
    preferred_time TEXT DEFAULT 'flexible',
    additional_info TEXT,
    status TEXT DEFAULT 'pending',
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Testimonials input table (no RLS - for submissions)
CREATE TABLE testimonials_input (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    discord_username TEXT,
    community TEXT NOT NULL,
    role TEXT DEFAULT 'member',
    email TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text TEXT NOT NULL,
    features_liked TEXT[] DEFAULT '{}',
    permission TEXT DEFAULT 'public',
    anonymous BOOLEAN DEFAULT false,
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Testimonials table (with RLS - for display)
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    discord_username TEXT,
    community TEXT NOT NULL,
    role TEXT DEFAULT 'member',
    email TEXT,
    rating INTEGER NOT NULL,
    text TEXT NOT NULL,
    features_liked TEXT[] DEFAULT '{}',
    permission TEXT DEFAULT 'public',
    anonymous BOOLEAN DEFAULT false,
    approved BOOLEAN DEFAULT false,
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Testimonial reactions table
CREATE TABLE testimonial_reactions (
    id SERIAL PRIMARY KEY,
    testimonial_id INTEGER REFERENCES testimonials(id) ON DELETE CASCADE,
    user_id VARCHAR(255) NOT NULL,
    reaction_type VARCHAR(32) NOT NULL, -- now stores key, not emoji
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (testimonial_id, user_id, reaction_type)
);

-- 6. Testimonial reaction counts (view for performance)
CREATE VIEW testimonial_reaction_counts AS
SELECT 
    testimonial_id,
    reaction_type,
    COUNT(*) as count
FROM testimonial_reactions
GROUP BY testimonial_id, reaction_type;

-- ===== CREATE INDEXES =====

-- Profiles indexes
CREATE INDEX idx_profiles_email ON profiles(email);

-- Consultations indexes
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_created_at ON consultations(created_at);

-- Testimonials input indexes
CREATE INDEX idx_testimonials_input_created_at ON testimonials_input(created_at);
CREATE INDEX idx_testimonials_input_community ON testimonials_input(community);
CREATE INDEX idx_testimonials_input_role ON testimonials_input(role);

-- Testimonials indexes
CREATE INDEX idx_testimonials_approved ON testimonials(approved);
CREATE INDEX idx_testimonials_community ON testimonials(community);
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at);
CREATE INDEX idx_testimonials_rating ON testimonials(rating);
CREATE INDEX idx_testimonials_role ON testimonials(role);

-- Reactions indexes
CREATE INDEX idx_testimonial_reactions_testimonial_id ON testimonial_reactions(testimonial_id);
CREATE INDEX idx_testimonial_reactions_user_id ON testimonial_reactions(user_id);
CREATE INDEX idx_testimonial_reactions_reaction_type ON testimonial_reactions(reaction_type);
CREATE INDEX idx_testimonial_reactions_created_at ON testimonial_reactions(created_at);

-- ===== CREATE FUNCTIONS =====

-- Function to approve testimonials (move from input to main table)
CREATE OR REPLACE FUNCTION approve_testimonial(input_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    new_id INTEGER;
BEGIN
    -- Insert into main testimonials table
    INSERT INTO testimonials (
        name, discord_username, community, role, email, 
        rating, text, features_liked, permission, 
        anonymous, admin_notes, approved, created_at, updated_at
    )
    SELECT 
        name, discord_username, community, role, email,
        rating, text, features_liked, permission,
        anonymous, admin_notes, true, created_at, now()
    FROM testimonials_input 
    WHERE id = input_id;
    
    -- Get the new ID
    new_id := currval('testimonials_id_seq');
    
    -- Delete from input table
    DELETE FROM testimonials_input WHERE id = input_id;
    
    RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reject testimonials
CREATE OR REPLACE FUNCTION reject_testimonial(input_id INTEGER, reason TEXT DEFAULT NULL)
RETURNS VOID AS $$
BEGIN
    -- Update admin notes with rejection reason
    UPDATE testimonials_input 
    SET admin_notes = COALESCE(admin_notes || E'\nRejected: ' || reason, 'Rejected: ' || reason),
        updated_at = now()
    WHERE id = input_id;
    
    -- Optionally delete instead of keeping with notes
    -- DELETE FROM testimonials_input WHERE id = input_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update reaction counts (not needed for view - view updates automatically)
-- Keeping this for potential future use if we switch to materialized view
CREATE OR REPLACE FUNCTION update_reaction_counts()
RETURNS TRIGGER AS $$
BEGIN
    -- For a regular view, counts update automatically
    -- This function is kept for potential future materialized view implementation
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- ===== CREATE TRIGGERS =====

-- Note: No triggers needed for reaction counts view
-- The view automatically updates when testimonial_reactions table changes

-- ===== SETUP ROW LEVEL SECURITY =====

-- Disable RLS on input table (allow anyone to submit)
ALTER TABLE testimonials_input DISABLE ROW LEVEL SECURITY;

-- Enable RLS on main tables
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonial_reactions ENABLE ROW LEVEL SECURITY;

-- ===== CREATE RLS POLICIES =====

-- Testimonials policies
CREATE POLICY "Public read approved testimonials" ON testimonials
FOR SELECT USING (
    approved = true 
    AND permission = 'public'
);

CREATE POLICY "Admins can read all testimonials" ON testimonials
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('admin', 'moderator')
    )
);

CREATE POLICY "Admins can update testimonials" ON testimonials
FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('admin', 'moderator')
    )
);

CREATE POLICY "Admins can delete testimonials" ON testimonials
FOR DELETE USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('admin', 'moderator')
    )
);

-- Consultations policies
CREATE POLICY "Anyone can insert consultations" ON consultations
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view consultations" ON consultations
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('admin', 'moderator')
    )
);

CREATE POLICY "Admins can update consultations" ON consultations
FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('admin', 'moderator')
    )
);

CREATE POLICY "Admins can delete consultations" ON consultations
FOR DELETE USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('admin', 'moderator')
    )
);

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
FOR UPDATE USING (auth.uid() = id);

-- Reactions policies
CREATE POLICY "Public read access to reactions" ON testimonial_reactions
FOR SELECT USING (true);

CREATE POLICY "Public insert access to reactions" ON testimonial_reactions
FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own reactions" ON testimonial_reactions
FOR UPDATE USING (
    user_id LIKE 'anon_%' OR user_id = auth.uid()::text
);

CREATE POLICY "Users can delete own reactions" ON testimonial_reactions
FOR DELETE USING (
    user_id LIKE 'anon_%' OR user_id = auth.uid()::text
);

-- ===== INSERT SAMPLE DATA =====

-- Sample profiles
INSERT INTO profiles (id, email, full_name, role) VALUES
('11111111-1111-1111-1111-111111111111', 'admin@example.com', 'Admin User', 'admin'),
('22222222-2222-2222-2222-222222222222', 'mod@example.com', 'Moderator User', 'moderator');

-- Insert sample testimonials
INSERT INTO testimonials_input (name, discord_username, community, role, email, rating, text, features_liked, permission, anonymous, created_at) VALUES
('John Doe', 'john#1234', 'Gaming Community', 'admin', 'john@example.com', 5, 'Amazing service! The bot integration was seamless and the support was incredible.', ARRAY['bot integration', 'support'], true, false, now() - interval '5 days'),
('Jane Smith', 'jane#5678', 'Tech Hub', 'admin', 'jane@example.com', 5, 'Professional and reliable. Highly recommend for any Discord server needs.', ARRAY['reliability', 'professional'], true, false, now() - interval '4 days'),
('Bob Wilson', 'bob#9012', 'Study Group', 'moderator', 'bob@example.com', 4, 'Great work on our server organization. Everything works perfectly.', ARRAY['organization', 'efficiency'], true, false, now() - interval '3 days'),
('Alice Brown', 'alice#3456', 'Gaming Guild', 'vip', 'alice@example.com', 5, 'Outstanding quality and attention to detail. Worth every penny!', ARRAY['quality', 'attention to detail'], true, false, now() - interval '2 days'),
('Charlie Davis', 'charlie#7890', 'Community Hub', 'member', 'charlie@example.com', 4, 'Very satisfied with the results. The team is responsive and skilled.', ARRAY['responsiveness', 'skill'], true, false, now() - interval '1 day');

-- Note: Reactions will be added by the populate script after testimonials are approved

-- ===== VERIFICATION QUERY =====
-- Run this to verify the setup

SELECT 
    'Schema Setup Complete' as status,
    'All tables created with proper RLS' as message,
    now() as created_at

UNION ALL

SELECT 
    'Table Counts' as status,
    'testimonials: ' || COUNT(*)::text as message,
    now() as created_at
FROM testimonials

UNION ALL

SELECT 
    'Table Counts' as status,
    'reactions: ' || COUNT(*)::text as message,
    now() as created_at
FROM testimonial_reactions

UNION ALL

SELECT 
    'View Status' as status,
    'reaction_counts view: ' || COUNT(*)::text || ' aggregated counts' as message,
    now() as created_at
FROM testimonial_reaction_counts

UNION ALL

SELECT 
    'RLS Status' as status,
    'testimonials_input: RLS disabled' as message,
    now() as created_at

UNION ALL

SELECT 
    'RLS Status' as status,
    'testimonials: RLS enabled with policies' as message,
    now() as created_at;

COMMIT;