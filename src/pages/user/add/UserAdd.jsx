import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SideBarAction } from "../../../redux/sideBar/SideBarSlice";
import AddIcon from "@mui/icons-material/Add";
import { AddUser } from "../../../redux/user/UserAction";
import "./UserAdd.css";

const UserAdd = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [data, setData] = useState({ profile: "" });
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object().shape({
    mobileNumber: Yup.string().matches(phoneRegExp).min(10).max(10),
    pincode: Yup.string().required().min(6).max(6),
    profile: Yup.mixed()
      .required()
      .test("file", "The File is required", (value) => {
        return value[0];
      }),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const submitHandler = (data) => {
    console.log(data);
    dispatch(
      AddUser({
        username: data.mobileNumber,
        first_name: data.name,
        email: data.email,
        pincode: data.pincode,
        image: data.profile[0],
        device_token: "",
        role: "customer",
      })
    );
    dispatch(SideBarAction.addData({ data: "userList", status: true }));
    history.push("/user/list");
  };

  return (
    <Container className="user-add">
      <div className="title">
        <span>Create a new user</span>
      </div>
      <Card width="768px" margin="0px auto">
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

export default UserAdd;
