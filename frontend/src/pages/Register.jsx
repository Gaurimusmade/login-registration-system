import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../handleHttp/Api";
import "../pages.css";
import logo from "../assets/user-logo.png";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await register(user, setUser);
      navigate("/table");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="page">
        <div className="form">
          <div className="login-header">
            <h3>Registration</h3>
          </div>
          <img src={logo} />
          <form className="main-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              placeholder="UserName"
            />
            <input
              type="text"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              placeholder="email"
            />
            <input
              type="date"
              id="dob"
              name="dob"
              value={user.dob}
              onChange={handleChange}
              required
              placeholder="DOB"
            />
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              placeholder="password"
            />
            <button>register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
