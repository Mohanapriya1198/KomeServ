import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { useHistory } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const history = useHistory();
  const [data, setData] = useState({});
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const [formValid, setformValid] = useState({
    email: false,
    password: false,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        setData({ ...data, [name]: value });
        setError({ ...error, email: false });
        setformValid({ ...formValid, email: true });
      } else {
        setError({ ...error, email: true });
        setformValid({ ...formValid, email: false });
      }
    } else {
      if (value.length > 8) {
        setData({ ...data, [name]: value });
        setError({ ...error, password: false });
        setformValid({ ...formValid, password: true });
      } else {
        setError({ ...error, password: true });
        setformValid({ ...formValid, password: false });
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formValid.email && !formValid.password) {
      setError({ ...error, email: true, password: true });
    } else if (!formValid.email) {
      setError({ ...error, email: true });
    } else if (!formValid.password) {
      setError({ ...error, password: true });
    }

    if (formValid.email && formValid.password) {
      localStorage.setItem("data", JSON.stringify(data));
      history.push("/");
    }
  };

  return (
    <Container className="signIn">
      <Card className="card">
        <div className="signin-logo">Kome Serv</div>
        <p className="title">Please enter your user information.</p>
        <form onSubmit={submitHandler} className="form">
          <div className="item">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={error.email ? "invalid-form-control" : "form-control"}
              name="email"
              placeholder="Email address "
              autoComplete="off"
              onChange={changeHandler}
            />
            {error.email && (
              <div className="invalid-msg">
                Please enter a valid email address
              </div>
            )}
          </div>

          <div className="item" style={{ marginBottom: "24px" }}>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={
                error.password ? "invalid-form-control" : "form-control"
              }
              name="password"
              placeholder="Password"
              autoComplete="off"
              onChange={changeHandler}
            />
            {error.password && (
              <div className="invalid-msg">Please enter a valid password</div>
            )}
          </div>

          <button type="submit" className="btn">
            Sign in
          </button>
        </form>
      </Card>
    </Container>
  );
};

export default SignIn;
