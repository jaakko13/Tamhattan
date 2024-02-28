'use client'

import React, { useEffect, useState } from 'react'
import NavBar from '../components/navBar'
import { useSearchParams } from 'next/navigation'
import { createClient } from "../../utils/supabase/client";
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { newReply, listenReply } from '../interfaces/interfaces'
import { retrieveUser } from '../components/userAuthFunctions'


const DynamicPost = () => {
  const supabase = createClient()
  const router = useRouter();

  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')

  const [fetchError, setFetchError] = useState<string>()
  const [post, setPost] = useState<any[]>()

  const [title, setTitle] = useState<string>()
  const [postAuthor, setPostAuthor] = useState<string>()
  const [content, setContent] = useState<string>('')

  const [fetchRepliesError, setFetchRepliesError] = useState<string>()
  const [replies, setReplies] = useState<any[]>([])
  const [replyText, setReplyText] = useState('')
  const [placeText, setPlaceText] = useState('')
  const [btn, setBtn] = useState<boolean>()

  const [replyAuthor, setReplyAuthor] = useState<string>()



  const onSubmit = async (event: any) => {
    event.preventDefault(); //prevents keep reload
    const { error } = await supabase
        .from('replies')
        .insert({ content: replyText, author: replyAuthor, top_parent: postId})

    setReplyText('')
  }

  useEffect(() => {
    const channels = supabase.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'replies' },
        (payload) => {
          // console.log('Change received!', payload)
          const data = payload.new
          setReplies([...replies, payload.new as listenReply])
        }
      )
      .subscribe()

  }, [replies, setReplies, supabase])


  useEffect(() => {

    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('id', postId)
        .single()

      if (error) {
        setFetchError('Failed to fecth posts')
        setPost(undefined)
        console.log(error)
      }
      if (data) {
        setTitle(data.title)
        setPostAuthor(data.author)
        setContent(data.content)

        console.log(data)
      }
    }
    fetchPost()

    const fetchReplies = async () => {
      const { data, error } = await supabase
        .from('replies')
        .select()
        .eq('top_parent', postId)

      if (error) {
        setFetchError('Failed to fetch posts')
        setPost(undefined)
        console.log(error)
      }
      if (data) {
        setReplies(data)
        setFetchRepliesError(undefined)

        console.log(data)
      }
    }
    fetchReplies()


  }, [postId, supabase])


  useEffect(() => {
    const btnAbility = async () => {
      if (await retrieveUser()) {
        setPlaceText('Text (required)')
        setBtn(true)

        const session = await retrieveUser()
        setReplyAuthor(session?.user.user_metadata.name)
      } else {
        setPlaceText('You need to sign in to reply')
        setBtn(false)
      }
    }
    btnAbility()


  }, [])

  return (
    <main>
      <div className='bg'>
        <NavBar />

        <div className="flex justify-center h-9/12">
          <div className="flex flex-col justify-center w-full sm:w-9/12 bg-slate-900 mt-24 mb-10 rounded-xl p-2 box-border">
            <div className="flex flex-col w-full justify-center">

              <div className=" w-full text-white p-1 border-b-4 ">
                <p className="text-md text-slate-400">By: {postAuthor}</p>
                <p className="text-4xl mb-4">{title}</p>
                <p className="text-lg text-slate-400">{content}</p>
              </div>

              <div className='justify-center text-black'>
                <form className="space-y-6 " onSubmit={onSubmit} >
                  {/* action={createReply} */}
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Reply Text
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="replyText"
                        name="replyText"
                        value={replyText}
                        onChange={input => setReplyText(input.target.value)}
                        required
                        placeholder={placeText}
                        className="block w-full h-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input type='hidden' name='postId' value={postId ?? undefined} />
                    </div>
                  </div>

                  <button type="submit" disabled={!btn} className="flex w-full justify-center disabled:bg-red-800 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Reply
                  </button>

                  <div className='pb-10'>


                  </div>
                </form>

              </div>

              {fetchRepliesError && (<p>{fetchRepliesError}</p>)}

              {replies && (
                <div>
                  {replies.map(item => (
                    <div key={item.id} className="mb-2 w-full text-white hover:bg-slate-800 hover:rounded-xl hover:border-2 hover:cursor-pointer p-1 ">
                      <p className="text-sm">-{item.author}</p>
                      <p className="text-lg">{item.content}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>



        </div>
      </div>

    </main>
  )
}

export default DynamicPost