import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../components";
import { request } from "../utils/request";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberme] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dataUser = sessionStorage.getItem("dataUser");
    if (dataUser) {
      const { email, password, rememberme } = JSON.parse(dataUser);
      setEmail(email);
      setPassword(password);
      setRememberme(rememberme);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      return false;
    } else {
      setLoading(true);
      let data = new FormData();
      data.append("email", email);
      data.append("password", password);

      request
        .post("/login", data)
        .then((response) => {
          setLoading(false);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name-user", response.data.user.name);
          if (rememberme) {
            sessionStorage.setItem(
              "dataUser",
              JSON.stringify({ email, password, rememberme })
            );
          } else {
            sessionStorage.removeItem("dataUser");
          }
          navigate("/home");
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-auth">
        <h3>Login</h3>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Masukkan Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          name="password"
          type={show ? "text" : "password"}
          placeholder="Masukkan Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "10px", width: "max-content" }}>
            <input
              type="checkbox"
              name="rememberme"
              id="rememberme"
              onChange={(e) => setRememberme(e.target.checked)}
              checked={rememberme}
              style={{ width: "20px", height: "20px" }}
            />
            <label htmlFor="rememberme">Ingat saya</label>
          </div>
          <p onClick={() => setShow(!show)} className="toggle">
            {show ? "Hide" : "Show"}
          </p>
        </div>
        <Button
          title={loading ? "Loading..." : "Login"}
          onClick={handleSubmit}
          type="submit"
          className="btn-primary"
        />
        <p>
          Belum memiliki akun,
          <Link to="/register">
            <span>Register</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
