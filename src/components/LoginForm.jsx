import { useState } from "react";
import Navbar from "./Navbar";
import { validateAuth } from "../utilities/Validation";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  const auth = getAuth();
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  function handleToSignup() {
    navigate("/SignupForm");
  }
  function handlevalidation(e) {
    e.preventDefault();
    const message = validateAuth(email, password);
    if (message) {
      toast.error(message, { icon: "🤦‍♂️" });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("welcome" + user);
          navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
      toast.success("Logging In", { icon: "❤💫❤" });
    }
  }
  return (
    <div className="h-screen w-screen flex flex-wrap justify-center items-center flex-col ">
      <div className=" absolute top-0 bg-red-600 w-screen text-center">
        <span className=" text-2xl">Welcome to Amaze</span>
      </div>
      <Toaster />
      <div
        className="login flex flex-wrap justify-center
       items-center bg-blue-600 rounded-lg h-1/2 w-1/3"
      >
        <form onSubmit={handlevalidation} className="flex flex-col w-full p-3">
          <label htmlFor="email" className="font-bold">
            Email address
          </label>
          <input
            type="email"
            placeholder="enter email"
            id="email"
            className="rounded-md mb-2 p-1"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <label htmlFor="password" className="font-bold">
            password
          </label>
          <input
            type="password"
            placeholder="enter password"
            id="password"
            className="p-1 rounded-md"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <div className="flex justify-center">
            <button className=" bg-red-200 p-2 w-full rounded-lg mt-2 ">
              signin
            </button>
          </div>
        </form>
        <div className="flex  items-center justify-center w-full mt-2">
          <span className="text-yellow-100">Dont have an account? </span>
          <button
            className=" underline text-white p-2 w-1/2 rounded-lg"
            onClick={handleToSignup}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
