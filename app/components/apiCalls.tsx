'use server'

import { navigate, retrieveUser } from "./userAuthFunctions"
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import {newPost, newReply} from '../interfaces/interfaces'
import supabase from "@/utils/supabase/client"


async function createPost(data: newPost) {
    const user = await retrieveUser()
    const author = user?.user_metadata.name

    const { error } = await supabase
        .from('posts')
        .insert({ title: data.title, content: data.content, author: author, flair: data.flair })
}

async function createReply(data: newReply) {
    const user = await retrieveUser()
    const author = user?.user_metadata.name

    // const rawData = {
    //     replyText: formData.get('replyText'),
    //     top_parent: formData.get('postId')
    // }

    console.log('replyText' + data.replyText)
    console.log('top_parent' + data.postId)


    const { error } = await supabase
        .from('replies')
        .insert({ content: data.replyText, author: author, top_parent: data.postId})
    
    // navigate(`${rawData.top_parent}`)

}


export { createPost, createReply }