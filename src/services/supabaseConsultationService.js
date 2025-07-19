import { supabase, handleSupabaseError, formatDate, getTimeAgo } from './supabaseClient'

// Data validation
const validateConsultation = (consultation) => {
  const required = ['name', 'email', 'community', 'services', 'goals', 'timeline', 'budget']
  const missing = required.filter(field => !consultation[field])
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`)
  }
  
  if (consultation.email && !consultation.email.includes('@')) {
    throw new Error('Invalid email address')
  }
  
  if (consultation.goals.length < 10) {
    throw new Error('Goals description must be at least 10 characters')
  }
  
  if (!Array.isArray(consultation.services) || consultation.services.length === 0) {
    throw new Error('At least one service must be selected')
  }
  
  return true
}

// Normalize consultation data structure for Supabase
const normalizeConsultation = (consultation) => {
  return {
    name: consultation.name,
    email: consultation.email,
    discord: consultation.discord || null,
    community: consultation.community,
    member_count: consultation.memberCount || 'Unknown',
    services: consultation.services || [],
    goals: consultation.goals,
    challenges: consultation.challenges || '',
    timeline: consultation.timeline,
    budget: consultation.budget,
    preferred_time: consultation.preferredTime || 'flexible',
    additional_info: consultation.additionalInfo || '',
    status: consultation.status || 'pending',
    admin_notes: consultation.admin_notes || null,
  }
}

// Add a new consultation
export const addConsultation = async (consultationData) => {
  try {
    const normalizedData = normalizeConsultation(consultationData)
    validateConsultation(normalizedData)
    
    const { data, error } = await supabase
      .from('consultations')
      .insert([normalizedData])
      .select()
      .single()
    
    if (error) throw error
    
    return { success: true, consultation: data }
  } catch (error) {
    console.error('Error adding consultation:', error)
    return { success: false, error: handleSupabaseError(error) }
  }
}

// Get consultations with filtering
export const getConsultations = async (filters = {}) => {
  try {
    let query = supabase
      .from('consultations')
      .select('*')
    
    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status)
    }
    
    if (filters.community) {
      query = query.eq('community', filters.community)
    }
    
    if (filters.services && Array.isArray(filters.services)) {
      query = query.overlaps('services', filters.services)
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
    
    return { success: true, consultations: data || [] }
  } catch (error) {
    console.error('Error getting consultations:', error)
    return { success: false, error: handleSupabaseError(error), consultations: [] }
  }
}

// Update a consultation
export const updateConsultation = async (id, updates) => {
  try {
    const normalizedUpdates = normalizeConsultation(updates)
    validateConsultation(normalizedUpdates)
    
    const { data, error } = await supabase
      .from('consultations')
      .update(normalizedUpdates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    return { success: true, consultation: data }
  } catch (error) {
    console.error('Error updating consultation:', error)
    return { success: false, error: handleSupabaseError(error) }
  }
}

// Delete a consultation
export const deleteConsultation = async (id) => {
  try {
    const { error } = await supabase
      .from('consultations')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting consultation:', error)
    return { success: false, error: handleSupabaseError(error) }
  }
}

// Update consultation status
export const updateConsultationStatus = async (id, status, adminNotes = '') => {
  return updateConsultation(id, { status, admin_notes: adminNotes })
}

// Get consultation statistics
export const getConsultationStats = async () => {
  try {
    // Get total count
    const { count: total, error: totalError } = await supabase
      .from('consultations')
      .select('*', { count: 'exact', head: true })
    
    if (totalError) throw totalError
    
    // Get status distribution
    const { data: statusData, error: statusError } = await supabase
      .from('consultations')
      .select('status')
    
    if (statusError) throw statusError
    
    const statusStats = statusData.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1
      return acc
    }, {})
    
    // Get average budget
    const { data: budgetData, error: budgetError } = await supabase
      .from('consultations')
      .select('budget')
    
    if (budgetError) throw budgetError
    
    const averageBudget = budgetData.length > 0 
      ? budgetData.reduce((sum, c) => {
          const budget = parseInt(c.budget?.split('-')[0]) || 0
          return sum + budget
        }, 0) / budgetData.length
      : 0
    
    // Get service distribution
    const { data: serviceData, error: serviceError } = await supabase
      .from('consultations')
      .select('services')
    
    if (serviceError) throw serviceError
    
    const serviceStats = {}
    serviceData.forEach(c => {
      c.services.forEach(service => {
        serviceStats[service] = (serviceStats[service] || 0) + 1
      })
    })
    
    return {
      success: true,
      stats: {
        total,
        statusStats,
        averageBudget: Math.round(averageBudget),
        serviceStats
      }
    }
  } catch (error) {
    console.error('Error getting consultation stats:', error)
    return { success: false, error: handleSupabaseError(error) }
  }
}

// Export consultations data
export const exportConsultations = async () => {
  try {
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    
    const link = document.createElement('a')
    link.href = URL.createObjectURL(dataBlob)
    link.download = `consultations-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    
    return { success: true }
  } catch (error) {
    console.error('Error exporting consultations:', error)
    return { success: false, error: handleSupabaseError(error) }
  }
}

// Import consultations data
export const importConsultations = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result)
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: expected array of consultations')
        }
        
        // Validate all consultations
        data.forEach(validateConsultation)
        
        // Normalize all consultations
        const normalizedData = data.map(normalizeConsultation)
        
        const { error } = await supabase
          .from('consultations')
          .insert(normalizedData)
        
        if (error) throw error
        
        resolve({ success: true, count: normalizedData.length })
      } catch (error) {
        console.error('Error importing consultations:', error)
        resolve({ success: false, error: handleSupabaseError(error) })
      }
    }
    
    reader.onerror = () => {
      resolve({ success: false, error: 'Failed to read file' })
    }
    
    reader.readAsText(file)
  })
}

// Clear all consultations (admin only)
export const clearConsultations = async () => {
  try {
    const { error } = await supabase
      .from('consultations')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all
    
    if (error) throw error
    
    return { success: true }
  } catch (error) {
    console.error('Error clearing consultations:', error)
    return { success: false, error: handleSupabaseError(error) }
  }
}

// Subscribe to real-time consultations updates
export const subscribeToConsultations = (callback) => {
  return supabase
    .channel('consultations_changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'consultations' }, 
      callback
    )
    .subscribe()
} 