import { useContext } from "react";
import ContextStore from "../Store/ContextStore";
import { NavLink } from "react-router-dom";

const HeadBar = () => {
  let { handleLoginState, loggedIn, handelpass } = useContext(ContextStore);

  return (
    <header className="w-full bg-teal-500 p-4 shadow-xl shadow-teal-50">
      <div className="flex  justify-between mx-5">
        <div className="text-2xl text-white font-bold">Budget Calcualtor</div>
        <div className="flex gap-3">
          <NavLink
            to={`/`}
            onClick={handleLoginState}
            className="px-4 p-2 bg-teal-100 rounded-2xl hover:bg-teal-300 transition-all duration-300 hover:text-white"
          >
            {loggedIn ? `Logout` : `Login`}
          </NavLink>
          {!loggedIn && (
            <NavLink
              to={`/signup`}
              className="px-4 p-2 bg-teal-600 rounded-2xl hover:bg-teal-400 transition-all duration-300 hover:text-white "
            >
              Sign Up
            </NavLink>
          )}
          {loggedIn && (
            <NavLink
              onClick={handelpass}
              className="px-4 p-2 bg-teal-600 rounded-2xl hover:bg-teal-400 transition-all duration-300 hover:text-white "
            >
              Change Password
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeadBar;
