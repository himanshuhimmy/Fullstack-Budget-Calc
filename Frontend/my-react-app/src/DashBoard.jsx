import React from "react";
import SidebarContaner from "./SideBar/SidebarContaner";
import CalcualtionContainer from "./CalculationsPage/CalcualtionContainer";
import Inc_expContainer from "./Inc_ExpData/Inc_expContainer";

const DashBoard = () => {
  return (
    <div>
      <div className="w-[20%]">
        <SidebarContaner />
      </div>
      <div className="w-[80%]">
        <CalcualtionContainer />
        <Inc_expContainer />
      </div>
    </div>
  );
};

export default DashBoard;
