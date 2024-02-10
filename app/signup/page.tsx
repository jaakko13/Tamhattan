import SignUpComponent from "../components/signUpComponent";
import NavBar from "../components/navBar";

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
