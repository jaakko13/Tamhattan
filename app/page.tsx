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
            https://one.me/fiatkzfi
        </div>
      </div>
    </main>
  );
}
