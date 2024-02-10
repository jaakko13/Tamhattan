'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'


const cookieStore = cookies()
const supabase = createClient(cookieStore)

async function SignUpNewUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: 'https://example.com/welcome',
        },
    })
}

export default SignUpNewUser