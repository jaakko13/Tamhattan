'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'


const cookieStore = cookies()
const supabase = createClient(cookieStore)

async function signUpNewUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: 'https://example.com/welcome',
        },
    })
}

async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
  }

export {signUpNewUser, signInWithEmail}