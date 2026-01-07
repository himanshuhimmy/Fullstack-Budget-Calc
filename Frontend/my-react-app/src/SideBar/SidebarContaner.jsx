import { useContext } from "react";
import ContextStore from "../Store/ContextStore";
import { useState } from "react";
import { useEffect } from "react";

const SidebarContaner = () => {
  let { incomeData, ExpenceData, setActiveMonth, activeMonth, loggedIn } =
    useContext(ContextStore);

  const [years, setYears] = useState({ income: [], expense: [] });
  const [month, setMonth] = useState({ income: [], expense: [] });

  useEffect(() => {
    if (!incomeData) return;
    if (!ExpenceData) return;
    const uniqueIncome = Array.from(
      new Set(incomeData.map((el) => el.date.slice(0, 7)))
    );
    const uniqueExpense = Array.from(
      new Set(ExpenceData.map((el) => el.date.slice(0, 7)))
    );
    setYears((prev) => ({ ...prev, income: uniqueIncome }));

    setYears((prev) => ({ ...prev, expense: uniqueExpense }));
  }, [incomeData, ExpenceData]);

  function handleUserSelectedYear(value) {
    setActiveMonth(value);
  }

  useEffect(() => {
    if (!incomeData) return;
    if (!ExpenceData) return;

    const currentIncomeYear = Array.from(
      new Set(
        incomeData
          .filter((el) => el.date.slice(0, 7) === activeMonth)
          .map((el) =>
            new Date(el.date).toLocaleString("en-US", {
              month: "long",
            })
          )
      )
    );
    setMonth((prev) => ({ ...prev, income: currentIncomeYear }));
  }, [activeMonth]);

  return (
    <div className="w-full mt-2 bg-teal-700 rounded-r-2xl  h-dvh text-center">
      <h1 className="pt-4 text-2xl text-white"> Months </h1>

      <div>
        <h1 className="pt-4 text-xl text-teal-200 mb-2 font-semibold">
          Income
        </h1>
        {years.income !== null &&
          loggedIn &&
          years.income.map((el) => {
            return (
              <div className="flex">
                <button
                  key={el}
                  onClick={() => handleUserSelectedYear(el)}
                  className="w-[70%] m-auto text-white hover:text-green-300 p-1 rounded-xl "
                >
                  {el}
                </button>
              </div>
            );
          })}
      </div>
      <div>
        <h1 className="pt-4 text-xl text-red-500 font-semibold"> Expense</h1>
        {years.expense !== null &&
          loggedIn &&
          years.expense.map((el) => {
            return (
              <button
                key={el}
                onClick={() => handleUserSelectedYear(el)}
                className="w-[70%] m-auto text-white hover:text-red-300 p-1 rounded-xl "
              >
                {el}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default SidebarContaner;
