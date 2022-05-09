import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "../../../../components/card/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SideBarAction } from "../../../../redux/sideBar/SideBarSlice";
import "./ServicePersonNotificationAdd.css";

const ServicePersonNotificationAdd = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setformData] = useState({ type: "" });

  const validationSchema = Yup.object().shape({
    type: Yup.string().required(),
    title: Yup.string().required(),
    description: Yup.string().required(),
    servicePersonId: Yup.string().when("type", {
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
      SideBarAction.addData({ data: "serviceNotificationList", status: true })
    );
    history.push("/serviceNotification/list");
  };

  return (
    <Container className="servicePersonNotificationAdd">
      <div className="title">
        <span>Create a new service person notification</span>
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
                <label className="form-label">Service Person Id</label>
                <input
                  type="text"
                  id="servicePersonId"
                  className={
                    errors.servicePersonId
                      ? "invalid-form-control"
                      : "form-control"
                  }
                  name="servicePersonId"
                  placeholder="Enter user id"
                  {...register("servicePersonId")}
                />
                {errors.servicePersonId && (
                  <div className="invalid-msg">
                    Please enter a service person Id
                  </div>
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

export default ServicePersonNotificationAdd;
