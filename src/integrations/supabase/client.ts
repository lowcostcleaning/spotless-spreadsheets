import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xzrueytmkwofwonvubpt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cnVleXRta3dvZndvbnZ1YnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NTU0OTAsImV4cCI6MjA4MzUzMTQ5MH0.UBTET4boA1r-FBt6OxSm9XK9GjEW2miq5OIgQnsArww';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
