import { useContext } from "react";
import ContextStore from "../Store/ContextStore";

const SidebarContaner = () => {
  let { incomeData, ExpenceData, activeMonth } = useContext(ContextStore);

  return (
    <div className="w-full mt-2 bg-teal-700 rounded-r-2xl  h-dvh text-center">
      <h1 className="pt-4 text-2xl text-white"> Months </h1>

      <div>
        <h1 className="pt-4 text-xl text-teal-200 mb-2 font-semibold">
          Income
        </h1>
        {incomeData !== null &&
          incomeData.map((el) => {
            return (
              <select
                className="w-[70%] m-auto bg-teal-200 p-1 rounded-xl"
                name=""
                id=""
              >
                <option value="">{new Date(el.date).getUTCFullYear()}</option>
              </select>
            );
          })}
      </div>
      <div>
        <h1 className="pt-4 text-xl text-red-500 font-semibold"> Expense</h1>
      </div>
    </div>
  );
};

export default SidebarContaner;
