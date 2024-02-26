import React from 'react'
import NavBar from '../components/navBar'
import Image from 'next/image'
import nam from '../../public/nam.gif'
import { createClient } from "../../utils/supabase/client";
import { cookies } from 'next/headers'

async function Weather() {
    const supabase = createClient()
    const {
        data: { session },
      } = await supabase.auth.getSession();

    return (
    <main>
            <div className='bg'>
                <NavBar />
                <div className='mt-10 flex flex-col justify-center text-center text-5xl text-green-400'>
                    <Image
                        className="mx-auto w-auto"
                        src={nam}
                        alt="Tampere Vaakuna"
                    />

                    {/* <p className=''> */}
                        MEN AT WORK. Site Under Construction
                    {/* </p> */}
                </div>

            </div>
        </main>
  )
}

export default Weather