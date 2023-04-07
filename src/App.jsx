import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PortalRoute from "./pages/PortalRoute";
import Detail from "./pages/Detail";
import ReactHookForm from "./pages/ReactHookForm";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/" element={<ReactHookForm />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/home/*" element={<PortalRoute />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
