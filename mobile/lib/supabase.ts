import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dvflblgfaweaesbnmsmr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2ZmxibGdmYXdlYWVzYm5tc21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzY1MzksImV4cCI6MjA3OTE1MjUzOX0.oLlTCL_k2Vnw9-oePIKrpPkvak8Yv4csekmXvuaIaOU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
