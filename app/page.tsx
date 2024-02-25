'use client'

import Link from "next/link";
import NavBar from './components/navBar'
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase/client";
import { navigate, retrieveUser } from "./components/userAuthFunctions";

export default function Home() {

  const [fetchError, setFetchError] = useState<string>()
  const [posts, setPosts] = useState<any[]>()
  const [btn, setBtn] = useState<boolean>()

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select()
        .is('parent_id', null)
        .order('created_at', {ascending: false})

      if (error) {
        setFetchError('Failed to fecth posts')
        setPosts(undefined)
        console.log(error)
      }
      if (data) {
        setPosts(data)
        setFetchError(undefined)
      }
    }
    fetchPosts()

    const btnAbility = async () => {
      if(await retrieveUser()){
        console.log('true')
        setBtn(true)
      }else{
        console.log('false')

        setBtn(false)
      }
    }
    btnAbility()


  }, [])



  return (
    <main>
      <div className="bg">
        <NavBar />

        <div className="flex justify-center">
          <Link target="_blank" className="text-white" href='https://one.me/fiatkzfi'>
            Save on Domains by going to -{'>'} https://one.me/fiatkzfi
          </Link>
        </div>

        <div className="flex justify-center h-9/12">
          <div className="flex flex-col justify-center w-9/12 bg-slate-900 mt-24 mb-10 rounded-xl p-2 box-border">
            <div className="flex justify-between flex-row mb-2">
              {/* title with new post button*/}
              <p className="text-4xl text-fuchsia-600">TALK TAMHATTAN</p>
              <button className="rounded-xl bg-blue-100 items-end hover:bg-green-500" hidden={!btn} onClick={() => navigate('createPost')}>CREATE POST</button>
              <button className="rounded-xl bg-blue-100 items-end hover:bg-green-500" hidden={btn} onClick={() => navigate('signup')}>CREATE ACCOUNT TO POST</button>


            </div>
            {fetchError && (<p>{fetchError}</p>)}
            {posts && (
              <div className="flex flex-col w-full ">
                {posts.map(item => (
                  <Link href={{
                    pathname: `/${item.id}`,
                    query: {
                      postId: item.id
                    }
                  }}
                  key={item.id}>
                    <div className="mb-2 w-full text-white hover:bg-slate-800 hover:rounded-xl hover:border-2 hover:cursor-pointer p-1 border-b">
                      <p className="text-2xl">{item.title}</p>
                      <p className="text-sm text-slate-400">{item.content.slice(0, 80) + '...'}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
