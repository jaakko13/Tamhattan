'use client'

import React, { Fragment, useEffect, useState } from 'react'
import NavBar from '../components/navBar'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { createClient } from "../../utils/supabase/client";
import Link from 'next/link'


const flairDropdown = [
    { name: 'Season 1' },
    { name: 'Season 2' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function Leaderboard() {
    const [shown, setShown] = useState('Season 2')
    const [cur, setCur] = useState(2)

    const supabase = createClient()

    const [fetchError, setFetchError] = useState<string>()
    const [leaderboard, setLeaderboard] = useState<any[]>()
    const [contestants, setContestants] = useState<any>([])
    // const [people, setPeople] = useState<any>()

    useEffect(() => {

        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('leaderboard')
                .select()
                .eq("season", 2)
            // .order('created_at', { ascending: false })

            if (error) {
                setFetchError('Failed to fecth posts')
                setLeaderboard(undefined)
                console.log(error)
            }
            if (data) {
                console.log(data)
                setLeaderboard(data)
                setFetchError(undefined)
                // setPeople(data)

                
            }
        }
        
        fetchPosts()

    }, [])


    function orderLeaders() {
        if (leaderboard) {
            for (let i = 0; i < leaderboard[cur - 1].contestants.length; i++) {
                setContestants([...contestants, leaderboard[cur - 1].contestants[i]])
            }
            console.log(contestants)
        }
    }


    return (
        <main>
            <div className='bg'>
                <NavBar />
                <div className="flex justify-center h-9/12">
                    <div className="flex flex-col justify-center w-full sm:w-8/12 bg-slate-900 mt-24 mb-10 rounded-xl p-2 box-border">
                        <div className="flex justify-between flex-row mb-2">
                            {/* title with new post button*/}
                            <p className="text-4xl text-fuchsia-600 font-bold">Leaderboard</p>

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
                                                                // setFlair(item.name)
                                                                setShown(item.name)
                                                                var lastChar = item.name.substr(item.name.length - 1)
                                                                setCur(parseInt(lastChar))



                                                            }}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
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

                        <div>
                            {fetchError && (<p>{fetchError}</p>)}
                            {leaderboard && (
                                <div className="flex flex-col w-full ">
                                    {leaderboard.map((item) => {
                                        for (let i = 0; i < item.contestants.length; i++) {

                                        }


                                        return (
                                            <div key={item.id} className='text-white font-black'>
                                                <p>Start Date: {item.startDate}</p>
                                                <p>End Date: {item.endDate}</p>

                                                {/* trying to show conetstanbrbn */}
                                                <p>{item.contestants[0].name}</p>



                                            </div>
                                        )
                                    })}


                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </main>

    )
}


export default Leaderboard