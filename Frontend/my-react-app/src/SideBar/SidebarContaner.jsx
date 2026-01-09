import { useContext } from "react";
import ContextStore from "../Store/ContextStore";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const SidebarContaner = () => {
  let { incomeData, ExpenceData, setActiveMonth, activeMonth, loggedIn } =
    useContext(ContextStore);

  const [years, setYears] = useState([]);

  useEffect(() => {
    if (!incomeData || !ExpenceData) return;

    const incomeMonths = incomeData.map((el) => el.date.slice(0, 7));
    const expenseMonths = ExpenceData.map((el) => el.date.slice(0, 7));

    const uniqueMonths = Array.from(
      new Set([...incomeMonths, ...expenseMonths])
    );

    setYears(uniqueMonths);
  }, [incomeData, ExpenceData]);

  function handleUserSelectedYear(value) {
    setActiveMonth(value);
  }

  return (
    <div className="w-full mt-2 bg-teal-700 rounded-r-2xl  h-dvh text-center">
      <h1 className="pt-4 text-3xl text-white mb-3"> Months </h1>
      <NavLink to={`/Pie`} className=" text-teal-300 hover:text-teal-400">
        View Pie Diagram
      </NavLink>
      <div>
        {years !== null &&
          loggedIn &&
          years.map((el) => {
            return (
              <div className="flex">
                <button
                  key={el}
                  onClick={() => handleUserSelectedYear(el)}
                  className="w-[70%] m-auto text-xl text-white hover:text-green-300 p-1 rounded-xl "
                >
                  {el}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SidebarContaner;
