import { useContext, useEffect, useMemo, useState } from "react";
import ContextStore from "../Store/ContextStore";
import axios from "axios";

const CalcualtionContainer = () => {
  let {
    userCatogery,
    defaultCatogery,
    UserInput,
    setUserInput,
    activeUser,
    setModalStatus,
    modalStatus,
    setAddCatogery,
    setActiveMonth,
    activeMonth,
    loggedIn,
    refresdData,
    totalIncome,
    totalExpense,
    totalBudget,
  } = useContext(ContextStore);

  function HandleModalStatus() {
    setModalStatus(!modalStatus);
    setAddCatogery(true);
  }

  let [check, setCheck] = useState(true);
  function handleCheck(value) {
    setCheck(value);
  }

  const filteredCat = defaultCatogery
    ? defaultCatogery.filter((el) =>
        check ? el.type === "income" : el.type === "expense"
      )
    : [];
  let [filteredCat2, setFilteredCat2] = useState(``);

  useEffect(() => {
    let data = (userCatogery ?? []).filter((el) =>
      check ? el.type === "income" : el.type === "expense"
    );
    setFilteredCat2(data);
  }, [userCatogery, check, refresdData]);

  function onChangeAddData(value, field) {
    const [year, month] = activeMonth.split("-").map(Number);

    const mongoDate = new Date(Date.UTC(year, month - 1, 1));

    setUserInput((prev) => ({
      ...prev,
      [field]: value,
      userId: activeUser._id,
      date: mongoDate,
    }));
  }

  function OnChangeMonth(w) {
    setActiveMonth(w);
  }

  async function PostData() {
    if (UserInput === null) {
      return;
    }

    const url = check
      ? "http://localhost:3000/add/incomeEntry"
      : "http://localhost:3000/add/expenceEntry";

    await axios.post(url, UserInput);

    return setUserInput(null);
  }

  return (
    <div className="bg-teal-100 mt-2 ml-2 rounded-l-2xl p-4">
      <h1 className="pt-2 text-center text-2xl text-teal-700  font-semibold">
        Month Budget
      </h1>

      <div className="text-center w-[40%] m-auto ">
        <h1
          className={`text-4xl p-4 ${
            totalBudget > 0 ? `text-green-600` : `text-red-600`
          }`}
        >
          {totalBudget}
        </h1>
        <p className="p-5 bg-green-400 mb-4 flex justify-around">
          <p>INCOME</p>
          <label className="text-green-900 text-xl font-bold">
            + {totalIncome}
          </label>
        </p>
        <p className="p-5 bg-red-400 mb-4 flex justify-around">
          <p>EXPENSE</p>
          <label className="text-red-700 text-xl font-bold">
            - {totalExpense}
          </label>
        </p>
      </div>

      <div className="flex justify-center p-5">
        <button
          disabled={!loggedIn}
          onClick={HandleModalStatus}
          className="px-2 py-1 bg-teal-500 mx-3 rounded-2xl hover:bg-teal-700 transition-all duration-300 hover:text-white disabled:bg-teal-300 disabled:cursor-not-allowed disabled:text-black"
        >
          Add Catogery
        </button>
      </div>
      <hr></hr>
      <div className="flex flex-col items-center">
        <p className="mb-2 font-medium">Select Month</p>
        <input
          disabled={!loggedIn}
          className="disabled:cursor-not-allowed"
          onChange={(e) => OnChangeMonth(e.target.value)}
          value={activeMonth}
          type="month"
        />
      </div>

      <div className="">
        <div className="flex justify-between ">
          <input
            className="bg-teal-200 p-2 rounded-2xl disabled:cursor-not-allowed"
            type="number"
            placeholder="Amount"
            value={UserInput?.amount ?? ""}
            disabled={!loggedIn}
            onChange={(e) => onChangeAddData(e.target.value, `amount`)}
          />
          <div>
            <p className="mb-2 font-medium">Select Catogery</p>
            <select
              value={UserInput?.categoryId ?? ""}
              onChange={(e) => onChangeAddData(e.target.value, "categoryId")}
              disabled={!loggedIn}
              className="p-2 bg-teal-400 rounded-xl disabled:cursor-not-allowed"
            >
              <option className="text-white" value="">
                Select category
              </option>

              {filteredCat.map((el) => (
                <option value={el._id}>{el.name}</option>
              ))}

              {filteredCat2 !== `` &&
                filteredCat2.map((el) => (
                  <option className="text-white" value={el._id}>
                    {el.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <p className="mb-2 font-medium">Select Type </p>
            <select
              onChange={(e) => handleCheck(e.target.value === "true")}
              disabled={!loggedIn}
              className="p-2 bg-teal-400 rounded-xl disabled:cursor-not-allowed"
            >
              <option value="true">+</option>
              <option value="false">-</option>
            </select>
          </div>

          <button
            disabled={!loggedIn}
            className="bg-teal-700 text-white px-4 py-1 rounded-3xl disabled:cursor-not-allowed"
            onClick={PostData}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalcualtionContainer;
