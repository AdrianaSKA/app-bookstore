import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://zfqhzmnviefnjfyixlba.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmcWh6bW52aWVmbmpmeWl4bGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMjE4NTksImV4cCI6MjA2NzU5Nzg1OX0.BGKoDgVvYVEGzk2PP1fHI8OROG6m-MFz9jVu7mXC6tE'
)