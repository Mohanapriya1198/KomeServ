import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "../../../../components/card/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SideBarAction } from "../../../../redux/sideBar/SideBarSlice";
import "./ScheduleAdd.css";

const ScheduleAdd = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setformData] = useState({ type: "" });

  const validationSchema = Yup.object().shape({
    type: Yup.string().required(),
    title: Yup.string().required(),
    description: Yup.string().required(),
    dateTime: Yup.string().required(),
    id: Yup.string().when("type", {
      is: "individual",
      then: Yup.string().required(),
    }),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  function convertDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

    var mmChars = mm.split("");
    var ddChars = dd.split("");

    return (
      yyyy +
      "-" +
      (mmChars[1] ? mm : "0" + mmChars[0]) +
      "-" +
      (ddChars[1] ? dd : "0" + ddChars[0])
    );
  }

  const submitHandler = (data) => {
    const df = new Date(data.dateTime);
    var time = df.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const date = convertDate(df);
    console.log({ date, time });
    reset();
    dispatch(
      SideBarAction.addData({ data: "scheduleNotificationList", status: true })
    );
    history.push("/scheduleNotification/list");
  };

  return (
    <Container className="scheduleAdd">
      <div className="title">
        <span>Create a new schedule notification</span>
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
              <div className="item" style={{ marginRight: "24px" }}>
                <label className="form-label">Date and Time</label>
                <input
                  type="datetime-local"
                  id="dateTime"
                  className={
                    errors.dateTime ? "invalid-form-control" : "form-control"
                  }
                  name="dateTime"
                  placeholder="Enter date and time"
                  {...register("dateTime")}
                />
                {errors.dateTime && (
                  <div className="invalid-msg">
                    Please select a date and time
                  </div>
                )}
              </div>
            </div>
          )}

          {formData.type === "individual" && (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div className="item" style={{ marginRight: "24px" }}>
                <label className="form-label">Id</label>
                <input
                  type="text"
                  id="id"
                  className={
                    errors.id ? "invalid-form-control" : "form-control"
                  }
                  name="id"
                  placeholder="Enter id"
                  {...register("id")}
                />
                {errors.id && (
                  <div className="invalid-msg">Please enter an id</div>
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
              <div className="item" style={{ marginRight: "24px" }}>
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
              <div className="item">
                <label className="form-label">Date and Time</label>
                <input
                  type="datetime-local"
                  id="dateTime"
                  className={
                    errors.dateTime ? "invalid-form-control" : "form-control"
                  }
                  name="dateTime"
                  placeholder="Enter date and time"
                  {...register("dateTime")}
                />
                {errors.dateTime && (
                  <div className="invalid-msg">
                    Please select a date and time
                  </div>
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

export default ScheduleAdd;
