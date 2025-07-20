-- Quick Table Analysis - What we have and what we need

-- 1. What tables exist?
SELECT 
    tablename,
    CASE 
        WHEN tablename = 'testimonials' THEN 'Main testimonials/reviews data'
        WHEN tablename = 'testimonial_reactions' THEN 'User reactions to testimonials'
        WHEN tablename = 'consultations' THEN 'Consultation requests'
        WHEN tablename = 'profiles' THEN 'User profiles (Supabase Auth)'
        ELSE 'Unknown table'
    END as purpose
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. What columns are in each table?
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public'
  AND table_name IN ('testimonials', 'testimonial_reactions', 'consultations', 'profiles')
ORDER BY table_name, ordinal_position;

-- 3. How many rows in each table?
SELECT 
    'testimonials' as table_name,
    COUNT(*) as row_count,
    'Main testimonials' as description
FROM testimonials
UNION ALL
SELECT 
    'testimonial_reactions' as table_name,
    COUNT(*) as row_count,
    'User reactions' as description
FROM testimonial_reactions
UNION ALL
SELECT 
    'consultations' as table_name,
    COUNT(*) as row_count,
    'Consultation requests' as description
FROM consultations
UNION ALL
SELECT 
    'profiles' as table_name,
    COUNT(*) as row_count,
    'User profiles' as description
FROM profiles;

-- 4. What indexes exist for performance?
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- 5. What constraints exist?
SELECT 
    tc.table_name,
    tc.constraint_type,
    tc.constraint_name,
    kcu.column_name
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_schema = 'public'
ORDER BY tc.table_name, tc.constraint_type; 