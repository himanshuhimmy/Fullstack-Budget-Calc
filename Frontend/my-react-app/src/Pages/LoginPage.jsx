import React, { useContext } from "react";
import ContextStore from "../Store/ContextStore";

const LoginPage = () => {
  let { ConfimLogin, onChangeLogin, errors } = useContext(ContextStore);
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-teal-100">
      <div className=" m-auto bg-teal-700 p-5 rounded-3xl ">
        <div className="flex flex-col  p-4">
          <h1 className="text-xl text-white text-center mb-3 font-semibold">
            Login
          </h1>
          <input
            className="bg-teal-100 p-2 rounded-xl my-2"
            type="text"
            placeholder="Username"
            onChange={(e) => onChangeLogin(e.target.value, `username`)}
          />
          {errors.username && (
            <p className="text-red-600 font-normal ">{errors.username}</p>
          )}
          <input
            className="bg-teal-100 p-2 rounded-xl my-2"
            type="password"
            placeholder="password"
            onChange={(e) => onChangeLogin(e.target.value, `password`)}
          />
          {errors.password && (
            <p className="text-red-600 font-normal">{errors.password}</p>
          )}
          <div className="flex justify-around mt-3">
            <button
              className="px-3 py-2 bg-teal-500 rounded-2xl hover:bg-teal-300 transition-all duration-300 text-white"
              onClick={ConfimLogin}
            >
              Confirm{" "}
            </button>
            {/* <button onClick={handleLoginState}>Cancel </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
