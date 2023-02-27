import { createClient } from '@supabase/supabase-js'
//this uses public anonymous key that we don't care about, don't commit private keys to git :)
const supabase = createClient('https://nyaajzmracvaceszghcb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55YWFqem1yYWN2YWNlc3pnaGNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0MzAzODYsImV4cCI6MTk5MjAwNjM4Nn0.dSZxXpK_TKy_G-DMabaMmJ_tUbpsxIiuHAWmMKiNZno')

export async function fetchCourses() {
	const response = await supabase.from('syllabase').select()
	return response.data as Array<any>
}