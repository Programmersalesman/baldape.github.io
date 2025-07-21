import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('🔍 Supabase Config Check:', {
  url: supabaseUrl,
  keyExists: !!supabaseAnonKey,
  keyStart: supabaseAnonKey?.substring(0, 20) + '...',
  keyType: supabaseAnonKey?.startsWith('sb_publishable_') ? 'publishable' : 'unknown'
})

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.log('Please create a .env file with:')
  console.log('VITE_SUPABASE_URL=your_supabase_project_url')
  console.log('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Make supabase available globally for testing
if (typeof window !== 'undefined') {
  window.supabase = supabase;
}

// Helper function to handle Supabase errors
export const handleSupabaseError = (error) => {
  console.error('Supabase error:', error)
  
  if (error.code === 'PGRST116') {
    return 'No data found'
  }
  
  if (error.code === '42501') {
    return 'Access denied. You may not have permission to perform this action.'
  }
  
  if (error.code === '23505') {
    return 'This record already exists'
  }
  
  if (error.code === '23503') {
    return 'Cannot delete this record as it is referenced by other data'
  }
  
  return error.message || 'An unexpected error occurred'
}

// Helper function to format dates for display
export const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Helper function to get time ago
export const getTimeAgo = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return formatDate(dateString)
} 