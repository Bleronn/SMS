import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./login.css";
import { Redirect } from "react-router-dom";

const Register = () => {
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    this.props.isLogin(true);
  };

  return (
    <div className="div-login">
      <div>{/* <img src={Logo} alt="Logo" />; */}</div>
      <div>
        <form onSubmit={handleSubmit}>
          <label class="idjaMiresevini">
            Mirësevini
            <br />
          </label>
          <label class="idja2Miresevini">
            Shënoni të dhënat tuaja për tu kyqur në llogari
          </label>
          <div class="email">
            <input
              type="email"
              name="email"
              placeholder="Type your email..."
              required
              value={}
              onChange={handleChange}
            />
          </div>
          <div class="password">
            <input
              type="password"
              name="pwd"
              placeholder="Type your password..."
              required
              value={}
              onChange={handleChange}
            />
          </div>
          <div class="email">
            <input
              type="email"
              name="email"
              placeholder="Type your email..."
              required
              value={}
              onChange={handleChange}
            />
          </div>
          <div class="password">
            <input
              type="password"
              name="pwd"
              placeholder="Type your password..."
              required
              value={}
              onChange={handleChange}
            />
          </div>
          <div class="button1">
            <button onSubmit={handleSubmit}>Log In</button>
          </div>
        </form>

        <button onClick={() => nextPath("../Login/Login.js")}>Register</button>
      </div>
    </div>
  );
};
export default Register;
