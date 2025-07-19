-- Comprehensive RLS Debugging Script
-- This will help us understand exactly what's happening with the policies

-- 1. Check if the table exists and its structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'testimonials'
ORDER BY ordinal_position;

-- 2. Check if RLS is enabled on the table
SELECT 
    schemaname,
    tablename,
    rowsecurity,
    hasindexes,
    hasrules,
    hastriggers
FROM pg_tables 
WHERE tablename = 'testimonials';

-- 3. List ALL policies on the testimonials table
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
WHERE tablename = 'testimonials'
ORDER BY cmd, policyname;

-- 4. Check if there are any conflicting policies or rules
SELECT 
    schemaname,
    tablename,
    rulename,
    definition
FROM pg_rules 
WHERE tablename = 'testimonials';

-- 5. Check current user and permissions
SELECT 
    current_user,
    session_user,
    current_database(),
    current_schema();

-- 6. Check if the anon role has any special permissions
SELECT 
    rolname,
    rolsuper,
    rolinherit,
    rolcreaterole,
    rolcreatedb,
    rolcanlogin
FROM pg_roles 
WHERE rolname = 'anon';

-- 7. Test a simple insert to see the exact error
-- (This will fail, but will show us the exact error message)
DO $$
BEGIN
    INSERT INTO testimonials (name, community, rating, text, permission) 
    VALUES ('Debug Test', 'debug-community', 5, 'Debug test message', 'public');
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Insert failed with error: %', SQLERRM;
END $$;

-- 8. Check if there are any triggers that might be interfering
SELECT 
    trigger_name,
    event_manipulation,
    action_statement,
    action_timing
FROM information_schema.triggers 
WHERE event_object_table = 'testimonials';

-- 9. Show the exact RLS policy that's blocking the insert
SELECT 
    p.policyname,
    p.cmd,
    p.permissive,
    p.roles,
    p.qual,
    p.with_check,
    CASE 
        WHEN p.cmd = 'INSERT' AND p.with_check IS NOT NULL 
        THEN 'This policy controls INSERT permissions'
        WHEN p.cmd = 'INSERT' AND p.with_check IS NULL 
        THEN 'This policy has no WITH CHECK clause - may be blocking'
        ELSE 'Not an INSERT policy'
    END as policy_analysis
FROM pg_policies p
WHERE p.tablename = 'testimonials' AND p.cmd = 'INSERT'; 