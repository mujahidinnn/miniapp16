import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = ({ setShowModal }) => {
  const navigate = useNavigate();
  function handleLogout() {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://frontendreq.pondokprogrammer.com/api/logout",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .request(config)
      .then(() => {
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="bg-modal">
      <div className="content-modal">
        <h1>Are you sure to logout?</h1>
        <div className="wrap-btn">
          <button
            className="btn btn-success"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
