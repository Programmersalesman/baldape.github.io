-- Populate Diverse Testimonial Data
-- Using only real servers from the portfolio

BEGIN;

-- Clear existing data first
DELETE FROM testimonial_reactions;
DELETE FROM testimonials;
DELETE FROM testimonials_input;

-- Reset sequences
ALTER SEQUENCE testimonials_id_seq RESTART WITH 1;
ALTER SEQUENCE testimonials_input_id_seq RESTART WITH 1;

-- Insert diverse testimonials into testimonials_input (for admin review)
-- BaldApe's Lab testimonials
INSERT INTO testimonials_input (name, discord_username, community, role, email, rating, text, features_liked, permission, anonymous, created_at) VALUES
('Alex Thompson', 'alex#1234', 'BaldApe''s Lab', 'admin', 'alex@example.com', 5,
'Incredible transformation! The bot integration and server organization exceeded all expectations. The team is professional and responsive.',
ARRAY['Bot Integration', 'Server Organization', 'Professional Service'], 'public', false, now() - interval '15 days'),

('Sarah Chen', 'sarah#2345', 'BaldApe''s Lab', 'moderator', 'sarah@example.com', 5,
'The automated moderation tools are game-changing. Our community engagement has increased significantly since the implementation.',
ARRAY['Automated Moderation', 'Community Engagement'], 'public', false, now() - interval '14 days'),

('Mike Rodriguez', 'mike#3456', 'BaldApe''s Lab', 'vip', 'mike@example.com', 4,
'Great service overall. The custom features work perfectly and the support team is always helpful when we need assistance.',
ARRAY['Custom Features', 'Support'], 'public', false, now() - interval '13 days');

-- Panda Picks testimonials
INSERT INTO testimonials_input (name, discord_username, community, role, email, rating, text, features_liked, permission, anonymous, created_at) VALUES
('David Kim', 'david#3456', 'Panda Picks', 'admin', 'david@example.com', 5,
'Outstanding work on our sports betting community. The specialized features for tracking picks and stats are exactly what we needed.',
ARRAY['Sports Betting', 'Statistics Tracking', 'Community Management'], 'public', false, now() - interval '12 days'),

('Lisa Wang', 'lisa#4567', 'Panda Picks', 'moderator', 'lisa@example.com', 5,
'The automated score updates and pick tracking system has revolutionized how our community operates. Highly recommend!',
ARRAY['Automated Updates', 'Pick Tracking'], 'public', false, now() - interval '11 days'),

('Tom Anderson', 'tom#5678', 'Panda Picks', 'vip', 'tom@example.com', 4,
'Very satisfied with the service. The community features work great and the team is always available for support.',
ARRAY['Community Features', 'Support'], 'public', false, now() - interval '10 days');

-- Cloak Line Bets testimonials
INSERT INTO testimonials_input (name, discord_username, community, role, email, rating, text, features_liked, permission, anonymous, created_at) VALUES
('Emma Wilson', 'emma#6789', 'Cloak Line Bets', 'admin', 'emma@example.com', 5,
'Exceptional service! The betting line integration and community management tools have transformed our Discord server.',
ARRAY['Betting Lines', 'Community Management'], 'public', false, now() - interval '9 days'),

('James Lee', 'james#7890', 'Cloak Line Bets', 'moderator', 'james@example.com', 4,
'Great work on the automated systems. The real-time updates and moderation tools work seamlessly together.',
ARRAY['Real-time Updates', 'Moderation Tools'], 'public', false, now() - interval '8 days');

-- SportsSciJacob testimonials
INSERT INTO testimonials_input (name, discord_username, community, role, email, rating, text, features_liked, permission, anonymous, created_at) VALUES
('Dr. Jacob Smith', 'jacob#5555', 'SportsSciJacob', 'admin', 'jacob@example.com', 5,
'As a sports scientist, I appreciate the data-driven approach. The analytics and community features are top-notch.',
ARRAY['Analytics', 'Data-driven Features'], 'public', false, now() - interval '7 days'),

('Rachel Green', 'rachel#6666', 'SportsSciJacob', 'moderator', 'rachel@example.com', 5,
'The scientific community tools and research sharing features are exactly what our academic Discord needed.',
ARRAY['Research Tools', 'Academic Features'], 'public', false, now() - interval '6 days');

-- CantStopTheCapTV testimonials
INSERT INTO testimonials_input (name, discord_username, community, role, email, rating, text, features_liked, permission, anonymous, created_at) VALUES
('Chris Williams', 'chris#8888', 'CantStopTheCapTV', 'admin', 'chris@example.com', 5,
'Fantastic work on our content creator community! The media sharing and engagement tools have boosted our community significantly.',
ARRAY['Media Sharing', 'Content Creation'], 'public', false, now() - interval '5 days'),

('Amanda Taylor', 'amanda#9999', 'CantStopTheCapTV', 'moderator', 'amanda@example.com', 4,
'The content moderation and media organization features work perfectly for our creator community.',
ARRAY['Content Moderation', 'Media Organization'], 'public', false, now() - interval '4 days');

-- BetsByRaven testimonials
INSERT INTO testimonials_input (name, discord_username, community, role, email, rating, text, features_liked, permission, anonymous, created_at) VALUES
('Raven Black', 'raven#1111', 'BetsByRaven', 'admin', 'raven@example.com', 5,
'Specialized features for WNBA fans. The community is awesome and the betting tools are perfectly tailored to our needs.',
ARRAY['Specialized Features', 'Community'], 'public', false, now() - interval '3 days'),

('Jordan White', 'jordan#2222', 'BetsByRaven', 'moderator', 'jordan@example.com', 5,
'The WNBA-specific features and community engagement tools have made our Discord the go-to place for WNBA betting discussion.',
ARRAY['WNBA Features', 'Community Engagement'], 'public', false, now() - interval '2 days');

-- Some lower-rated testimonials for diversity
INSERT INTO testimonials_input (name, discord_username, community, role, email, rating, text, features_liked, permission, anonymous, created_at) VALUES
('John Doe', 'john#4444', 'Panda Picks', 'vip', 'john@example.com', 2, 
'Expected more features for the price. The basic setup works but lacks advanced functionality.', 
ARRAY['basic functionality'], 'public', false, now() - interval '12 days'),

('Jane Smith', 'jane#5555', 'Cloak Line Bets', 'member', 'jane@example.com', 1, 
'Not impressed with the service. The setup is basic and doesn''t meet our community needs.', 
ARRAY['basic setup'], 'public', false, now() - interval '10 days');

-- Approve most testimonials (move from input to main table)
-- Keep a few in input for admin review demonstration
SELECT approve_testimonial(id) FROM testimonials_input 
WHERE rating >= 3 
ORDER BY created_at DESC 
LIMIT 15;

-- Insert diverse reactions for approved testimonials
-- Use the actual testimonial IDs that exist in the testimonials table
INSERT INTO testimonial_reactions (testimonial_id, user_id, reaction_type)
SELECT 
    t.id,
    'anonymous',
    'like'
FROM testimonials t
WHERE t.rating >= 4
LIMIT 10;

INSERT INTO testimonial_reactions (testimonial_id, user_id, reaction_type)
SELECT 
    t.id,
    'user123',
    'love'
FROM testimonials t
WHERE t.rating = 5
LIMIT 5;

INSERT INTO testimonial_reactions (testimonial_id, user_id, reaction_type)
SELECT 
    t.id,
    'user456',
    'haha'
FROM testimonials t
WHERE t.rating >= 4
LIMIT 5;

INSERT INTO testimonial_reactions (testimonial_id, user_id, reaction_type)
SELECT 
    t.id,
    'user789',
    'yay'
FROM testimonials t
WHERE t.rating >= 3
LIMIT 5;

-- Verification query
SELECT 
    'Diverse Data Population Complete' as status,
    'testimonials_input: ' || COUNT(*) || ' pending review' as message,
    now() as created_at
FROM testimonials_input

UNION ALL

SELECT 
    'Diverse Data Population Complete' as status,
    'testimonials: ' || COUNT(*) || ' approved' as message,
    now() as created_at
FROM testimonials

UNION ALL

SELECT 
    'Diverse Data Population Complete' as status,
    'reactions: ' || COUNT(*) || ' total' as message,
    now() as created_at
FROM testimonial_reactions

UNION ALL

SELECT 
    'Rating Distribution' as status,
    '5-star: ' || COUNT(*) || ' testimonials' as message,
    now() as created_at
FROM testimonials WHERE rating = 5

UNION ALL

SELECT 
    'Rating Distribution' as status,
    '4-star: ' || COUNT(*) || ' testimonials' as message,
    now() as created_at
FROM testimonials WHERE rating = 4

UNION ALL

SELECT 
    'Rating Distribution' as status,
    '3-star: ' || COUNT(*) || ' testimonials' as message,
    now() as created_at
FROM testimonials WHERE rating = 3

UNION ALL

SELECT 
    'Rating Distribution' as status,
    '2-star: ' || COUNT(*) || ' testimonials' as message,
    now() as created_at
FROM testimonials WHERE rating = 2

UNION ALL

SELECT 
    'Rating Distribution' as status,
    '1-star: ' || COUNT(*) || ' testimonials' as message,
    now() as created_at
FROM testimonials WHERE rating = 1

UNION ALL

SELECT 
    'Community Distribution' as status,
    'Communities: ' || COUNT(DISTINCT community) || ' different servers' as message,
    now() as created_at
FROM testimonials

ORDER BY status, message; 

COMMIT;