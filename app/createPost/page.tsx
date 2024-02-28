'use client'

import React, { useEffect, useState } from 'react'
import NavBar from "../components/navBar";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { newPost } from '../interfaces/interfaces'
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { retrieveUser } from '../components/userAuthFunctions';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const flairDropdown = [
    { name: 'Discussion' },
    { name: 'Event' },
    { name: 'News' }
]

function CreatePost() {
    const router = useRouter()
    const supabase = createClient()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [flair, setFlair] = useState('')
    const [postAuthor, setPostAuthor] = useState<string>()
    const [shown, setShown] = useState('Flair (Required)')


    const onSubmit = async (event: any) => {
        event.preventDefault(); //prevents keep reload
        const { error } = await supabase
            .from('posts')
            .insert({ title: title, content: content, author: postAuthor, flair: flair })

        router.push('/')
    }

    useEffect(() => {
        const getAuthor = async () => {
            const session = await retrieveUser()
            setPostAuthor(session?.user.user_metadata.name)
        }
        getAuthor()


    }, [])

    return (
        <main>
            <div className="bg">
                <NavBar />
                <div className="flex justify-center h-9/12">
                    <div className="flex flex-col justify-center w-1/2 bg-slate-900 mt-24 mb-10 rounded-xl p-2 box-border">

                        <form className="space-y-6 " onSubmit={onSubmit}>
                            {/* action={createPost} */}
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="title"
                                        name="title"
                                        value={title}
                                        placeholder='Title (required)'
                                        onChange={input => setTitle(input.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Flair
                                </label>
                                <div className="">
                                    <Menu as="div" className="relative inline-block text-left">
                                        <div>
                                            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                {shown}
                                                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </Menu.Button>
                                        </div>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    {flairDropdown.map((item) => (

                                                        <Menu.Item
                                                        key={item.name}
                                                        >
                                                            {({ active }) => (
                                                                
                                                                <a
                                                                    // href="#"
                                                                    onClick={() => {
                                                                        setFlair(item.name)
                                                                        setShown(item.name)
                                                                    }}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'block px-4 py-2 text-sm'
                                                                    )}


                                                                >
                                                                    {item.name}
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>


                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Content
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="content"
                                        name="content"
                                        value={content}
                                        onChange={input => setContent(input.target.value)}
                                        required
                                        placeholder='Text (required)'
                                        className="block w-full h-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>



                            <div className='pb-10'>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Create Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CreatePost