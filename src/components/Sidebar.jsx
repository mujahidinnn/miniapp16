import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logout from "./Logout";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);

  const { pathname } = useLocation();
  return (
    <nav>
      <Link
        to="/home"
        style={{ color: pathname === "/home" ? "#0038ff" : "black" }}
      >
        Home
      </Link>
      <Link
        to="/home/tabel"
        style={{ color: pathname === "/home/tabel" ? "#0038ff" : "black" }}
      >
        Tabel
      </Link>
      <Link
        to="/home/create"
        style={{ color: pathname === "/home/create" ? "#0038ff" : "black" }}
      >
        Create
      </Link>
      <a onClick={() => setShowModal(true)}> Logout</a>
      {showModal && <Logout setShowModal={setShowModal} />}
    </nav>
  );
};

export default Sidebar;
