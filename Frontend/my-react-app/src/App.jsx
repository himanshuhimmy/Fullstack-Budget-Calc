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
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import AppRoutes from "./Router/Routes";
import ChangePAssWord from "./Pages/ChangePAssWord";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import DashBoard from "./DashBoard";
import Pie_Charts from "./Resuable/Pie_Charts";

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

  const [activeUser, setActiveUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [addCatogery, setAddCatogery] = useState(false);

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

  const navigate = useNavigate();
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
    setLoggedIn(true);

    navigate("/dashboard", { replace: true });
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
      setUserInput(null);
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

  function handelpass() {
    setChangePass(!changePass);
    setModalStatus(!modalStatus);
    setUserInput(null);
  }

  function handleOLdPAss(value, field) {
    let data = false;
    if (field === `old`) {
      activeUser !== null && activeUser.password === value
        ? (data = true)
        : (data = false);
    }
    if (field === `password`) {
      if (activeUser !== null && activeUser.password === value) {
        errors.password = `new And old PAssword cannot be same`;
      }

      setUserInput((prev) => ({ ...prev, [field]: value }));
    }

    return data;
  }
  console.log(totalExpense, totalIncome);
  let value = {
    handleLoginState,
    activeUser,
    setActiveUser,
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
    ConfimLogin,
    onChangeLogin,
    signUpOnchange,
    ConfirmSignup,
    handelpass,
    handleOLdPAss,
    totalIncome,
    setTotalIncome,
    totalExpense,
    setTotaExpense,
    totalBudget,
    setTotalBudget,
  };

  return (
    <>
      <div className="">
        <ContextStore.Provider value={value}>
          {modalStatus && (
            <ModalBox>
              <>
                {addCatogery === true && <AddCatogery />}
                {changePass === true && <ChangePAssWord />}
              </>
            </ModalBox>
          )}
          <HeadBar />
          <div className="flex w-full">
            <AppRoutes />
          </div>
        </ContextStore.Provider>
      </div>
    </>
  );
}

export default App;
