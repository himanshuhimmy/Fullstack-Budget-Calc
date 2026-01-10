import React from "react";
import SidebarContaner from "./SideBar/SidebarContaner";
import CalcualtionContainer from "./CalculationsPage/CalcualtionContainer";
import Inc_expContainer from "./Inc_ExpData/Inc_expContainer";

const DashBoard = () => {
  return (
    <div>
      <CalcualtionContainer />
      <Inc_expContainer />
    </div>
  );
};

export default DashBoard;
