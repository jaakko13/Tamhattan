'use client'

import React, { useState } from 'react'
import vaakuna from '../../public/vaakuna.svg'
import Image from 'next/image'
import { signUpNewUser } from './userAuthFunctions'
import ErrorDialog from './dialogs/errorDialog'
import SuccessDialog from './dialogs/successDialog'

function SignUpComponent() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [errorOpen, setErrorOpen] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)

    const onSubmit = async (event: any) => {
        event.preventDefault(); //prevents keep reload
        if (password === confPassword && await signUpNewUser(email, password, name)) {
            console.log('created user!')
            setSuccessOpen(true)
        } else {
            setErrorOpen(true)
            console.log('somethign went worng')
        }
    }

    return (
        <div className="flex size-3/12 flex-col justify-center bg-white mt-24 rounded-xl">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm pt-6">
                <Image
                    className="mx-auto h-10 w-auto"
                    src={vaakuna}
                    alt="Tampere Vaakuna"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up for an account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                value={name}
                                onChange={input => setName(input.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={input => setEmail(input.target.value)}
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={input => setPassword(input.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="passwordConf"
                                name="passwordConf"
                                type="password"
                                value={confPassword}
                                onChange={input => setConfPassword(input.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className='pb-10'>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <ErrorDialog errorOpen={errorOpen} setErrorOpen={setErrorOpen} title={'Error during Sign Up!'} text={'Something went wrong during Sign Up. Make sure your passwords match and that it is at least 6 characters long!'}/>
                <SuccessDialog successOpen={successOpen} setSuccessOpen={setSuccessOpen} />

            </div>
        </div>
    )
}

export default SignUpComponent