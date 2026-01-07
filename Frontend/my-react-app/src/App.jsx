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
  // !for validation
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    name: ``,
  });
  const [sinupData, setSignUpData] = useState({
    username: "",
    password: "",
    name: ``,
  });
  const [checkCat, setCheckCat] = useState({ name: `` });

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

  const ValidateLogin = () => {
    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  function ConfimLogin() {
    if (!ValidateLogin()) return;

    const user = acessDetail.find(
      (el) => el.username === username && el.password === password
    );

    if (!user) {
      setErrors((prev) => ({
        ...prev,
        username: "Invalid username or password",
      }));
      return;
    }

    setActiveUser(user);
    setModalStatus(false);
    setLoggedIn(true);
    setLoginModal(false);
  }

  const ValidateSignIn = () => {
    let validate = true;
    const newErrors = { username: "", password: "", name: `` };

    if (sinupData?.name === ``) {
      newErrors.name = `name Required`;
      validate = false;
    }
    if (sinupData?.name.length < 2) {
      newErrors.name = `name Too short`;
      validate = false;
    }

    if (sinupData?.username === ``) {
      newErrors.username = `Username Required`;
      validate = false;
    }
    if (sinupData?.username.length < 4) {
      newErrors.username = `Username Too short`;
      validate = false;
    }
    if (sinupData?.password === ``) {
      newErrors.password = `Password Required`;
      validate = false;
    }
    if (sinupData?.password.length < 4) {
      newErrors.password = `password Too short`;
      validate = false;
    }
    setErrors(newErrors);
    return validate;
  };

  function signUpOnchange(value, field) {
    setUserInput((prev) => ({ ...prev, [field]: value }));
    setSignUpData((prev) => ({ ...prev, [field]: value }));
  }

  async function ConfirmSignup() {
    if (!ValidateSignIn()) {
      return;
    }
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
    checkCat,
    setCheckCat,
    errors,
    setErrors,
    refresdData,
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
                        {errors.name && (
                          <p className="text-red-600 font-normal">
                            {errors.name}
                          </p>
                        )}
                        <label htmlFor=""> Your User Name</label>
                        <input
                          className="bg-teal-100 p-2 rounded-xl my-2"
                          type="text"
                          placeholder="Username"
                          onChange={(e) =>
                            signUpOnchange(e.target.value, `username`)
                          }
                        />
                        {errors.username && (
                          <p className="text-red-600 font-normal ">
                            {errors.username}
                          </p>
                        )}
                        <label htmlFor="">Password</label>
                        <input
                          className="bg-teal-100 p-2 rounded-xl my-2"
                          type="password"
                          placeholder="password"
                          onChange={(e) =>
                            signUpOnchange(e.target.value, `password`)
                          }
                        />
                        {errors.password && (
                          <p className="text-red-600 font-normal">
                            {errors.password}
                          </p>
                        )}
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
                        {errors.username && (
                          <p className="text-red-600 font-normal ">
                            {errors.username}
                          </p>
                        )}
                        <input
                          className="bg-teal-100 p-2 rounded-xl my-2"
                          type="password"
                          placeholder="password"
                          onChange={(e) =>
                            onChangeLogin(e.target.value, `password`)
                          }
                        />
                        {errors.password && (
                          <p className="text-red-600 font-normal">
                            {errors.password}
                          </p>
                        )}
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
