-- List all unapproved testimonials with info and approve command
SELECT 
  id,
  name,
  community,
  rating,
  LEFT(text, 60) AS preview,
  created_at,
  'SELECT approve_testimonial(' || id || ');' AS approve_command
FROM testimonials_input
ORDER BY created_at DESC; 