import { useContext, useState } from "react";
import ContextStore from "../Store/ContextStore";
import axios from "axios";

const AddCatogery = () => {
  let {
    setModalStatus,
    setAddCatogery,
    userCatogery,
    setUserInput,
    UserInput,
    activeUser,
  } = useContext(ContextStore);

  function handleCancel() {
    setModalStatus(false);
    setAddCatogery(false);
  }

  function HandleOnchage(value, field) {
    console.log(value, field);
    setUserInput((prev) => ({
      ...prev,
      [field]: value,
      custom: true,
      userId: activeUser._id,
    }));
  }

  async function addCatogery() {
    if (UserInput !== null) {
      await axios.post(`http://localhost:3000/add/category`, UserInput);
      setUserInput(null);
      setAddCatogery(false);
      setModalStatus(false);
    }
  }

  return (
    <div className="p-4 text-center">
      <h1 className="text-xl text-white font-semibold ">Add Cataogery</h1>
      <div className="p-5">
        <select
          onChange={(e) => HandleOnchage(e.target.value, `type`)}
          className="p-1 m-3 bg-teal-600 rounded-xl"
        >
          <option value="income">+</option>
          <option value="expense">-</option>
        </select>
        <input
          type="text"
          className="p-2 bg-teal-500 rounded-2xl"
          placeholder="Name"
          onChange={(e) => HandleOnchage(e.target.value, `name`)}
        />
      </div>
      <div>
        <button onClick={addCatogery}>add</button>
        <button onClick={handleCancel}>cancel</button>
      </div>
    </div>
  );
};

export default AddCatogery;
