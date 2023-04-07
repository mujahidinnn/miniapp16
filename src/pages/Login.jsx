import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../api/api";
import { Button, Input } from "../components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();


  function handleSubmit(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      return false;
    } else {
      let data = new FormData();
      data.append("email", email);
      data.append("password", password);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/login",
        headers: {},
        data: data,
      };

      instance
        .request(config)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name-user", response.data.user.name);
          navigate("/home");
        })
        .catch((error) => {
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
        <p onClick={() => setShow(!show)} className="toggle">{show ? "Hide" : "Show"}</p>
        <Button
          title="Login"
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
