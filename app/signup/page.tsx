import SignUpComponent from "../components/signUpComponent";
import NavBar from "../components/navBar";
import Image from "next/image";
import skylineBG from '../../public/skylineBG.svg'

export default function SignUp() {
  return (
    <main>
      <div className="bg">

      <NavBar />

        <div className="flex justify-center">
          <SignUpComponent />
        </div>
      </div>
    </main>
  );
}
