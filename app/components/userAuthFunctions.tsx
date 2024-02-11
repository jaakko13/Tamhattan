'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

const cookieStore = cookies()
const supabase = createClient(cookieStore)

async function signUpNewUser(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name
      },
    },
  })
}

async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

}

// async function retrieveUserIdentity(){
//   // const { data: { user } } = await supabase.auth.getUser()
//   const { data, error } = await supabase.auth.getUserIdentities()
//   console.log(data?.identities)
// }

// async function addUserData(name: string, email: string) {
//   const { error } = await supabase
//     .from('Users')
//     .insert({ user_name: {name}, user_email: {email} })
// }

export { signUpNewUser, signInWithEmail }