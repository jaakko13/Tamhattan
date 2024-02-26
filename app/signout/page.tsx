'use client'

import React, { useEffect } from 'react'
import { signOut } from '../components/userAuthFunctions'
import { useRouter } from 'next/navigation'

function SignOut() {
    const router = useRouter()

    useEffect(() => {
        const out = async () => {
            await signOut()
            router.push('/')
        }
        out()
    }, [])
    return (
        <main>
            <div className='bg'>
                <div className='flex justify-center text-9xl text-white'>
                You have been Signed Out!
                </div>
            </div>

        </main>
    )
}

export default SignOut