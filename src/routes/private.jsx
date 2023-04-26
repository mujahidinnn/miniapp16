import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Sidebar } from "../components";
import { Create, Detail, Home, NotFound, Tabel, Update } from "../pages";

const Private = () => {
  const location = useLocation();
  const showNavigation =
    location.pathname !== "*" && location.pathname !== "/404";

  return (
    <div className="container-portal">
      {showNavigation && (
        <div className="sidebar">
          <Sidebar />
        </div>
      )}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="tabel" element={<Tabel />} />
          <Route path="create" element={<Create />} />
          <Route path="update/:id" element={<Update />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </div>
  );
};

export default Private;
