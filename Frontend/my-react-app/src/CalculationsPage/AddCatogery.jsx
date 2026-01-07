import { useContext, useState } from "react";
import ContextStore from "../Store/ContextStore";
import axios from "axios";

const AddCatogery = () => {
  let {
    setModalStatus,
    setAddCatogery,
    setCheckCat,
    setUserInput,
    UserInput,
    activeUser,
    errors,
    setErrors,
    setRefreshData,
  } = useContext(ContextStore);

  function handleCancel() {
    setModalStatus(false);
    setAddCatogery(false);
  }
  const VaidateCat = () => {
    let valid = true;
    const newErrors = { name: "" };

    if (!UserInput?.name?.trim()) {
      newErrors.name = "Category needs a name";
      valid = false;
    } else if (UserInput.name.length < 4) {
      newErrors.name = "Category name too short";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  function HandleOnchage(value, field) {
    setCheckCat({ [field]: value });
    setUserInput((prev) => ({
      ...prev,
      [field]: value,
      custom: true,
      userId: activeUser._id,
    }));
  }

  console.log(UserInput);
  async function addCatogery() {
    if (!VaidateCat()) {
      return;
    }

    if (UserInput !== null) {
      await axios.post(`http://localhost:3000/add/category`, UserInput);
      setUserInput(null);
      setAddCatogery(false);
      setModalStatus(false);
      setRefreshData((prev) => prev + 1);
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
          <option value="income">Income</option>
          <option value="expense">Expense </option>
        </select>
        <input
          type="text"
          className="p-2 bg-teal-500 rounded-2xl"
          placeholder="Name"
          onChange={(e) => HandleOnchage(e.target.value, `name`)}
        />
        {errors.name && (
          <p className="text-red-600 font-normal">{errors.name}</p>
        )}
      </div>

      <div>
        <button onClick={addCatogery}>add</button>
        <button onClick={handleCancel}>cancel</button>
      </div>
    </div>
  );
};

export default AddCatogery;
