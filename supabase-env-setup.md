# Supabase Environment Setup Guide

## Required Environment Variables

Create a `.env` file in your project root with the following variables:

### Discord Webhook URLs (Optional)
```
VITE_DISCORD_WEBHOOK_URL_TESTIMONIAL=your_testimonial_webhook_url_here
VITE_DISCORD_WEBHOOK_URL_CONTACT=your_contact_webhook_url_here
```

### Supabase Configuration (Required)
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Optional: Supabase Service Role Key (for admin functions)
```
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## How to Get Supabase Credentials

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Sign up or log in
   - Create a new project

2. **Get Your Project URL**:
   - In your Supabase dashboard, go to Settings > API
   - Copy the "Project URL" (starts with `https://`)

3. **Get Your Anon Key**:
   - In the same API settings page
   - Copy the "anon public" key (starts with `eyJ`)

4. **Get Your Service Role Key** (for admin functions):
   - In the same API settings page
   - Copy the "service_role" key (keep this secret!)

## Database Setup

1. **Run the Schema**:
   - In your Supabase dashboard, go to SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Run the SQL to create the tables and policies

2. **Enable Row Level Security**:
   - The schema already includes RLS policies
   - Make sure RLS is enabled on all tables

## Testing the Connection

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Check the browser console**:
   - Look for "🔍 Supabase Config Check" messages
   - Verify that both URL and key are present

3. **Test form submission**:
   - Go to the Testimonials page
   - Submit a test testimonial
   - Check that it appears in your Supabase dashboard

## Production Deployment

For production deployment (Vercel, Netlify, etc.):

1. **Add environment variables** to your hosting platform
2. **Use the same variable names** as in your `.env` file
3. **Make sure to include the VITE_ prefix** for all variables

## Troubleshooting

### "Missing Supabase environment variables" error
- Check that your `.env` file is in the project root
- Verify the variable names start with `VITE_`
- Restart your development server after adding variables

### "Access denied" errors
- Check that your RLS policies are set up correctly
- Verify you're using the correct API key
- Make sure your database schema is properly deployed

### Connection timeouts
- Check your Supabase project status
- Verify your project URL is correct
- Ensure your IP isn't blocked by Supabase 