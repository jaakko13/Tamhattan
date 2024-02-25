import React from 'react'
import NavBar from '../components/navBar'
import Image from 'next/image'
import nam from '../../public/nam.gif'

function Transport() {
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

export default Transport