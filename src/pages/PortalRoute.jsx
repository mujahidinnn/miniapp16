import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Create from "./Create";
import Home from "./Home";
import Tabel from "./Tabel";
import Update from "./Update";

const PortalRoute = () => {
  return (
    <div className="container-portal">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="tabel" element={<Tabel />} />
          <Route path="create" element={<Create />} />
          <Route path="update/:id" element={<Update />} />
        </Routes>
      </div>
    </div>
  );
};

export default PortalRoute;
