-- Check if the table structure is correct and identify any issues

-- 1. Check if the table exists
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_name = 'testimonials';

-- 2. Check the exact column structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    character_maximum_length
FROM information_schema.columns 
WHERE table_name = 'testimonials'
ORDER BY ordinal_position;

-- 3. Check for any constraints that might be blocking inserts
SELECT 
    constraint_name,
    constraint_type,
    table_name
FROM information_schema.table_constraints 
WHERE table_name = 'testimonials';

-- 4. Check for check constraints specifically
SELECT 
    cc.constraint_name,
    cc.check_clause
FROM information_schema.check_constraints cc
JOIN information_schema.table_constraints tc ON cc.constraint_name = tc.constraint_name
WHERE tc.table_name = 'testimonials';

-- 5. Check if RLS is actually enabled
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'testimonials';

-- 6. Check current user and role
SELECT 
    current_user,
    session_user,
    current_database();

-- 7. Try to insert with minimal data to see what the exact error is
DO $$
DECLARE
    test_id UUID;
BEGIN
    INSERT INTO testimonials (name, community, rating, text, permission) 
    VALUES ('Minimal Test', 'test', 1, 'test', 'public')
    RETURNING id INTO test_id;
    
    RAISE NOTICE 'Insert successful, ID: %', test_id;
    
    -- Clean up
    DELETE FROM testimonials WHERE id = test_id;
    
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Insert failed with error: %', SQLERRM;
    RAISE NOTICE 'Error code: %', SQLSTATE;
END $$; 