import { useState } from "react";
import Navbar from "./Navbar";
import { checkValidData } from "../utilities/ValidateLogin";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { set, ref, getDatabase } from "firebase/database";
const SignupForm = () => {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  function handleToLogin() {
    navigate("/LoginForm");
  }
  function handlevalidation(e) {
    e.preventDefault();
    const message = checkValidData(name, email, password);
    if (message) {
      toast.error(message, { icon: "🤦‍♂️" });
    } else {
      //signup-->firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          set(ref(db, "users/" + user.uid), {
            email: email,
          });
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage, { icon: "🤐" });
          // ..
        });
      toast.success("successfully created", { icon: "❤💫❤" });
    }
  }
  return (
    <div className="h-screen w-screen flex flex-col flex-wrap justify-center items-center ">
      <div className=" absolute top-0 bg-red-600 w-screen text-center">
        <span className=" text-2xl">Welcome to Amaze</span>
      </div>
      <Toaster />
      <div
        className="login flex flex-wrap justify-center
       items-center bg-blue-600 rounded-lg h-1/2 w-1/3"
      >
        <form onSubmit={handlevalidation} className="flex flex-col w-full p-3">
          <label htmlFor="name" className="font-bold">
            USERNAME
          </label>
          <input
            name="username"
            type="text"
            placeholder="enter username"
            id="name"
            className="p-1 rounded-md "
            onChange={(e) => {
              setname(e.target.value);
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
          <button className=" bg-red-100 p-2 w-1/2 rounded-lg">signup</button>
        </form>
        <div className="flex  items-center justify-center w-full mt-2">
          <span className="text-yellow-100">Already have a account? </span>
          <button
            className=" underline text-white p-2 w-1/2 rounded-lg"
            onClick={handleToLogin}
          >
            LogIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
