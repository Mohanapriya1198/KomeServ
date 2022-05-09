import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useHistory } from "react-router-dom";
import "./ServicePersonEdit.css";

const ServicePersonEdit = () => {
  const uselocation = useLocation();
  const history = useHistory();
  const [data, setData] = useState({
    profile: "",
    aadharProof: "",
    certificateProof: "",
    serviceType: "",
  });

  const [error, setError] = useState({
    mobileNumber: false,
    pincode: false,
    email: false,
    aadharNumber: false,
  });

  const aadharRegx = /^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/;
  const phoneRegExp = /^(?:(?:\+|0{0,2})91(\s*)?|[0]?)?[789]\d{9}$/;

  const pincodeRegx = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
  const emailRegx =
    /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const {
    name,
    email,
    mobileNumber,
    pincode,
    location,
    profile,
    aadharNumber,
    aadharProof,
    serviceType,
    certificateProof,
  } = uselocation.state;

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
    } else if (name === "aadharNumber") {
      if (aadharRegx.test(value)) {
        setData({ ...data, [name]: value });
        setError({ ...error, [name]: false });
      } else {
        setError({ ...error, [name]: true });
      }
    } else if (name === "profile") {
      setData({ ...data, [name]: files[0] });
      setError({ ...error, [name]: false });
    } else {
      setData({ ...data, [name]: value });
      setError({ ...error, [name]: false });
    }
  };

  const submitHandler = () => {
    console.log(data);
    history.push("/servicePerson/list");
  };

  const backHandler = () => {
    history.push("/servicePerson/list");
  };
  return (
    <Container className="servicePerson-edit">
      <div className="title">
        <KeyboardBackspaceIcon className="back-icon" onClick={backHandler} />
        <span>Edit Service Person</span>
      </div>
      <Card width="768px" margin="0px auto">
        <div className="sub-title">
          <span>Personal Details</span>
        </div>
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
              <label className="form-label">Location</label>
              <input
                type="text"
                id="location"
                className="form-control"
                name="location"
                placeholder={location}
                autoComplete="off"
                onChange={changeHandler}
              />
            </div>
            <div className="item" style={{ marginRight: "24px" }}>
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
          <div className="sub-title">
            <span>Documents</span>
          </div>
          <div className="wrap">
            <div className="item" style={{ marginRight: "24px" }}>
              <label className="form-label">Aadhar Number</label>
              <input
                type="text"
                className={
                  error.aadharNumber ? "invalid-form-control" : "form-control"
                }
                name="aadharNumber"
                placeholder={aadharNumber}
                autoComplete="off"
                onChange={changeHandler}
              />
              {error.aadharNumber && (
                <div className="invalid-msg">
                  Please enter a valid aadhar number
                </div>
              )}
            </div>
            <div className="item">
              <label className="form-label">Aadhar Proof</label>
              <label
                htmlFor="aadharProof"
                className="upload"
                style={{ padding: "10.9px 16px" }}
              >
                Choose File
              </label>
              <input
                placeholder={
                  data.aadharProof ? data.aadharProof.name : aadharProof?.name
                }
                defaultValue=""
                style={{ color: "transparent" }}
                className="form-control"
              />
              <input
                type="file"
                style={{ display: "none" }}
                id="aadharProof"
                className="form-control"
                name="aadharProof"
                onChange={changeHandler}
              />
            </div>
            <div className="item" style={{ marginRight: "24px" }}>
              <FormControl sx={{ width: "100%" }}>
                <label className="form-label">Service Type</label>
                <Select
                  input={<InputBase className="select" />}
                  displayEmpty
                  name="serviceType"
                  value={data.serviceType ? data.serviceType : serviceType}
                  onChange={changeHandler}
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#636c72",
                          }}
                        >
                          Select Option
                        </span>
                      );
                    } else {
                      return (
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#6c757d",
                          }}
                        >
                          {selected}
                        </span>
                      );
                    }
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="" sx={{ fontSize: "14px" }}>
                    Select Option
                  </MenuItem>
                  <MenuItem
                    value="Laptop Service"
                    sx={{ fontSize: "14px", color: "#1a1c23" }}
                  >
                    Laptop Service
                  </MenuItem>
                  <MenuItem
                    value="Laptop Service"
                    sx={{ fontSize: "14px", color: "#1a1c23" }}
                  >
                    Laptop Service
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="item">
              <label className="form-label">Certificate Proof</label>
              <label
                htmlFor="certificateProof"
                className="upload"
                style={{ padding: "10.8px 16px" }}
              >
                Choose File
              </label>
              <input
                placeholder={
                  data.certificateProof
                    ? data.certificateProof.name
                    : certificateProof?.name
                }
                defaultValue=""
                style={{ color: "transparent" }}
                className="form-control"
              />
              <input
                type="file"
                style={{ display: "none" }}
                id="certificateProof"
                className="form-control"
                name="certificateProof"
                onChange={changeHandler}
              />
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

export default ServicePersonEdit;
