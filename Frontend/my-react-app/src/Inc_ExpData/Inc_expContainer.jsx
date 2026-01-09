import { useContext, useEffect, useState } from "react";
import ContextStore from "../Store/ContextStore";
import axios from "axios";

const Inc_expContainer = () => {
  let {
    setRefreshData,
    filteredExpence,
    filteredIncome,
    setUserInput,
    UserInput,
  } = useContext(ContextStore);

  let [editToggle, setEditToggle] = useState(false);
  let [currentId, setCurrentId] = useState(``);
  const [editing, setEditing] = useState({
    amount: "",
  });

  async function deleteIncomeEntry(id) {
    await axios.delete(`http://localhost:3000/delete/incomeEntry/${id}`);
    setRefreshData((prev) => prev + 1);
  }

  async function deleteExpenceEntry(id) {
    await axios.delete(`http://localhost:3000/delete/expenceEntry/${id}`);
    setRefreshData((prev) => prev + 1);
  }

  function handleOnchangeEdit(value, field) {
    setEditing({ amount: value });
    setUserInput((prev) => ({ ...prev, [field]: value }));
  }

  async function handleEdit(id, field, amount) {
    if (!editToggle) {
      setCurrentId(id);
      setEditToggle(true);
      setEditing({ amount: amount });
      return;
    }

    const type = field === "income" ? "incomeEntry" : "expenseEntry";

    await axios.put(`http://localhost:3000/update/${type}/${id}`, UserInput);

    setUserInput({});
    setEditToggle(false);
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
                        +
                        {editToggle && data._id === currentId ? (
                          <input
                            className="bg-teal-400 p-1 rounded-2xl"
                            onChange={(e) =>
                              handleOnchangeEdit(e.target.value, `amount`)
                            }
                            value={editing.amount}
                          ></input>
                        ) : (
                          data.amount
                        )}
                      </td>
                      <td className="text-center px-2 py-1 flex justify-center">
                        <button
                          onClick={() =>
                            handleEdit(data._id, `income`, data.amount)
                          }
                          className="mx-2 text-white hover:underline bg-green-400 px-3 py-2 rounded-xl hover:bg-green-600 transition-all duration-300"
                        >
                          {editToggle && data._id === currentId
                            ? `Done`
                            : `Edit`}
                        </button>
                        {!editToggle && (
                          <button
                            onClick={() => deleteIncomeEntry(data._id)}
                            className="text-white hover:underline bg-red-400 px-3 py-2 rounded-xl hover:bg-red-600 transition-all duration-300"
                          >
                            Delete
                          </button>
                        )}
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
                        -
                        {editToggle && data._id === currentId ? (
                          <input
                            className="bg-teal-400 p-1 rounded-2xl"
                            onChange={(e) =>
                              handleOnchangeEdit(e.target.value, `amount`)
                            }
                            value={editing.amount}
                          ></input>
                        ) : (
                          data.amount
                        )}
                      </td>
                      <td className="text-center px-2 py-1 flex justify-center">
                        <button
                          onClick={() => handleEdit(data._id, `expense`)}
                          className="mx-2 text-white hover:underline bg-green-400 px-3 py-2 rounded-xl hover:bg-green-600 transition-all duration-300"
                        >
                          {editToggle && data._id === currentId
                            ? `Done`
                            : `Edit`}
                        </button>
                        {!editToggle && (
                          <button
                            onClick={() => deleteExpenceEntry(data._id)}
                            className="text-white hover:underline bg-red-400 px-3 py-2 rounded-xl hover:bg-red-600 transition-all duration-300"
                          >
                            Delete
                          </button>
                        )}
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
