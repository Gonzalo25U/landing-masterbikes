import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bpdrnwjxacdgaltriinh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwZHJud2p4YWNkZ2FsdHJpaW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMzkxMDUsImV4cCI6MjA2NDcxNTEwNX0.9w6DbGUvh14mFbYTxP71AVZQMMwBTemKbHBBZADKfw0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);