import { useContext } from "react";
import ContextStore from "../Store/ContextStore";

const HeadBar = () => {
  let { handleLoginState, loggedIn, handleSignupState } =
    useContext(ContextStore);

  return (
    <header className="w-full bg-teal-500 p-4 shadow-xl shadow-teal-50">
      <div className="flex  justify-between mx-5">
        <div className="text-2xl text-white font-bold">Budget Calcualtor</div>
        <div className="flex gap-3">
          <button
            onClick={handleLoginState}
            className="px-4 p-2 bg-teal-100 rounded-2xl hover:bg-teal-300 transition-all duration-300 hover:text-white"
          >
            {loggedIn ? `Logout` : `Login`}
          </button>
          {!loggedIn && (
            <button
              onClick={handleSignupState}
              className="px-4 p-2 bg-teal-600 rounded-2xl hover:bg-teal-400 transition-all duration-300 hover:text-white "
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeadBar;
