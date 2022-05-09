import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "../../../../components/card/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SideBarAction } from "../../../../redux/sideBar/SideBarSlice";
import "./UserNotificationAdd.css";

const UserNotificationAdd = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setformData] = useState({ type: "" });

  const validationSchema = Yup.object().shape({
    type: Yup.string().required(),
    title: Yup.string().required(),
    description: Yup.string().required(),
    userId: Yup.string().when("type", {
      is: "individual",
      then: Yup.string().required(),
    }),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const submitHandler = (data) => {
    console.log(data);
    reset();
    dispatch(
      SideBarAction.addData({ data: "userNotificationList", status: true })
    );
    history.push("/userNotification/list");
  };

  return (
    <Container className="userNotificationAdd">
      <div className="title">
        <span>Create a new user notification</span>
      </div>
      <Card width="768px" margin="0px auto">
        <form className="form">
          <div className="item">
            <label className="form-label">Select an option</label>
            <div className="radio">
              <input
                type="radio"
                id="all"
                name="all"
                value={formData.type === "all" ? formData.type : "all"}
                checked={formData.type === "all"}
                className={errors.type ? "error-radio" : "radio-input"}
                {...register("type", {
                  onChange: (e) => {
                    const { value } = e.target;

                    setformData({
                      ...formData,
                      type: value,
                    });
                  },
                })}
              />
              <label htmlFor="all" className="form-label" style={{ margin: 0 }}>
                All
              </label>
            </div>
            <div className="radio">
              <input
                type="radio"
                id="individual"
                name="individual"
                value={
                  formData.type === "individual" ? formData.type : "individual"
                }
                checked={formData.type === "individual"}
                className={errors.type ? "error-radio" : "radio-input"}
                {...register("type", {
                  onChange: (e) => {
                    const { value } = e.target;
                    setformData({
                      ...formData,
                      type: value,
                    });
                  },
                })}
              />
              <label
                htmlFor="individual"
                className="form-label"
                style={{ margin: 0 }}
              >
                Individual
              </label>
            </div>
          </div>
          {formData.type === "all" && (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div className="item" style={{ marginRight: "24px" }}>
                <label className="form-label">Title</label>
                <input
                  type="text"
                  id="title"
                  className={
                    errors.title ? "invalid-form-control" : "form-control"
                  }
                  name="title"
                  placeholder="Enter title"
                  {...register("title")}
                />
                {errors.title && (
                  <div className="invalid-msg">Please enter a title</div>
                )}
              </div>
              <div className="item">
                <label className="form-label">Description</label>
                <textarea
                  type="text"
                  id="description"
                  cols="10"
                  rows="1"
                  className={
                    errors.description ? "invalid-form-control" : "form-control"
                  }
                  name="description"
                  placeholder="Enter description"
                  autoComplete="off"
                  {...register("description")}
                ></textarea>
                {errors.description && (
                  <div className="invalid-msg">Please enter a description</div>
                )}
              </div>
            </div>
          )}

          {formData.type === "individual" && (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div className="item" style={{ marginRight: "24px" }}>
                <label className="form-label">User Id</label>
                <input
                  type="text"
                  id="userId"
                  className={
                    errors.userId ? "invalid-form-control" : "form-control"
                  }
                  name="userId"
                  placeholder="Enter user id"
                  {...register("userId")}
                />
                {errors.userId && (
                  <div className="invalid-msg">Please enter a user Id</div>
                )}
              </div>
              <div className="item">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  id="title"
                  className={
                    errors.title ? "invalid-form-control" : "form-control"
                  }
                  name="title"
                  placeholder="Enter title"
                  {...register("title")}
                />
                {errors.title && (
                  <div className="invalid-msg">Please enter a title</div>
                )}
              </div>
              <div className="item">
                <label className="form-label">Description</label>
                <textarea
                  type="text"
                  id="description"
                  cols="10"
                  rows="1"
                  className={
                    errors.description ? "invalid-form-control" : "form-control"
                  }
                  name="description"
                  placeholder="Enter description"
                  autoComplete="off"
                  {...register("description")}
                ></textarea>
                {errors.description && (
                  <div className="invalid-msg">Please enter a description</div>
                )}
              </div>
            </div>
          )}
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

export default UserNotificationAdd;
