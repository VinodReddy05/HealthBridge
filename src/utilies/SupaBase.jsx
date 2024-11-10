// import { createClient } from '@supabase/supabase-js'


// const supabaseUrl =  "https://exdhwtkeippsrxikocxn.supabase.co"
// const supabaseKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4ZGh3dGtlaXBwc3J4aWtvY3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5NTU5NjAsImV4cCI6MjA0NjUzMTk2MH0.HaP4b7kvy3YrdNh8p8tgShgRLyjj2zpCNx1JTIY0upQ"


// const supabase = createClient(supabaseUrl, supabaseKey)


// export default supabase;




// const supabaseUrl = "https://exdhwtkeippsrxikocxn.supabase.co"
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4ZGh3dGtlaXBwc3J4aWtvY3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5NTU5NjAsImV4cCI6MjA0NjUzMTk2MH0.HaP4b7kvy3YrdNh8p8tgShgRLyjj2zpCNx1JTIY0upQ"

// console.log(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);


import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL, 
    import.meta.env.VITE_SUPABASE_ANON_KEY
    
)

