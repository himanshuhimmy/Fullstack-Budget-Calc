import React, { useContext } from "react";
import ContextStore from "../Store/ContextStore";
import axios from "axios";

const ChangePAssWord = () => {
  let { handelpass, handleOLdPAss, errors, UserInput, activeUser } =
    useContext(ContextStore);

  async function ValidPass() {
    if (!handleOLdPAss()) {
      errors.password = `Wrong Password`;
      return;
    }

    await axios.put(
      `http://localhost:3000/editUser/${activeUser._id}`,
      UserInput
    );
  }

  console.log(UserInput);
  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold">Update Password</h1>
      <div className="flex flex-col justify-center p-3">
        <input
          className="bg-teal-200 p-2 rounded-xl my-2"
          placeholder="Current Password"
          type="password"
          onChange={(e) => handleOLdPAss(e.target.value, `old`)}
        />
        {errors.password && (
          <p className="text-red-600 font-normal">{errors.password}</p>
        )}
        <input
          className="bg-teal-200 p-2 rounded-xl my-2"
          placeholder="New Password"
          onChange={(e) => handleOLdPAss(e.target.value, `password`)}
          type="password"
        />
        <div className="flex justify-around m-2">
          <button onClick={ValidPass}>Done</button>
          <button onClick={handelpass}>cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePAssWord;
