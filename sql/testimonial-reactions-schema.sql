-- Testimonial Reactions Schema
-- This table stores user reactions to testimonials

-- Create testimonial_reactions table
CREATE TABLE IF NOT EXISTS testimonial_reactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    testimonial_id INTEGER NOT NULL REFERENCES testimonials(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL DEFAULT 'anonymous',
    reaction_type TEXT NOT NULL CHECK (reaction_type IN ('👍', '❤️', '🔥', '💯', '👎', '🤔')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Allow multiple reactions per user per testimonial
    -- Removed unique constraint to allow multiple reactions
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_testimonial_reactions_testimonial_id ON testimonial_reactions(testimonial_id);
CREATE INDEX IF NOT EXISTS idx_testimonial_reactions_user_id ON testimonial_reactions(user_id);
CREATE INDEX IF NOT EXISTS idx_testimonial_reactions_reaction_type ON testimonial_reactions(reaction_type);
CREATE INDEX IF NOT EXISTS idx_testimonial_reactions_created_at ON testimonial_reactions(created_at);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_testimonial_reactions_updated_at 
    BEFORE UPDATE ON testimonial_reactions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE testimonial_reactions ENABLE ROW LEVEL SECURITY;

-- Create policies for testimonial_reactions table
-- Allow anyone to read reactions (public data)
CREATE POLICY "Allow public read access to testimonial reactions" ON testimonial_reactions
    FOR SELECT USING (true);

-- Allow anyone to insert reactions (anonymous users can react)
CREATE POLICY "Allow public insert access to testimonial reactions" ON testimonial_reactions
    FOR INSERT WITH CHECK (true);

-- Allow users to update their own reactions
CREATE POLICY "Allow users to update their own reactions" ON testimonial_reactions
    FOR UPDATE USING (user_id = 'anonymous' OR user_id = auth.uid()::text);

-- Allow users to delete their own reactions
CREATE POLICY "Allow users to delete their own reactions" ON testimonial_reactions
    FOR DELETE USING (user_id = 'anonymous' OR user_id = auth.uid()::text);

-- Create a view for reaction counts by testimonial
CREATE OR REPLACE VIEW testimonial_reaction_counts AS
SELECT 
    testimonial_id,
    reaction_type,
    COUNT(*) as count
FROM testimonial_reactions
GROUP BY testimonial_id, reaction_type;

-- Create a function to get reaction summary for a testimonial
CREATE OR REPLACE FUNCTION get_testimonial_reaction_summary(testimonial_id INTEGER)
RETURNS TABLE (
    reaction_type TEXT,
    count BIGINT,
    user_reacted BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        trc.reaction_type,
        trc.count,
        CASE WHEN ur.reaction_type IS NOT NULL THEN true ELSE false END as user_reacted
    FROM testimonial_reaction_counts trc
    LEFT JOIN testimonial_reactions ur ON 
        ur.testimonial_id = testimonial_id 
        AND ur.reaction_type = trc.reaction_type 
        AND ur.user_id = COALESCE(auth.uid()::text, 'anonymous')
    WHERE trc.testimonial_id = testimonial_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON testimonial_reactions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON testimonial_reactions TO anon;
GRANT SELECT ON testimonial_reaction_counts TO authenticated;
GRANT SELECT ON testimonial_reaction_counts TO anon;
GRANT EXECUTE ON FUNCTION get_testimonial_reaction_summary(INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_testimonial_reaction_summary(INTEGER) TO anon;

-- Insert some sample reactions for testing (optional)
-- INSERT INTO testimonial_reactions (testimonial_id, user_id, reaction_type) VALUES
--     ('your-testimonial-uuid-here', 'anonymous', '👍'),
--     ('your-testimonial-uuid-here', 'anonymous', '❤️'),
--     ('your-testimonial-uuid-here', 'anonymous', '🔥'); 