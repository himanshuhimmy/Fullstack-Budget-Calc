import { useContext, useEffect, useState } from "react";
import ContextStore from "../Store/ContextStore";
import axios from "axios";

const Inc_expContainer = () => {
  let { setRefreshData, filteredExpence, filteredIncome } =
    useContext(ContextStore);

  async function deleteIncomeEntry(id) {
    await axios.delete(`http://localhost:3000/delete/incomeEntry/${id}`);
    setRefreshData((prev) => prev + 1);
  }

  async function deleteExpenceEntry(id) {
    await axios.delete(`http://localhost:3000/delete/expenceEntry/${id}`);
    setRefreshData((prev) => prev + 1);
  }

  return (
    <div className="flex w-full justify-between mt-2 ml-2 bg-teal-200 rounded-l-2xl h-1/2">
      <div className="w-[50%] mt-3">
        <h1 className="text-2xl text-center text-green-800 font-semibold">
          Income
        </h1>

        <div className="flex">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className=" px-2 py-1 border-b">Category</th>
                <th className=" px-2 py-1 border-b">Amount</th>
                <th className=" px-2 py-1 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncome !== null &&
                filteredIncome.map((data) => {
                  return (
                    <tr>
                      <td className="text-center px-2 py-1">
                        {data.categoryId.name}
                      </td>
                      <td className="text-center px-2 py-1 text-green-800 font-semibold ">
                        + {data.amount}
                      </td>
                      <td className="text-center px-2 py-1">
                        <button
                          onClick={() => deleteIncomeEntry(data._id)}
                          className="text-white hover:underline bg-red-400 px-3 py-2 rounded-xl hover:bg-red-600 transition-all duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-[50%] mt-3">
        <h1 className="text-2xl text-center text-red-400 font-semibold">
          Expence
        </h1>
        <div className="flex">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className=" px-2 py-1 border-b">Category</th>
                <th className=" px-2 py-1 border-b">Amount</th>
                <th className=" px-2 py-1 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpence !== null &&
                filteredExpence.map((data) => {
                  return (
                    <tr>
                      <td className="text-center px-2 py-1">
                        {data.categoryId.name}
                      </td>
                      <td className="text-center px-2 py-1 font-semibold text-red-400 ">
                        - {data.amount}
                      </td>
                      <td className="text-center px-2 py-1">
                        <button
                          onClick={() => deleteExpenceEntry(data._id)}
                          className="text-white hover:underline bg-red-400 px-3 py-2 rounded-xl hover:bg-red-600 transition-all duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inc_expContainer;
