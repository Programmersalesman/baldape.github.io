-- Populate testimonials table with 25 diverse entries for testing
-- This script will help test community filtering, rating distribution, and other features

-- Clear existing data (optional - uncomment if needed)
-- DELETE FROM testimonials;

-- Insert 25 diverse testimonials across all 6 communities
INSERT INTO testimonials (name, discord_username, community, role, email, rating, text, features_liked, permission, anonymous, approved, created_at) VALUES

-- BaldApe's Lab (5 testimonials)
('Sarah Johnson', 'SarahJ#1234', 'baldapes-lab', 'member', 'sarah.j@example.com', 5, 'BaldApe transformed our community completely! The organization and bot integration are incredible. Our engagement has increased by 300% since the setup.', ARRAY['organization', 'bots', 'support'], 'public', 'public', true, '2024-01-15 10:30:00+00'),
('Mike Chen', 'MikeC#5678', 'baldapes-lab', 'vip', 'mike.chen@example.com', 5, 'Professional service from start to finish. The custom bot features are exactly what we needed. Highly recommend!', ARRAY['bots', 'organization'], 'public', 'public', true, '2024-01-20 14:15:00+00'),
('Alex Rivera', 'AlexR#9012', 'baldapes-lab', 'moderator', 'alex.r@example.com', 4, 'Great work on the community setup. The moderation tools and organization are top-notch. Minor issues with initial setup but resolved quickly.', ARRAY['organization', 'support'], 'public', 'public', true, '2024-02-05 09:45:00+00'),
('Anonymous', NULL, 'baldapes-lab', 'member', NULL, 5, 'Amazing transformation of our server. The engagement features and community structure are perfect. Wish I could share my name but privacy is important.', ARRAY['engagement', 'organization'], 'public', 'anonymous', true, '2024-02-10 16:20:00+00'),
('David Kim', 'DavidK#3456', 'baldapes-lab', 'admin-owner', 'david.kim@example.com', 5, 'As the server owner, I can say BaldApe exceeded all expectations. The professional setup and ongoing support are invaluable.', ARRAY['organization', 'support', 'bots'], 'public', 'public', true, '2024-02-15 11:30:00+00'),

-- Panda Picks (4 testimonials)
('Emma Wilson', 'EmmaW#7890', 'panda-picks', 'vip', 'emma.w@example.com', 5, 'The picks accuracy and channel structure are phenomenal. Our community has never been more organized and profitable.', ARRAY['organization', 'support'], 'public', 'public', true, '2024-01-25 13:45:00+00'),
('James Thompson', 'JamesT#2345', 'panda-picks', 'member', 'james.t@example.com', 4, 'Great service overall. The picks are accurate and the community is well-managed. Would recommend to anyone.', ARRAY['organization'], 'public', 'public', true, '2024-02-01 15:10:00+00'),
('Anonymous', NULL, 'panda-picks', 'member', NULL, 5, 'Incredible picks and community management. The accuracy is outstanding and the support is always there when needed.', ARRAY['support', 'organization'], 'public', 'anonymous', true, '2024-02-08 12:30:00+00'),
('Lisa Park', 'LisaP#6789', 'panda-picks', 'moderator', 'lisa.park@example.com', 5, 'As a moderator, I appreciate the tools and structure provided. The community runs smoothly and members are engaged.', ARRAY['organization', 'support'], 'public', 'public', true, '2024-02-12 10:15:00+00'),

-- Cloak Line Bets (4 testimonials)
('Robert Davis', 'RobD#0123', 'cloak-line-bets', 'member', 'rob.davis@example.com', 3, 'Analytics are good but would love more engagement events. The community structure is solid though.', ARRAY['organization'], 'public', 'public', true, '2024-01-30 14:20:00+00'),
('Maria Garcia', 'MariaG#4567', 'cloak-line-bets', 'vip', 'maria.g@example.com', 4, 'Solid community setup with good analytics. The betting insights are valuable and the community is active.', ARRAY['organization', 'support'], 'public', 'public', true, '2024-02-03 16:45:00+00'),
('Anonymous', NULL, 'cloak-line-bets', 'member', NULL, 4, 'Good service overall. The analytics and community management are professional. Would use again.', ARRAY['organization'], 'public', 'anonymous', true, '2024-02-07 11:20:00+00'),
('Tom Anderson', 'TomA#8901', 'cloak-line-bets', 'admin-owner', 'tom.anderson@example.com', 5, 'Excellent work on our community setup. The analytics tools are exactly what we needed for our betting community.', ARRAY['organization', 'support', 'bots'], 'public', 'public', true, '2024-02-14 13:30:00+00'),

-- SportsSciJacob (4 testimonials)
('Jacob Smith', 'SportsSciJacob#5678', 'sportsscijacob', 'moderator', 'jacob.smith@example.com', 5, 'Professional setup and great data-driven discussions. The community structure supports our analytical approach perfectly.', ARRAY['organization', 'support'], 'public', 'public', true, '2024-01-18 09:30:00+00'),
('Rachel Green', 'RachelG#2345', 'sportsscijacob', 'member', 'rachel.g@example.com', 4, 'Love the data analysis focus. The community is well-organized and the discussions are always insightful.', ARRAY['organization'], 'public', 'public', true, '2024-02-02 15:45:00+00'),
('Anonymous', NULL, 'sportsscijacob', 'member', NULL, 5, 'Outstanding community for sports analytics. The professional setup and data-driven approach are exactly what I was looking for.', ARRAY['organization', 'support'], 'public', 'anonymous', true, '2024-02-09 12:15:00+00'),
('Kevin Lee', 'KevinL#6789', 'sportsscijacob', 'vip', 'kevin.lee@example.com', 5, 'Perfect community for sports science discussions. The organization and moderation are top-tier.', ARRAY['organization', 'support'], 'public', 'public', true, '2024-02-13 14:20:00+00'),

-- CantStopTheCapTV (4 testimonials)
('Cap Fan', 'CapFan#1234', 'cantstopthecaptv', 'member', 'cap.fan@example.com', 4, 'Great content and community engagement. Love the discussions and the way the community is structured.', ARRAY['organization', 'engagement'], 'public', 'public', true, '2024-01-22 10:45:00+00'),
('Anonymous', NULL, 'cantstopthecaptv', 'member', NULL, 5, 'Amazing community for sports content. The engagement and organization are outstanding. Highly recommend!', ARRAY['organization', 'support'], 'public', 'anonymous', true, '2024-02-04 16:30:00+00'),
('Steve Rogers', 'SteveR#4567', 'cantstopthecaptv', 'moderator', 'steve.r@example.com', 4, 'Good community setup with solid engagement. The content quality and community management are professional.', ARRAY['organization'], 'public', 'public', true, '2024-02-06 11:45:00+00'),
('Anonymous', NULL, 'cantstopthecaptv', 'vip', NULL, 5, 'Exceptional community for sports enthusiasts. The content and engagement features are perfectly implemented.', ARRAY['organization', 'support', 'engagement'], 'public', 'anonymous', true, '2024-02-11 13:15:00+00'),

-- BetsByRaven (4 testimonials)
('Raven Supporter', 'RavenSupporter#5678', 'betsbyraven', 'vip', 'raven.supporter@example.com', 5, 'Perfect for WNBA fans. The expert analysis is spot on and the community is incredibly supportive.', ARRAY['organization', 'support'], 'public', 'public', true, '2024-01-28 12:30:00+00'),
('Anonymous', NULL, 'betsbyraven', 'member', NULL, 4, 'Great WNBA-focused community. The betting insights and community structure are excellent.', ARRAY['organization'], 'public', 'anonymous', true, '2024-02-01 15:20:00+00'),
('Jennifer White', 'JenW#8901', 'betsbyraven', 'admin-owner', 'jen.white@example.com', 5, 'As the community owner, I can say BaldApe delivered exactly what we needed. The WNBA focus and community tools are perfect.', ARRAY['organization', 'support', 'bots'], 'public', 'public', true, '2024-02-05 14:45:00+00'),
('Anonymous', NULL, 'betsbyraven', 'member', NULL, 5, 'Outstanding community for WNBA betting. The analysis and community engagement are top-notch.', ARRAY['organization', 'support'], 'public', 'anonymous', true, '2024-02-10 10:30:00+00');

-- Verify the insertions
SELECT 
  community,
  COUNT(*) as testimonial_count,
  AVG(rating) as avg_rating,
  MIN(created_at) as earliest,
  MAX(created_at) as latest
FROM testimonials 
WHERE approved = true 
GROUP BY community 
ORDER BY testimonial_count DESC; 