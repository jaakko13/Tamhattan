// 'use server'

// import { cookies } from 'next/headers'
import { createClient } from '../../utils/supabase/client'
import { redirect, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { User } from '@supabase/supabase-js'

// const cookieStore = cookies()
const supabase = createClient()

async function signUpNewUser(email: string, password: string, name: string) {
  var success
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: 'https://example.com/welcome',
      data: {
        name: name
      },
    },
  })

  if (data.user == null) {
    success = false
  } else {
    success = true
  }

  return success
}

async function retrieveUser() {
  // const { data, error } = await supabase.auth.getUserIdentities()
  // console.log(data?.identities)

  const { data: { session } } = await supabase.auth.getSession()

  console.log(session)
  return session
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
}

// async function navigate(whereTo: string) {
//   redirect(`/${whereTo}`)
// }

export { signUpNewUser, retrieveUser, signOut }