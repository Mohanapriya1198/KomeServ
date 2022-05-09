import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useLocation, useHistory } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import "./UserEdit.css";

const UserEdit = () => {
  const location = useLocation();
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    pincode: "",
    profile: "",
  });

  const [error, setError] = useState({
    mobileNumber: false,
    pincode: false,
    email: false,
  });

  const phoneRegExp = /^(?:(?:\+|0{0,2})91(\s*)?|[0]?)?[789]\d{9}$/;

  const pincodeRegx = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
  const emailRegx =
    /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const { name, email, mobileNumber, pincode } = location.state;

  const changeHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === "mobileNumber") {
      if (phoneRegExp.test(value)) {
        setData({ ...data, [name]: value });
        setError({ ...error, [name]: false });
      } else {
        setError({ ...error, [name]: true });
      }
    } else if (name === "email") {
      if (emailRegx.test(value)) {
        setData({ ...data, [name]: value });
        setError({ ...error, [name]: false });
      } else {
        setError({ ...error, [name]: true });
      }
    } else if (name === "pincode") {
      if (pincodeRegx.test(value)) {
        setData({ ...data, [name]: value });
        setError({ ...error, [name]: false });
      } else {
        setError({ ...error, [name]: true });
      }
    } else if (name === "profile") {
      setData({ ...data, [name]: files[0] });
      setError({ ...error, [name]: false });
    } else if (value) {
      setData({ ...data, [name]: value });
    }
  };

  const submitHandler = () => {
    console.log(data);
    history.push("/user/list");
  };

  const backHandler = () => {
    history.push("/user/list");
  };
  return (
    <Container className="user-edit">
      <div className="title">
        <KeyboardBackspaceIcon className="back-icon" onClick={backHandler} />
        <span>Edit User</span>
      </div>
      <Card width="768px" margin="0px auto">
        <div className="profile">
          <div className="profile-item">
            <img
              src={
                data.profile
                  ? URL.createObjectURL(data.profile)
                  : "https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg"
              }
              alt="profilePic"
              className="img"
            />
            <label htmlFor="add-icon" className="label-icon">
              <div className="add">
                <AddIcon className="icon" />
              </div>
            </label>

            <input
              type="file"
              id="add-icon"
              name="profile"
              style={{ display: "none" }}
              onChange={changeHandler}
            />
          </div>
        </div>
        <form className="form">
          <div className="wrap">
            <div className="item" style={{ marginRight: "24px" }}>
              <label className="form-label">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                name="name"
                placeholder={name}
                autoComplete="off"
                onChange={changeHandler}
              />
            </div>
            <div className="item">
              <label className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className={
                  error.email ? "invalid-form-control" : "form-control"
                }
                name="email"
                placeholder={email}
                autoComplete="off"
                onChange={changeHandler}
              />
              {error.email && (
                <div className="invalid-msg">Please enter a valid email</div>
              )}
            </div>
            <div className="item" style={{ marginRight: "24px" }}>
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                id="mobileNumber"
                className={
                  error.mobileNumber ? "invalid-form-control" : "form-control"
                }
                name="mobileNumber"
                placeholder={mobileNumber}
                autoComplete="off"
                onChange={changeHandler}
              />
              {error.mobileNumber && (
                <div className="invalid-msg">
                  Please enter a valid mobile number
                </div>
              )}
            </div>
            <div className="item">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                id="pincode"
                className={
                  error.pincode ? "invalid-form-control" : "form-control"
                }
                name="pincode"
                placeholder={pincode}
                autoComplete="off"
                onChange={changeHandler}
              />
              {error.pincode && (
                <div className="invalid-msg">Please enter a valid pincode</div>
              )}
            </div>
          </div>
        </form>
        <div className="action">
          <button onClick={submitHandler} className="activeBtn">
            Submit
          </button>
        </div>
      </Card>
    </Container>
  );
};

export default UserEdit;
