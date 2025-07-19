import { supabase } from './supabaseClient'

// Test Supabase connection and permissions
export const testSupabaseConnection = async () => {
  console.log('🧪 Testing Supabase connection...')
  
  try {
    // Test 1: Basic connection
    console.log('🔧 Test 1: Basic connection')
    const { data: testData, error: testError } = await supabase
      .from('testimonials')
      .select('count(*)', { count: 'exact', head: true })
    
    if (testError) {
      console.error('❌ Connection test failed:', testError)
      return { success: false, error: testError }
    }
    
    console.log('✅ Connection test passed')
    
    // Test 2: Check table structure
    console.log('🔧 Test 2: Table structure')
    const { data: columns, error: columnsError } = await supabase
      .rpc('get_table_columns', { table_name: 'testimonials' })
      .catch(() => ({ data: null, error: 'RPC not available' }))
    
    if (columnsError) {
      console.log('⚠️ Could not check table structure via RPC')
    } else {
      console.log('✅ Table structure check passed')
    }
    
    // Test 3: Check RLS policies
    console.log('🔧 Test 3: RLS policies')
    const { data: policies, error: policiesError } = await supabase
      .rpc('get_table_policies', { table_name: 'testimonials' })
      .catch(() => ({ data: null, error: 'RPC not available' }))
    
    if (policiesError) {
      console.log('⚠️ Could not check policies via RPC')
    } else {
      console.log('✅ Policies check passed:', policies)
    }
    
    // Test 4: Try a simple insert (this should fail due to RLS, but we want to see the exact error)
    console.log('🔧 Test 4: Insert test')
    const testInsert = {
      name: 'Connection Test',
      community: 'test-community',
      rating: 5,
      text: 'This is a connection test',
      permission: 'public'
    }
    
    const { data: insertData, error: insertError } = await supabase
      .from('testimonials')
      .insert([testInsert])
      .select()
      .single()
    
    if (insertError) {
      console.log('❌ Insert test failed (expected):', insertError)
      console.log('  - Error code:', insertError.code)
      console.log('  - Error message:', insertError.message)
      console.log('  - Error details:', insertError.details)
      console.log('  - Error hint:', insertError.hint)
    } else {
      console.log('✅ Insert test passed (unexpected):', insertData)
    }
    
    return { 
      success: true, 
      connection: true,
      insertError: insertError 
    }
    
  } catch (error) {
    console.error('❌ Test failed with exception:', error)
    return { success: false, error }
  }
}

// Note: This test is now only run when explicitly called via the debug button 