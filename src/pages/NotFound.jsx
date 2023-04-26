import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      className="loading"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h3>Not Found | 404</h3>
      <button
        onClick={() => navigate(-2)}
        className="btn-primary"
        style={{ width: "max-content" }}
      >
        Kembali
      </button>
    </div>
  );
};

export default NotFound;
