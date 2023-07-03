import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://snfygjrohlkwjzgkoefg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZnlnanJvaGxrd2p6Z2tvZWZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc1NDY4NzMsImV4cCI6MjAwMzEyMjg3M30.c_EfUpDD4Sjt5iHXTwfN2wafWNA8MOLvOhh2i280PRs";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
