'use client'

import Link from "next/link";
import NavBar from './components/navBar'
import { retrieveUser, loggedInCheck } from "./components/userAuthFunctions";
import { useEffect, useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<() => Promise<boolean>>()

  // useEffect(() => {
  //   console.log('sdadad')
  //   const log: () => Promise<boolean> = async () => {
      
  //     // setLoggedIn()
  //     return await loggedInCheck()
  //   }

  //   setLoggedIn(log)
  //   console.log('sdadad')

  // }, [])

  return (
    <main>
      <div className="bg">
        <NavBar />

        <div className="flex justify-center">


          {/* <button
          onClick={retrieveUserIdentity}>
            clck this
          </button> */}
          <Link className="text-white" href='https://one.me/fiatkzfi'>
            Save on Domains by going to -{'>'} https://one.me/fiatkzfi

          </Link>
        </div>
      </div>
    </main>
  );
}
