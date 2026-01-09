import React from "react";
import { useContext } from "react";
import ContextStore from "../Store/ContextStore";

const SignupPage = () => {
  let { signUpOnchange, errors, ConfirmSignup } = useContext(ContextStore);
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-teal-100">
      <div className="flex w-[20%] flex-col  m-5 bg-teal-700 p-5 rounded-3xl">
        <h1 className="text-xl text-white text-center mb-3 font-semibold">
          Details
        </h1>
        <label htmlFor=""> Your Name</label>
        <input
          className="bg-teal-100 p-2 rounded-xl my-2"
          type="text"
          placeholder="Name"
          onChange={(e) => signUpOnchange(e.target.value, `name`)}
        />
        {errors.name && (
          <p className="text-red-600 font-normal">{errors.name}</p>
        )}
        <label htmlFor=""> Your User Name</label>
        <input
          className="bg-teal-100 p-2 rounded-xl my-2"
          type="text"
          placeholder="Username"
          onChange={(e) => signUpOnchange(e.target.value, `username`)}
        />
        {errors.username && (
          <p className="text-red-600 font-normal ">{errors.username}</p>
        )}
        <label htmlFor="">Password</label>
        <input
          className="bg-teal-100 p-2 rounded-xl my-2"
          type="password"
          placeholder="password"
          onChange={(e) => signUpOnchange(e.target.value, `password`)}
        />
        {errors.password && (
          <p className="text-red-600 font-normal">{errors.password}</p>
        )}
        <div className="flex justify-around mt-3">
          <button
            className="bg-teal-300 px-3 py-1 rounded-2xl m-3 hover:bg-teal-500 transition-all duration-300"
            onClick={ConfirmSignup}
          >
            {" "}
            Signup
          </button>
          {/* <button onClick={handleSignupState}>Cancel </button> */}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
