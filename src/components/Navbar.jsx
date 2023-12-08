import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import store from "../utilities/appSlice";
import { signOut, getAuth } from "firebase/auth";
const Navbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  function handlesignout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  }
  return (
    <div className="w-screen h-12 bg-slate-950 flex justify-between items-center">
      <div className="w-1/3 text-white font-semibold text-2xl ms-2">Amaze</div>
      <div className="w-1/3 text-white font-semibold text-xl ms-2">
        <input type="text" className="rounded-s-md" />
        <button className="bg-yellow-400 px-2 font-normal rounded-e-md">
          search
        </button>
      </div>
      <div className="w-1/3 flex text-white justify-around">
        <h2
          onClick={() => {
            navigate("/");
          }}
          className="cursor-pointer"
        >
          Home
        </h2>
        <h2
          onClick={() => {
            navigate("/LoginForm");
          }}
          className="cursor-pointer"
        >
          Login
        </h2>
        <h2 onClick={handlesignout} className="cursor-pointer">
          SignOut
        </h2>
        <h2>cart</h2>
      </div>
    </div>
  );
};

export default Navbar;
