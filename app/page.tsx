import Link from "next/link";
import NavBar from './components/navBar'
import { retrieveUserIdentity } from "./components/userAuthFunctions";

export default function Home() {
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
