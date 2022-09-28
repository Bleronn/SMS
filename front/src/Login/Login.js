import React, { useState } from "react";
import "./login.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { AiOutlineBgColors } from "react-icons/ai";

const Login = (props) => {
  
  const [input, setInput] = useState({});

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:63717/api/Account/Login", {
        ...input,
      });

      localStorage.setItem("sms_token", res.data.token);
      history.push("/dashboard");
      window.location.reload()
    } catch (err) {
      alert("Incorrect email/passsword");
    }
  };

  return (
    <div className="div-login">
      <div className="sbs">
        <form onSubmit={handleSubmit}>
          
          <div class="email">
            <input
              type="email"
              name="email"
              placeholder="Shënoni Email-in..."
              required
              onChange={handleChange}
            />
          </div>
          <div class="password">
            <input
              type="password"
              name="password"
              placeholder="Shënoni Password-in..."
              required
              onChange={handleChange}
            />
          </div>
          <div class="buttons">
            <Link to="/register">
              <button class="registerButton"> Regjistrohu </button>
            </Link>
            <button class="loginButton" onSubmit={handleSubmit}>
              Kyquni
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
