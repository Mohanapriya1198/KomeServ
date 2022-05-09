import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SideBarAction } from "../../../redux/sideBar/SideBarSlice";
import "./ServicePersonAdd.css";

const ServicePersonAdd = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState({
    profile: "",
    aadharProof: "",
    certificateProof: "",
    serviceType: "",
  });

  console.log(data.profile);

  const aadharRegx = /^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/;
  const phoneRegExp = /^(?:(?:\+|0{0,2})91(\s*)?|[0]?)?[789]\d{9}$/;

  const validationSchema = Yup.object().shape({
    mobileNumber: Yup.string().matches(phoneRegExp).min(10).max(10),
    email: Yup.string().email(),
    pincode: Yup.string().required().min(6).max(6),
    password: Yup.string().required(),
    location: Yup.string().required(),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Password must match"),
    profile: Yup.mixed()
      .required()
      .test("file", "The File is required", (value) => {
        return value[0];
      }),
    aadharProof: Yup.mixed()
      .required()
      .test("file", "The File is required", (value) => {
        return value[0];
      }),
    certificateProof: Yup.mixed()
      .required()
      .test("file", "The File is required", (value) => {
        return value[0];
      }),
    aadharNumber: Yup.string().required().matches(aadharRegx),
    serviceType: Yup.string().required(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  console.log(errors);

  const submitHandler = (data) => {
    console.log(data);
    reset();
    dispatch(SideBarAction.addData({ data: "serviceList", status: true }));
    history.push("/servicePerson/list");
  };
  return (
    <Container className="servicePerson-add">
      <div className="title">
        <span>Create a new service person</span>
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
                  ? data.profile
                  : "https://i.stack.imgur.com/l60Hf.png"
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
              {...register("profile", {
                onChange: (e) => {
                  const { name, files } = e.target;
                  setData({ ...data, [name]: URL.createObjectURL(files[0]) });
                },
              })}
            />
          </div>
          {errors.profile && (
            <div className="invalid-msg" style={{ textAlign: "center" }}>
              Please upload a profile
            </div>
          )}
        </div>
        <form className="form">
          <div className="wrap">
            <div className="item" style={{ marginRight: "24px" }}>
              <label className="form-label">Name</label>
              <input
                type="text"
                id="name"
                className={
                  errors.name ? "invalid-form-control" : "form-control"
                }
                name="name"
                placeholder="Enter name"
                autoComplete="off"
                {...register("name")}
              />
            </div>
            <div className="item">
              <label className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className={
                  errors.email ? "invalid-form-control" : "form-control"
                }
                name="email"
                placeholder="Enter email"
                autoComplete="off"
                {...register("email")}
              />
              {errors.email && (
                <div className="invalid-msg">Please enter a email</div>
              )}
            </div>
            <div className="item" style={{ marginRight: "24px" }}>
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                id="mobileNumber"
                className={
                  errors.mobileNumber ? "invalid-form-control" : "form-control"
                }
                name="mobileNumber"
                placeholder="Enter mobile number"
                autoComplete="off"
                {...register("mobileNumber")}
              />
              {errors.mobileNumber && (
                <div className="invalid-msg">Please enter a mobile number</div>
              )}
            </div>
            <div className="item">
              <label className="form-label">Location</label>
              <input
                type="text"
                id="location"
                className={
                  errors.location ? "invalid-form-control" : "form-control"
                }
                name="location"
                placeholder="Enter location"
                autoComplete="off"
                {...register("location")}
              />
              {errors.location && (
                <div className="invalid-msg">Please enter a location</div>
              )}
            </div>
            <div className="item" style={{ marginRight: "24px" }}>
              <label className="form-label">Pincode</label>
              <input
                type="text"
                id="pincode"
                className={
                  errors.pincode ? "invalid-form-control" : "form-control"
                }
                name="pincode"
                placeholder="Enter pincode"
                autoComplete="off"
                {...register("pincode")}
              />
              {errors.pincode && (
                <div className="invalid-msg">Please enter a pincode</div>
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
                  errors.aadharNumber ? "invalid-form-control" : "form-control"
                }
                name="aadharNumber"
                placeholder="Enter aadhar number"
                autoComplete="off"
                {...register("aadharNumber")}
              />
              {errors.aadharNumber && (
                <div className="invalid-msg">Please enter an aadhar number</div>
              )}
            </div>
            <div className="item">
              <label className="form-label">Aadhar Proof</label>
              <label htmlFor="aadharProof" className="upload">
                Choose File
              </label>
              <input
                placeholder={
                  data.aadharProof ? data.aadharProof.name : "No file choosen"
                }
                defaultValue=""
                style={{ color: "transparent" }}
                className={
                  errors.aadharProof ? "invalid-form-control" : "form-control"
                }
              />
              <input
                type="file"
                style={{ display: "none" }}
                id="aadharProof"
                className={
                  errors.aadharProof ? "invalid-form-control" : "form-control"
                }
                name="aadharProof"
                {...register("aadharProof", {
                  onChange: (e) => {
                    const { name, files } = e.target;
                    setData({ ...data, [name]: files[0] });
                  },
                })}
              />
              {errors.aadharProof && (
                <div className="invalid-msg">Please upload an aadhar proof</div>
              )}
            </div>
            <div className="item" style={{ marginRight: "24px" }}>
              <FormControl sx={{ width: "100%" }}>
                <label className="form-label">Service Type</label>
                <Select
                  input={
                    <InputBase
                      className={errors.serviceType ? "error-select" : "select"}
                    />
                  }
                  displayEmpty
                  name="serviceType"
                  value={data.serviceType}
                  {...register("serviceType", {
                    onChange: (e) => {
                      const { name, value } = e.target;
                      setData({ ...data, [name]: value });
                    },
                  })}
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
              {errors.serviceType && (
                <div className="invalid-msg">Please select a service type</div>
              )}
            </div>
            <div className="item">
              <label className="form-label">Certificate Proof</label>
              <label htmlFor="certificateProof" className="upload">
                Choose File
              </label>
              <input
                placeholder={
                  data.certificateProof
                    ? data.certificateProof.name
                    : "No file choosen"
                }
                defaultValue=""
                style={{ color: "transparent" }}
                className={
                  errors.certificateProof
                    ? "invalid-form-control"
                    : "form-control"
                }
              />
              <input
                type="file"
                style={{ display: "none" }}
                id="certificateProof"
                className={
                  errors.certificateProof
                    ? "invalid-form-control"
                    : "form-control"
                }
                name="certificateProof"
                {...register("certificateProof", {
                  onChange: (e) => {
                    const { name, files } = e.target;
                    setData({ ...data, [name]: files[0] });
                  },
                })}
              />
              {errors.certificateProof && (
                <div className="invalid-msg">
                  Please upload a certificate proof
                </div>
              )}
            </div>
          </div>
        </form>
        <div className="action">
          <button onClick={handleSubmit(submitHandler)} className="activeBtn">
            Submit
          </button>
        </div>
      </Card>
    </Container>
  );
};

export default ServicePersonAdd;
