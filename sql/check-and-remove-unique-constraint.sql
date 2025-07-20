-- Check and Remove Unique Constraint on testimonial_reactions table
-- This script will check if the unique constraint exists and remove it if found

-- First, let's check what constraints exist on the testimonial_reactions table
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    LEFT JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.table_name = 'testimonial_reactions'
  AND tc.table_schema = 'public'
ORDER BY tc.constraint_type, tc.constraint_name;

-- Check specifically for unique constraints
SELECT 
    constraint_name,
    constraint_type
FROM information_schema.table_constraints 
WHERE table_name = 'testimonial_reactions' 
  AND table_schema = 'public'
  AND constraint_type = 'UNIQUE';

-- If you see a unique constraint that includes testimonial_id and user_id, remove it:
-- (Replace 'constraint_name_here' with the actual constraint name from the query above)

-- Example of removing the unique constraint (uncomment and modify as needed):
-- ALTER TABLE testimonial_reactions DROP CONSTRAINT IF EXISTS testimonial_reactions_testimonial_id_user_id_key;

-- Alternative: Drop all unique constraints on the table (be careful!)
-- DO $$
-- DECLARE
--     constraint_record RECORD;
-- BEGIN
--     FOR constraint_record IN 
--         SELECT constraint_name 
--         FROM information_schema.table_constraints 
--         WHERE table_name = 'testimonial_reactions' 
--           AND table_schema = 'public' 
--           AND constraint_type = 'UNIQUE'
--     LOOP
--         EXECUTE 'ALTER TABLE testimonial_reactions DROP CONSTRAINT ' || constraint_record.constraint_name;
--         RAISE NOTICE 'Dropped unique constraint: %', constraint_record.constraint_name;
--     END LOOP;
-- END $$;

-- After removing constraints, verify the table structure:
\d testimonial_reactions

-- Test inserting multiple reactions for the same user and testimonial
-- (This should work after removing the unique constraint)

-- Example test data (uncomment to test):
-- INSERT INTO testimonial_reactions (testimonial_id, user_id, reaction_type) VALUES
--     (1, 'anonymous', '👍'),
--     (1, 'anonymous', '❤️'),
--     (1, 'anonymous', '🔥');

-- Check if multiple reactions were inserted:
-- SELECT * FROM testimonial_reactions WHERE testimonial_id = 1 AND user_id = 'anonymous';

-- Clean up test data:
-- DELETE FROM testimonial_reactions WHERE testimonial_id = 1 AND user_id = 'anonymous'; 