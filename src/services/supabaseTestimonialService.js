import { supabase, handleSupabaseError, formatDate, getTimeAgo } from './supabaseClient'

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Data validation
const validateTestimonial = (testimonial) => {
  const required = ['name', 'community', 'text', 'rating', 'permission']
  const missing = required.filter(field => !testimonial[field])
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`)
  }
  
  if (testimonial.rating < 1 || testimonial.rating > 5) {
    throw new Error('Rating must be between 1 and 5')
  }
  
  if (testimonial.text.length < 10) {
    throw new Error('Testimonial text must be at least 10 characters')
  }
  
  return true
}

// Normalize testimonial data structure for Supabase
const normalizeTestimonial = (testimonial) => {
  const normalized = {
    name: testimonial.name || testimonial.discordUsername || 'Anonymous',
    discord_username: testimonial.discordUsername || testimonial.discord || null,
    community: testimonial.community,
    role: testimonial.role || 'Member',
    email: testimonial.email || null,
    rating: parseInt(testimonial.rating) || 0,
    text: testimonial.text || testimonial.message,
    features_liked: testimonial.featuresLiked || testimonial.features || [],
    permission: testimonial.permission === 'yes' ? 'public' : 'private',
    anonymous: testimonial.anonymous || 'public',
    approved: testimonial.approved || false,
    admin_notes: testimonial.admin_notes || null,
  }
  
  console.log('🔧 Normalization details:');
  console.log('  - Original permission:', testimonial.permission);
  console.log('  - Normalized permission:', normalized.permission);
  console.log('  - Original rating:', testimonial.rating);
  console.log('  - Normalized rating:', normalized.rating);
  console.log('  - Features array:', normalized.features_liked);
  
  return normalized;
}

// Add a new testimonial
export const addTestimonial = async (testimonialData) => {
  try {
    console.log('🔧 Raw testimonial data:', testimonialData);
    
    const normalizedData = normalizeTestimonial(testimonialData)
    console.log('🔧 Normalized data for Supabase:', normalizedData);
    
    validateTestimonial(normalizedData)
    
    console.log('🔧 Attempting to insert into Supabase...');
    console.log('🔧 Using supabase client:', !!supabase);
    console.log('🔧 Supabase URL:', supabase.supabaseUrl);
    console.log('🔧 Supabase Key type:', supabaseAnonKey?.startsWith('sb_publishable_') ? 'publishable' : 'unknown');
    const { data, error } = await supabase
      .from('testimonials')
      .insert([normalizedData])
      .select()
      .single()
    
    if (error) {
      console.error('🔧 Supabase insert error:', error);
      throw error;
    }
    
    console.log('🔧 Successfully inserted testimonial:', data);
    return { success: true, testimonial: data }
  } catch (error) {
    console.error('Error adding testimonial:', error)
    return { success: false, error: handleSupabaseError(error) }
  }
}

// Get testimonials with filtering
export const getTestimonials = async (filters = {}) => {
  try {
    let query = supabase
      .from('testimonials')
      .select('*')
    
    // Apply filters
    if (filters.approved !== undefined) {
      query = query.eq('approved', filters.approved)
    }
    
    if (filters.permission) {
      query = query.eq('permission', filters.permission)
    }
    
    if (filters.community) {
      query = query.eq('community', filters.community)
    }
    
    if (filters.minRating) {
      query = query.gte('rating', filters.minRating)
    }
    
    if (filters.startDate) {
      query = query.gte('created_at', filters.startDate)
    }
    
    if (filters.endDate) {
      query = query.lte('created_at', filters.endDate)
    }
    
    // Apply sorting
    const sortBy = filters.sortBy || 'created_at'
    const sortOrder = filters.sortOrder || 'desc'
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })
    
    const { data, error } = await query
    
    if (error) throw error
    
    return { success: true, testimonials: data || [] }
  } catch (error) {
    console.error('Error getting testimonials:', error)
    return { success: false, error: handleSupabaseError(error), testimonials: [] }
  }
}

// Get public testimonials (approved and public)
export const getPublicTestimonials = async () => {
  return getTestimonials({ approved: true, permission: 'public' })
}

// Update a testimonial
export const updateTestimonial = async (id, updates) => {
  try {
    const normalizedUpdates = normalizeTestimonial(updates)
    validateTestimonial(normalizedUpdates)
    
    const { data, error } = await supabase
      .from('testimonials')
      .update(normalizedUpdates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    return { success: true, testimonial: data }
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return { success: false, error: handleSupabaseError(error) }
  }
}

// Delete a testimonial
export const deleteTestimonial = async (id) => {
  try {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return { success: false, error: handleSupabaseError(error) }
  }
}

// Approve a testimonial
export const approveTestimonial = async (id) => {
  return updateTestimonial(id, { approved: true })
}

// Reject a testimonial
export const rejectTestimonial = async (id, adminNotes = '') => {
  return updateTestimonial(id, { approved: false, admin_notes: adminNotes })
}

// Get testimonial statistics
export const getTestimonialStats = async () => {
  try {
    // Get total count
    const { count: total, error: totalError } = await supabase
      .from('testimonials')
      .select('*', { count: 'exact', head: true })
    
    if (totalError) throw totalError
    
    // Get approved count
    const { count: approved, error: approvedError } = await supabase
      .from('testimonials')
      .select('*', { count: 'exact', head: true })
      .eq('approved', true)
    
    if (approvedError) throw approvedError
    
    // Get pending count
    const { count: pending, error: pendingError } = await supabase
      .from('testimonials')
      .select('*', { count: 'exact', head: true })
      .eq('approved', false)
    
    if (pendingError) throw pendingError
    
    // Get average rating
    const { data: ratings, error: ratingsError } = await supabase
      .from('testimonials')
      .select('rating')
      .eq('approved', true)
    
    if (ratingsError) throw ratingsError
    
    const averageRating = ratings.length > 0 
      ? (ratings.reduce((sum, t) => sum + t.rating, 0) / ratings.length).toFixed(2)
      : 0
    
    // Get community distribution
    const { data: communities, error: communitiesError } = await supabase
      .from('testimonials')
      .select('community')
      .eq('approved', true)
    
    if (communitiesError) throw communitiesError
    
    const communityStats = communities.reduce((acc, t) => {
      acc[t.community] = (acc[t.community] || 0) + 1
      return acc
    }, {})
    
    return {
      success: true,
      stats: {
        total,
        approved,
        pending,
        averageRating: parseFloat(averageRating),
        communityStats
      }
    }
  } catch (error) {
    console.error('Error getting testimonial stats:', error)
    return { success: false, error: handleSupabaseError(error) }
  }
}

// Export testimonials data
export const exportTestimonials = async () => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    
    const link = document.createElement('a')
    link.href = URL.createObjectURL(dataBlob)
    link.download = `testimonials-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    
    return { success: true }
  } catch (error) {
    console.error('Error exporting testimonials:', error)
    return { success: false, error: handleSupabaseError(error) }
  }
}

// Import testimonials data
export const importTestimonials = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result)
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: expected array of testimonials')
        }
        
        // Validate all testimonials
        data.forEach(validateTestimonial)
        
        // Normalize all testimonials
        const normalizedData = data.map(normalizeTestimonial)
        
        const { error } = await supabase
          .from('testimonials')
          .insert(normalizedData)
        
        if (error) throw error
        
        resolve({ success: true, count: normalizedData.length })
      } catch (error) {
        console.error('Error importing testimonials:', error)
        resolve({ success: false, error: handleSupabaseError(error) })
      }
    }
    
    reader.onerror = () => {
      resolve({ success: false, error: 'Failed to read file' })
    }
    
    reader.readAsText(file)
  })
}

// Clear all testimonials (admin only)
export const clearTestimonials = async () => {
  try {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all
    
    if (error) throw error
    
    return { success: true }
  } catch (error) {
    console.error('Error clearing testimonials:', error)
    return { success: false, error: handleSupabaseError(error) }
  }
}

// Subscribe to real-time testimonials updates
export const subscribeToTestimonials = (callback) => {
  return supabase
    .channel('testimonials_changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'testimonials' }, 
      callback
    )
    .subscribe()
} 