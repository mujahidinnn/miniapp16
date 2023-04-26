import { lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Login, Register } from "../pages";
import Private from "./private";

const NotFound = lazy(() => import("../pages/NotFound"));

const Routers = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token || token === "undefined") {
      setAuthenticated(false);
      if (location.pathname !== "/register") navigate("/");
    } else {
      setAuthenticated(true);
    }
  }, [navigate, token]);
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      {authenticated && (
        <>
          <Route key="home" path="/home/*" element={<Private />} />
          <Route key="not-found" path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </>
      )}
      <Route key="fallback" path="*" element={<></>} />
    </Routes>
  );
};

export default Routers;
