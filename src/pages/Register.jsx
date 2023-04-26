import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../components";
import { request } from "../utils/request";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      password_confirmation === ""
    ) {
      return false;
    } else {
      let data = new FormData();
      data.append("name", name);
      data.append("email", email);
      data.append("password", password);
      data.append("password_confirmation", password_confirmation);

      request
        .post("/register", data)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-auth">
        <h3>Register</h3>

        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Masukkan Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          label="Password Confirmation"
          name="password_confirmation"
          type={show ? "text" : "password"}
          placeholder="Masukkan Password Konfirmasi"
          value={password_confirmation}
          onChange={(e) => setPassword_confirmation(e.target.value)}
        />
        <p onClick={() => setShow(!show)} className="toggle">
          {show ? "Hide" : "Show"}
        </p>
        <Button
          title="Register"
          onClick={handleSubmit}
          type="submit"
          className="btn-primary"
        />

        <p>
          Sudah memiliki akun,
          <Link to="/">
            <span>Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
