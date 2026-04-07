import {
    createClient
}
from '@supabase/supabase-js';

const supabase = createClient('https://mixbeats-website.onrender.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkc2lreWplYnptd2JqaWVtd2dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MzYxNjEsImV4cCI6MjA5MTExMjE2MX0.vNmcxrYH7C2vyCWWiPLFJcOp0cAd5LCVdYoRzPIq_-4');

export default supabase;