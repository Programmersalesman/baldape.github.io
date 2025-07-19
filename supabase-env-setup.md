# Supabase Environment Setup

Create a `.env` file in your project root with these variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Discord Webhooks (existing)
VITE_DISCORD_WEBHOOK_URL_TESTIMONIAL=your_testimonial_webhook_url
VITE_DISCORD_WEBHOOK_URL_CONTACT=your_contact_webhook_url
```

## How to get your Supabase credentials:

1. Go to your Supabase project dashboard
2. Click on Settings (gear icon) in the sidebar
3. Click on API in the settings menu
4. Copy the Project URL and anon public key
5. Replace the placeholder values in your .env file

## Example:
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
``` 