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
    filteredIncome,
    filteredExpence,
    incomeData,
    ExpenceData,
    activeMonth,
  } = useContext(ContextStore);

  function HandleModalStatus() {
    setModalStatus(!modalStatus);
    setAddCatogery(true);
  }

  let [totalIncome, setTotalIncome] = useState(0);
  let [totalExpense, setTotaExpense] = useState(0);
  let [totalBudget, setTotalBudget] = useState(0);

  useEffect(() => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    if (filteredIncome) {
      filteredIncome.forEach((el) => {
        incomeTotal += Number(el.amount);
      });
    }

    if (filteredExpence) {
      filteredExpence.forEach((el) => {
        expenseTotal += Number(el.amount);
      });
    }

    setTotalIncome(incomeTotal);
    setTotaExpense(expenseTotal);
    setTotalBudget(incomeTotal - expenseTotal);
  }, [filteredIncome, filteredExpence, activeMonth]);

  let [check, setCheck] = useState(true);
  function handleCheck(value) {
    setCheck(value);
  }

  const filteredCat = defaultCatogery
    ? defaultCatogery.filter((el) =>
        check ? el.type === "income" : el.type === "expense"
      )
    : [];

  const filteredCat2 = useMemo(() => {
    return (userCatogery ?? []).filter((el) =>
      check ? el.type === "income" : el.type === "expense"
    );
  }, [userCatogery, check]);

  function onChangeAddData(value, field) {
    const now = new Date();
    const iso = now.toISOString();
    setUserInput((prev) => ({
      ...prev,
      [field]: value,
      userId: activeUser._id,
      date: iso,
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
    <div className="bg-teal-100 mt-2 ml-2 rounded-l-2xl h-3/6">
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
          onClick={HandleModalStatus}
          className="px-2 py-1 bg-teal-500 mx-3 rounded-2xl hover:bg-teal-700 transition-all duration-300 hover:text-white"
        >
          Add Catogery
        </button>
      </div>
      <hr></hr>
      <div className="flex flex-col items-center">
        <p className="mb-2 font-medium">Select Month</p>
        <input onChange={(e) => OnChangeMonth(e.target.value)} type="month" />
      </div>

      <div className="">
        <div className="flex justify-between ">
          <input
            className="bg-teal-200 p-2 rounded-2xl"
            type="number"
            placeholder="Amount"
            onChange={(e) => onChangeAddData(e.target.value, `amount`)}
          />
          <div>
            <p className="mb-2 font-medium">Select Catogery</p>
            <select
              onChange={(e) => onChangeAddData(e.target.value, `categoryId`)}
              className="p-2 bg-teal-400 rounded-xl"
            >
              {filteredCat.map((el) => {
                return (
                  <option key={el._id ?? el.name} value={el._id}>
                    {el.name}
                  </option>
                );
              })}
              {filteredCat2.map((el) => {
                return (
                  <option
                    className="text-white"
                    key={el._id ?? el.name}
                    value={el._id}
                  >
                    {el.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <p className="mb-2 font-medium">Select Type </p>
            <select
              onChange={(e) => handleCheck(e.target.value === "true")}
              className="p-2 bg-teal-400 rounded-xl"
            >
              <option value="true">+</option>
              <option value="false">-</option>
            </select>
          </div>

          {/* <input
            onChange={(e) => onChangeAddData(e.target.value, `date`)}
            type="date"
          /> */}
          <button
            className="bg-teal-700 text-white px-4 py-1 rounded-3xl"
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
