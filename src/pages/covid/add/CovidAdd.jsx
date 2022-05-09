import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SideBarAction } from "../../../redux/sideBar/SideBarSlice";
import "./CovidAdd.css";

const CovidAdd = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState({
    image: "",
  });
  const validationSchema = Yup.object().shape({
    image: Yup.mixed()
      .required()
      .test("file", "The File is required", (value) => {
        return value[0];
      }),
    title: Yup.string().required(),
    description: Yup.string().required(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const submitHandler = (data) => {
    console.log(data);
    reset();
    dispatch(SideBarAction.addData({ data: "covidList", status: true }));
    history.push("/covid/list");
  };

  return (
    <Container className="covid-add">
      <div className="title">
        <span>Create a new covid measures</span>
      </div>
      <Card width="768px" margin="0px auto">
        <form className="form">
          <div className="item" style={{ marginRight: "24px" }}>
            <label className="form-label">Image</label>
            <label htmlFor="image" className="upload">
              Choose File
            </label>
            <input
              placeholder={data.image ? data.image.name : "No file choosen"}
              defaultValue=""
              style={{ color: "transparent" }}
              className={errors.image ? "invalid-form-control" : "form-control"}
            />
            <input
              type="file"
              style={{ display: "none" }}
              id="image"
              className={errors.image ? "invalid-form-control" : "form-control"}
              name="image"
              {...register("image", {
                onChange: (e) => {
                  const { name, files } = e.target;
                  setData({ ...data, [name]: files[0] });
                },
              })}
            />
            {errors.image && (
              <div className="invalid-msg">Please upload an image</div>
            )}
          </div>
          <div className="item">
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

export default CovidAdd;
