-- Focused Table Analysis - Based on Current Structure

-- 1. Current Table Overview
SELECT 
    tablename,
    CASE 
        WHEN tablename = 'testimonials' THEN '✅ Core testimonials data'
        WHEN tablename = 'testimonial_reactions' THEN '✅ User reactions (just implemented)'
        WHEN tablename = 'testimonial_reaction_counts' THEN '✅ Useful view for aggregating counts'
        WHEN tablename = 'consultations' THEN '❓ Consultation requests (evaluate usage)'
        WHEN tablename = 'profiles' THEN '❓ User profiles (Supabase Auth - evaluate)'
        ELSE '❓ Unknown table'
    END as status_and_purpose
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. Check if consultations table is being used
SELECT 
    'consultations' as table_name,
    COUNT(*) as total_rows,
    COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as last_30_days,
    COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as last_7_days
FROM consultations;

-- 3. Check if profiles table is just Supabase auth or has custom data
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 4. Check testimonials table for any unused columns
SELECT 
    column_name,
    data_type,
    is_nullable,
    CASE 
        WHEN column_name IN ('id', 'name', 'text', 'rating', 'community', 'created_at', 'approved', 'permission') 
        THEN '✅ Core fields'
        WHEN column_name IN ('discord_username', 'features_liked', 'anonymous') 
        THEN '✅ Used in UI'
        WHEN column_name IN ('updated_at', 'email', 'role') 
        THEN '❓ Evaluate usage'
        ELSE '❓ Check if needed'
    END as usage_status
FROM information_schema.columns 
WHERE table_name = 'testimonials' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 5. Check testimonial_reactions table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    CASE 
        WHEN column_name IN ('id', 'testimonial_id', 'user_id', 'reaction_type', 'created_at') 
        THEN '✅ Core fields'
        WHEN column_name = 'updated_at' 
        THEN '❓ Check if needed'
        ELSE '❓ Evaluate'
    END as usage_status
FROM information_schema.columns 
WHERE table_name = 'testimonial_reactions' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 6. Check for any redundant indexes
SELECT 
    tablename,
    indexname,
    indexdef,
    CASE 
        WHEN indexname LIKE '%_pkey' THEN '✅ Primary key (keep)'
        WHEN indexname LIKE '%_fkey' THEN '✅ Foreign key (keep)'
        WHEN indexname LIKE 'idx_%' THEN '✅ Custom index (evaluate)'
        ELSE '❓ Evaluate'
    END as index_status
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- 7. Check for any unused constraints
SELECT 
    tc.table_name,
    tc.constraint_type,
    tc.constraint_name,
    kcu.column_name,
    CASE 
        WHEN tc.constraint_type = 'PRIMARY KEY' THEN '✅ Keep'
        WHEN tc.constraint_type = 'FOREIGN KEY' THEN '✅ Keep'
        WHEN tc.constraint_type = 'CHECK' THEN '❓ Evaluate'
        WHEN tc.constraint_type = 'UNIQUE' THEN '❓ Evaluate'
        ELSE '❓ Check'
    END as constraint_status
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_schema = 'public'
ORDER BY tc.table_name, tc.constraint_type;

-- 8. Summary of what we should keep vs evaluate
SELECT 
    'KEEP' as action,
    'testimonials' as table_name,
    'Core testimonials data' as reason
UNION ALL
SELECT 
    'KEEP' as action,
    'testimonial_reactions' as table_name,
    'User reactions functionality' as reason
UNION ALL
SELECT 
    'KEEP' as action,
    'testimonial_reaction_counts' as table_name,
    'Useful view for aggregating counts' as reason
UNION ALL
SELECT 
    'EVALUATE' as action,
    'consultations' as table_name,
    'Check if consultation feature is used' as reason
UNION ALL
SELECT 
    'EVALUATE' as action,
    'profiles' as table_name,
    'Check if just Supabase auth or has custom data' as reason; 