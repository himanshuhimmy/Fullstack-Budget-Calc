import { useEffect, useState } from "react";
import "./App.css";
import ContextStore from "./Store/ContextStore";
import axios from "axios";
import HeadBar from "./Headder/HeadBar";
import SidebarContaner from "./SideBar/SidebarContaner";
import Inc_expContainer from "./Inc_ExpData/Inc_expContainer";
import CalcualtionContainer from "./CalculationsPage/CalcualtionContainer";
import ModalBox from "./Resuable/ModalBox";
import AddCatogery from "./CalculationsPage/AddCatogery";

function App() {
  const [activeUser, setActiveUser] = useState({
    _id: {
      $oid: "6956027a09a38f3e3332fb63",
    },
    name: "himanshu",
    username: "himmy",
    password: "$2b$10$exampleHashForHimanshu",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [addCatogery, setAddCatogery] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [refresdData, setRefreshData] = useState(0);
  const [activeMonth, setActiveMonth] = useState(false);

  const [UserInput, setUserInput] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [ExpenceData, setExpenceData] = useState(null);
  const [defaultCatogery, setDefaultCatogery] = useState(null);
  const [userCatogery, setUserCatogery] = useState(null);

  const [acessDetail, setAcessDetail] = useState(null);

  let [filteredIncome, setFilteredIncome] = useState(null);
  let [filteredExpence, setFilteredExpence] = useState(null);

  useEffect(() => {
    setFilteredIncome(
      incomeData
        ? incomeData.filter((el) => el.date.slice(0, 7) === activeMonth)
        : []
    );
    setFilteredExpence(
      ExpenceData
        ? ExpenceData.filter((el) => el.date.slice(0, 7) === activeMonth)
        : []
    );
  }, [activeMonth, UserInput, incomeData, ExpenceData]);

  useEffect(() => {
    let data = async () => {
      let response = await axios.get(`http://localhost:3000/get/allUsers`);
      setAcessDetail(response.data);
    };
    data();
  }, []);

  useEffect(() => {
    let data = async () => {
      let response = await axios.get(`http://localhost:3000/get/category`);
      setDefaultCatogery(response.data);
    };
    data();
  }, []);

  useEffect(() => {
    if (activeUser === null) return;

    const userId =
      typeof activeUser._id === "object" ? activeUser._id.$oid : activeUser._id;

    let data = async () => {
      let response = await axios.get(
        `http://localhost:3000/get/userCategory/${userId}`
      );
      setUserCatogery(response.data);
    };
    data();
  }, [activeUser, UserInput]);

  useEffect(() => {
    if (activeUser === null) return;

    const userId =
      typeof activeUser._id === `object` ? activeUser._id.$oid : activeUser._id;

    let data = async () => {
      let response = await axios.get(
        `http://localhost:3000/get/income/${userId}`
      );
      setIncomeData(response.data);
    };
    data();
    console.log(`refreshed income`);
  }, [activeUser, refresdData]);

  useEffect(() => {
    if (activeUser === null) return;

    const userId =
      typeof activeUser._id === `object` ? activeUser._id.$oid : activeUser._id;

    let data = async () => {
      let response = await axios.get(
        `http://localhost:3000/get/expence/${userId}`
      );
      setExpenceData(response.data);
    };
    data();
    console.log(`refreshed expence`);
  }, [activeUser, refresdData]);

  function handleLoginState() {
    if (loggedIn) {
      setActiveUser(null);
      setLoggedIn(false);
      return;
    }
    setLoginModal(!loginModal);
    setModalStatus(!modalStatus);
  }

  function handleSignupState() {
    setSignUp(!signUp);
    setModalStatus(!modalStatus);
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onChangeLogin(value, field) {
    if (field === "username") setUsername(value);
    if (field === "password") setPassword(value);
  }

  function ConfimLogin() {
    if (acessDetail !== null) {
      acessDetail.map((el) => {
        if (el.username === username && el.password === password) {
          setActiveUser(el);
          setModalStatus(false);
          setLoggedIn(true);
          setLoginModal(false);
        }
      });
    }
  }

  function signUpOnchange(value, field) {
    setUserInput((prev) => ({ ...prev, [field]: value }));
  }

  async function ConfirmSignup() {
    if (UserInput !== null) {
      await axios.post(`http://localhost:3000/add/user`, UserInput);
      console.log(`clicked`);
      setUserInput(null);
      setModalStatus(!modalStatus);
      setSignUp(!signUp);
    }
  }

  // ! income & Expence Data

  useEffect(() => {
    if (!loggedIn || !activeUser?._id) {
      setIncomeData(null);
      return;
    }

    const userId =
      typeof activeUser?._id === `object`
        ? activeUser._id.$oid
        : activeUser._id;
    let data = async () => {
      let response = await axios.get(
        `http://localhost:3000/get/income/${userId}`
      );
      setIncomeData(response.data);
    };
    data();
  }, [loggedIn, UserInput]);

  useEffect(() => {
    if (!loggedIn || !activeUser?._id) {
      setExpenceData(null);
      return;
    }

    const userId =
      typeof activeUser?._id === `object`
        ? activeUser._id.$oid
        : activeUser._id;
    let data = async () => {
      let response = await axios.get(
        `http://localhost:3000/get/expence/${userId}`
      );
      setExpenceData(response.data);
    };
    data();
  }, [loggedIn, UserInput]);

  let value = {
    handleLoginState,
    activeUser,
    setActiveUser,
    handleSignupState,
    acessDetail,
    defaultCatogery,
    loggedIn,
    setLoggedIn,
    modalStatus,
    setModalStatus,
    userCatogery,
    setUserCatogery,
    incomeData,
    setIncomeData,
    ExpenceData,
    setExpenceData,
    setUserInput,
    UserInput,
    setRefreshData,
    setAddCatogery,
    activeMonth,
    setActiveMonth,
    filteredExpence,
    filteredIncome,
  };

  return (
    <>
      <div className="">
        <ContextStore.Provider value={value}>
          <HeadBar />
          <div className="flex w-full">
            {(modalStatus || signUp) && (
              <ModalBox>
                {modalStatus && (
                  <>
                    {signUp && (
                      <div className="flex flex-col p-4 m-5">
                        <h1 className="text-xl text-white text-center mb-3 font-semibold">
                          Details
                        </h1>
                        <label htmlFor=""> Your Name</label>
                        <input
                          className="bg-teal-100 p-2 rounded-xl my-2"
                          type="text"
                          placeholder="Name"
                          onChange={(e) =>
                            signUpOnchange(e.target.value, `name`)
                          }
                        />
                        <label htmlFor=""> Your User Name</label>
                        <input
                          className="bg-teal-100 p-2 rounded-xl my-2"
                          type="text"
                          placeholder="Username"
                          onChange={(e) =>
                            signUpOnchange(e.target.value, `username`)
                          }
                        />
                        <label htmlFor="">Password</label>
                        <input
                          className="bg-teal-100 p-2 rounded-xl my-2"
                          type="password"
                          placeholder="password"
                          onChange={(e) =>
                            signUpOnchange(e.target.value, `password`)
                          }
                        />
                        <div className="flex justify-around mt-3">
                          <button onClick={ConfirmSignup}> Signup</button>
                          <button onClick={handleSignupState}>Cancel </button>
                        </div>
                      </div>
                    )}
                    {loginModal && (
                      <div className="flex flex-col p-4">
                        <h1 className="text-xl text-white text-center mb-3 font-semibold">
                          Login
                        </h1>
                        <input
                          className="bg-teal-100 p-2 rounded-xl my-2"
                          type="text"
                          placeholder="Username"
                          onChange={(e) =>
                            onChangeLogin(e.target.value, `username`)
                          }
                        />
                        <input
                          className="bg-teal-100 p-2 rounded-xl my-2"
                          type="password"
                          placeholder="password"
                          onChange={(e) =>
                            onChangeLogin(e.target.value, `password`)
                          }
                        />
                        <div className="flex justify-around mt-3">
                          <button onClick={ConfimLogin}> Confirm </button>
                          <button onClick={handleLoginState}>Cancel </button>
                        </div>
                      </div>
                    )}

                    {addCatogery === true && <AddCatogery />}
                  </>
                )}
              </ModalBox>
            )}
            <div className="w-[20%]">
              <SidebarContaner />
            </div>
            <div className="w-[80%]">
              <CalcualtionContainer />
              <Inc_expContainer />
            </div>
          </div>
        </ContextStore.Provider>
      </div>
    </>
  );
}

export default App;
