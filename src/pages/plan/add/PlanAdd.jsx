import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SideBarAction } from "../../../redux/sideBar/SideBarSlice";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import "./PlanAdd.css";

const PlanAdd = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState({
    type: "",
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    price: Yup.string().required(),
    type: Yup.string().required(),
    description: Yup.string().required(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const submitHandler = (data) => {
    console.log(data);
    reset();
    dispatch(SideBarAction.addData({ data: "planList", status: true }));
    history.push("/plan/list");
  };

  return (
    <Container className="plan-add">
      <div className="title">
        <span>Create a new plan</span>
      </div>
      <Card width="768px" margin="0px auto">
        <form className="form">
          <div className="item" style={{ marginRight: "24px" }}>
            <label className="form-label">Title</label>
            <input
              type="text"
              id="title"
              className={errors.title ? "invalid-form-control" : "form-control"}
              name="title"
              placeholder="Enter title"
              autoComplete="off"
              {...register("title")}
            />
            {errors.title && (
              <div className="invalid-msg">Please enter a title</div>
            )}
          </div>
          <div className="item">
            <label className="form-label">Price</label>
            <input
              type="text"
              id="price"
              className={errors.price ? "invalid-form-control" : "form-control"}
              name="price"
              placeholder="Enter price"
              autoComplete="off"
              {...register("price")}
            />
            {errors.price && (
              <div className="invalid-msg">Please enter a price</div>
            )}
          </div>
          <div className="item" style={{ marginRight: "24px" }}>
            <FormControl sx={{ width: "100%" }}>
              <label className="form-label">Type</label>
              <Select
                input={
                  <InputBase
                    className={errors.type ? "error-select" : "select"}
                  />
                }
                displayEmpty
                name="type"
                value={data.type}
                {...register("type", {
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
                  value="Free"
                  sx={{ fontSize: "14px", color: "#1a1c23" }}
                >
                  Free
                </MenuItem>
                <MenuItem
                  value="Month"
                  sx={{ fontSize: "14px", color: "#1a1c23" }}
                >
                  Month
                </MenuItem>
                <MenuItem
                  value="Year"
                  sx={{ fontSize: "14px", color: "#1a1c23" }}
                >
                  Year
                </MenuItem>
              </Select>
            </FormControl>
            {errors.type && (
              <div className="invalid-msg">Please select a type</div>
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
              placeholder="ex:feature1,feature2,..."
              autoComplete="off"
              {...register("description")}
            ></textarea>
            {errors.description && (
              <div className="invalid-msg">Please enter a description</div>
            )}
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

export default PlanAdd;
