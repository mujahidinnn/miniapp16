import { useNavigate } from "react-router-dom";
import { request } from "../utils/request";
import Loader from "./Loader";
import { useState } from "react";

const Logout = ({ setShowModal }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  function handleLogout() {
    setLoading(true);
    request
      .post("/logout")
      .then(() => {
        setLoading(false);
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  const LoadingLogout = (
    <div
      className="content-modal"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <Loader />
      <span style={{ fontSize: "44px", color: "#6889ff" }}>Keluar...</span>
    </div>
  );

  return (
    <div className="bg-modal">
      {loading ? (
        LoadingLogout
      ) : (
        <div className="content-modal">
          <h1>Anda yakin ingin keluar?</h1>
          <div className="wrap-btn">
            <button
              className="btn btn-success"
              onClick={() => setShowModal(false)}
            >
              Batal
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
