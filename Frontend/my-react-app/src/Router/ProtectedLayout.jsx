import { useContext } from "react";
import ContextStore from "../Store/ContextStore";
import SidebarContaner from "../SideBar/SidebarContaner";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedLayout = () => {
  const { loggedIn } = useContext(ContextStore);

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex w-full">
      <div className="w-[20%]">
        <SidebarContaner />
      </div>
      <div className="w-[80%]">
        <Navigate />
        <Outlet />
      </div>
    </div>
  );
};
export default ProtectedLayout;
