import { useContext } from "react";
import ContextStore from "../Store/ContextStore";
import { Navigate, Outlet } from "react-router-dom";

const PublicLayout = () => {
  const { loggedIn } = useContext(ContextStore);

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicLayout;
