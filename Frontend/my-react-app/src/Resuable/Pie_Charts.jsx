import { PieChart } from "@mui/x-charts/PieChart";
import { useContext } from "react";
import ContextStore from "../Store/ContextStore";
import { NavLink } from "react-router-dom";

const Pie_Charts = () => {
  let { totalIncome, totalExpense, activeMonth } = useContext(ContextStore);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-teal-100">
      <div className="w-[60%] bg-teal-300 m-2 p-4 rounded-4xl">
        <h1 className="text-center mb-2 text-2xl font-medium">Chart</h1>
        {console.log(totalExpense, totalIncome)}
        <PieChart
          colors={["red", "green"]}
          series={[
            {
              data: [
                {
                  id: 0,
                  value: Math.floor(totalIncome),
                  label: "Income",
                  color: `green`,
                },
                {
                  id: 1,
                  value: Math.floor(totalExpense),
                  label: "Expense",
                  color: `red`,
                },
              ],
            },
          ]}
          width={200}
          height={200}
        />
        <p className="m-3 text-center font-bold text-teal-700">
          {activeMonth} Data{" "}
        </p>
        <NavLink
          className={`flex justify-center bg-teal-700 text-white px-2 py-1 rounded-3xl`}
          to={`/dashboard`}
        >
          Back
        </NavLink>
      </div>
    </div>
  );
};

export default Pie_Charts;
