'use client'

import React, { useEffect } from 'react'
import { signOut, navigate } from '../components/userAuthFunctions'

function SignOut() {
    useEffect(() => {
        const out = async () => {
            await signOut()
            navigate('')
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