import Link from "next/link";
import NavBar from './components/navBar'

export default function Home() {
  return (
    <main>
      <div className="bg">
        <NavBar />

        <div className="flex justify-center">
          {/* <Link 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          href='/signup'>
            Sign Up
          </Link> */}

        </div>
      </div>
    </main>
  );
}
