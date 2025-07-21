# SQL Files Documentation

This directory contains SQL files for the BaldApe Services database schema and verification.

## Files Overview

### Core Schema File

#### `supabase-schema.sql`
- **Purpose**: Complete database schema setup (drops and recreates everything from scratch)
- **Contains**:
  - **Two-table RLS pattern**: `testimonials_input` (no RLS) + `testimonials` (with RLS)
  - **Complete reactions system**: `testimonial_reactions` + `testimonial_reaction_counts`
  - **All tables**: profiles, consultations, testimonials_input, testimonials, reactions
  - **Security**: RLS policies, functions, triggers
  - **Performance**: Indexes on all key fields
  - **Sample data**: Testimonials and reactions for testing
  - **Built-in verification**: Query at the end to confirm setup
- **Usage**: Run this single file to set up the complete database from scratch

### Verification File

#### `quick-verify.sql`
- **Purpose**: Database schema overview (JSON format)
- **Contains**:
  - Complete table structure with columns, indexes, and policies
  - JSON output for programmatic analysis
  - Useful for understanding current schema state
- **Usage**: Run to get complete schema overview in JSON format

#### `populate-diverse-data.sql`
- **Purpose**: Populate database with diverse testimonial data
- **Contains**:
  - 21 diverse testimonials across all 6 real servers
  - Various roles (owner, admin, moderator, vip, member)
  - Different star ratings (1-5 stars)
  - Realistic features_liked arrays
  - Sample reactions for engagement
  - Verification queries
- **Usage**: Run after schema setup to populate with realistic test data

## Database Architecture

### Two-Table RLS Pattern

#### **Table 1: `testimonials_input` (No RLS)**
- ✅ **Anyone can submit** testimonials
- ✅ **No RLS restrictions** 
- ✅ **Holds pending submissions**
- ✅ **Admin reviews here**

#### **Table 2: `testimonials` (With RLS)**
- ✅ **Only approved testimonials**
- ✅ **RLS for reading** (public can read approved)
- ✅ **Admin-only write access**
- ✅ **Secure display table**

### Workflow
```
1. User submits → testimonials_input (no RLS)
2. Admin reviews → testimonials_input 
3. Admin approves → approve_testimonial() function
4. Data moves → testimonials table (with RLS)
5. Public reads → testimonials (filtered by RLS)
```

### Tables

1. **profiles** - Admin user profiles
   - Key fields: id, email, full_name, role
   - Roles: admin, moderator

2. **consultations** - Consultation requests
   - Key fields: name, email, community, services, goals, timeline, budget
   - Status tracking: pending, contacted, scheduled, completed, cancelled

3. **testimonials_input** - User submissions (no RLS)
   - Key fields: name, discord_username, community, role, rating, text
   - Role field: owner, admin, moderator, vip, member
   - Anyone can insert

4. **testimonials** - Approved testimonials (with RLS)
   - Same structure as input table
   - Only approved testimonials
   - RLS controls read access

5. **testimonial_reactions** - User reactions
   - Key fields: testimonial_id, user_id, reaction_type
   - Reaction types: like, love, helpful, etc.
   - Automatic count updates via triggers

6. **testimonial_reaction_counts** - Aggregated reaction counts (view)
   - Performance optimization
   - Updates automatically when reactions change

### Security Features

- **Row Level Security (RLS)** on main tables
- **Public read access** for approved testimonials only
- **Admin-only access** for consultations and unapproved testimonials
- **User-specific access** for reactions
- **Input table isolated** from RLS restrictions

### Performance Optimizations

- **Indexes** on all frequently queried fields
- **Reaction count view** for performance
- **Efficient queries** for role-based filtering
- **Proper foreign key relationships**

## Usage Instructions

### 1. Initial Setup
```sql
-- Run in Supabase SQL Editor
\i supabase-schema.sql
```

### 2. Verification
```sql
-- Schema overview (JSON)
\i quick-verify.sql
```

### 3. Populate Data
```sql
-- Add diverse test data
\i populate-diverse-data.sql
```

### 3. Admin Operations
```sql
-- Approve a testimonial
SELECT approve_testimonial(123);

-- Reject a testimonial
SELECT reject_testimonial(123, 'Inappropriate content');

-- View pending submissions
SELECT * FROM testimonials_input ORDER BY created_at DESC;
```

### 4. Role-based Queries
```sql
-- Get admin/owner testimonials
SELECT * FROM testimonials 
WHERE role IN ('owner', 'admin') AND approved = true;

-- Get role distribution
SELECT role, COUNT(*) FROM testimonials 
WHERE approved = true 
GROUP BY role;
```

## Key Benefits

### ✅ **Solves RLS Submission Issues**
- Users can submit testimonials without RLS blocking them
- Input table has no RLS restrictions
- Main table maintains security

### ✅ **Proper Approval Workflow**
- Admin reviews submissions in input table
- Approved testimonials move to main table
- Rejected testimonials stay with notes

### ✅ **Reactions System Works**
- Full reactions functionality included
- Automatic count updates
- Performance optimized

### ✅ **Role Standardization**
- Single 'member' role (no more 'Member' confusion)
- Consistent role values throughout
- Works with existing role badge system

### ✅ **Clean Architecture**
- Single file setup
- No clutter or confusion
- Everything works together

## Notes

- **Drops and recreates** all tables from scratch
- **Includes sample data** for immediate testing
- **Built-in verification** query confirms setup
- **Reactions system** fully functional
- **Two-table pattern** solves RLS submission issues
- **Role badges** work with standardized roles 