
import { createClient } from '@supabase/supabase-js';

// These must match the values used in your Supabase project dashboard
const supabaseUrl = 'https://iqcxemcvdcirbhmkgzhc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxY3hlbWN2ZGNpcmJobWtnemhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MzQ0NjMsImV4cCI6MjA4NTUxMDQ2M30.AJjoOcRwKlS5oowvs3sUEQcTB9UF2V7HC8A-e1vJk2Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
