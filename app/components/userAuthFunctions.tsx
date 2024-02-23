'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { User } from '@supabase/supabase-js'

const cookieStore = cookies()
const supabase = createClient(cookieStore)

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

async function loginWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (await retrieveUser() != null) {
    return true
  } else {
    return false
  }
}

async function retrieveUser() {
  // const { data, error } = await supabase.auth.getUserIdentities()
  // console.log(data?.identities)

  const { data: { user } } = await supabase.auth.getUser()

  console.log(user)
  return user
}

async function loggedInCheck() {

  const { data, error } = await supabase.auth.getUser()
  console.log(data.user)
  // return data.user

  if (data.user != null) {
    return true
  } else {
    return false
  }
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
}

async function navigate(whereTo: string) {
  redirect(`/${whereTo}`)
}

// async function getPostData(postID: bigint){
//   await navigate('Post')

  
// }


// async function addUserData(name: string, email: string) {
//   const { error } = await supabase
//     .from('Users')
//     .insert({ user_name: {name}, user_email: {email} })
// }

export { signUpNewUser, loginWithEmail, retrieveUser, loggedInCheck, navigate, signOut }