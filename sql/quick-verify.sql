-- Comprehensive Database Schema Overview
WITH 
table_info AS (
    SELECT 
        table_schema,
        table_name,
        (
            SELECT array_agg(
                column_name || ': ' || 
                data_type || 
                CASE 
                    WHEN is_nullable = 'NO' THEN ' (NOT NULL)'
                    ELSE ''
                END ||
                CASE 
                    WHEN column_default IS NOT NULL THEN ' DEFAULT ' || column_default
                    ELSE ''
                END
            )
            FROM information_schema.columns c
            WHERE c.table_schema = t.table_schema 
            AND c.table_name = t.table_name
        ) AS columns
    FROM information_schema.tables t
    WHERE table_schema = 'public'
),
index_info AS (
    SELECT 
        schemaname,
        tablename,
        array_agg(indexname || ': ' || indexdef) AS index_details
    FROM pg_indexes
    WHERE schemaname = 'public'
    GROUP BY schemaname, tablename
),
policy_info AS (
    SELECT 
        schemaname,
        tablename,
        array_agg(
            policyname || ': ' || 
            cmd || ' ' || 
            COALESCE(qual, 'No specific condition')
        ) AS policy_details
    FROM pg_policies
    WHERE schemaname = 'public'
    GROUP BY schemaname, tablename
)
SELECT 
    'Database Schema Overview' AS report_type,
    json_build_object(
        'tables', json_agg(
            json_build_object(
                'name', table_name,
                'schema', table_schema,
                'columns', columns,
                'indexes', COALESCE(i.index_details, ARRAY[]::text[]),
                'policies', COALESCE(p.policy_details, ARRAY[]::text[])
            )
        )
    ) AS schema_details
FROM table_info t
LEFT JOIN index_info i ON t.table_name = i.tablename
LEFT JOIN policy_info p ON t.table_name = p.tablename
GROUP BY 1;