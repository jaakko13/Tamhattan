import NavBar from "../components/navBar";
import LoginComponent from "../components/loginComponent";

export default function Login() {
    return (
        <main>
            <div className="bg">
                <NavBar />
                <div className="flex justify-center">
                    <LoginComponent />

                </div>
            </div>
        </main>
    );
}
