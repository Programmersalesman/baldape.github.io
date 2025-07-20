-- Comprehensive Table Structure Analysis
-- This script analyzes all tables to understand what we have and what we need

-- 1. List all tables and their basic info
SELECT 
    schemaname,
    tablename,
    tableowner,
    hasindexes,
    hasrules,
    hastriggers,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. Analyze testimonials table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    character_maximum_length
FROM information_schema.columns 
WHERE table_name = 'testimonials' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Analyze testimonial_reactions table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    character_maximum_length
FROM information_schema.columns 
WHERE table_name = 'testimonial_reactions' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 4. Check for any views (like testimonial_reaction_co...)
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name LIKE 'testimonial%'
ORDER BY table_name;

-- 5. Analyze consultations table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    character_maximum_length
FROM information_schema.columns 
WHERE table_name = 'consultations' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 6. Analyze profiles table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    character_maximum_length
FROM information_schema.columns 
WHERE table_name = 'profiles' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 7. Check all constraints on each table
SELECT 
    tc.table_name,
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
LEFT JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.table_schema = 'public'
  AND tc.table_name IN ('testimonials', 'testimonial_reactions', 'consultations', 'profiles')
ORDER BY tc.table_name, tc.constraint_type, tc.constraint_name;

-- 8. Check indexes for performance
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public'
  AND tablename IN ('testimonials', 'testimonial_reactions', 'consultations', 'profiles')
ORDER BY tablename, indexname;

-- 9. Check table sizes and row counts
SELECT 
    schemaname,
    tablename,
    attname,
    n_distinct,
    correlation
FROM pg_stats 
WHERE schemaname = 'public'
  AND tablename IN ('testimonials', 'testimonial_reactions', 'consultations', 'profiles')
ORDER BY tablename, attname;

-- 10. Get row counts for each table
SELECT 
    'testimonials' as table_name,
    COUNT(*) as row_count
FROM testimonials
UNION ALL
SELECT 
    'testimonial_reactions' as table_name,
    COUNT(*) as row_count
FROM testimonial_reactions
UNION ALL
SELECT 
    'consultations' as table_name,
    COUNT(*) as row_count
FROM consultations
UNION ALL
SELECT 
    'profiles' as table_name,
    COUNT(*) as row_count
FROM profiles;

-- 11. Check for any unused or redundant columns
-- (This requires manual analysis based on the application code)

-- 12. Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public'
  AND tablename IN ('testimonials', 'testimonial_reactions', 'consultations', 'profiles')
ORDER BY tablename, policyname; 