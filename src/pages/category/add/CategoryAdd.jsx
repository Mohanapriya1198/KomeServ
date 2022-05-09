import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SideBarAction } from "../../../redux/sideBar/SideBarSlice";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";

import {
  AddCategory,
  AddSubCategory,
  FetchCategoryList,
} from "../../../redux/category/CategoryAction";
import "./CategoryAdd.css";

const CategoryAdd = () => {
  const [data, setData] = useState({
    mainImage: "",
    mainName: "",
    subImage: "",
    subName: "",
    mainId: "",
  });
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const mainCategoryList = useSelector((state) => state.category.list);

  useEffect(() => {
    dispatch(FetchCategoryList());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    mainName: Yup.string().required(),
    mainImage: Yup.mixed()
      .required()
      .test("file", "The File is required", (value) => {
        return value[0];
      }),
  });

  const validationSchema2 = Yup.object().shape({
    mainId: Yup.string().required(),
    subName: Yup.string().required(),
    subImage: Yup.mixed()
      .required()
      .test("file", "The File is required", (value) => {
        return value[0];
      }),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const formOptions2 = { resolver: yupResolver(validationSchema2) };
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: formState2,
    reset: reset2,
  } = useForm(formOptions2);
  const { errors: errors2 } = formState2;

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("title", data.mainName);
    formData.append("image", data.mainImage[0]);
    console.log(data);
    dispatch(AddCategory(formData));
    dispatch(SideBarAction.addData({ data: "categoryList", status: true }));
    history.push("/category/list");
  };

  const submitHandler2 = (data) => {
    const formData = new FormData();
    formData.append("title", data.subName);
    formData.append("image", data.subImage[0]);

    dispatch(AddSubCategory(formData, id));
    dispatch(SideBarAction.addData({ data: "categoryList", status: true }));
    history.push("/category/list");
  };

  return (
    <Container className="category-add">
      <div className="title">
        <span>Create a new category</span>
      </div>
      <Card width="768px" margin="0px auto">
        <div className="sub-title">
          <span>Main Category</span>
        </div>
        <form className="form">
          <div className="item" style={{ marginRight: "24px" }}>
            <label className="form-label">Name</label>
            <input
              type="text"
              className={
                errors.mainName ? "invalid-form-control" : "form-control"
              }
              name="mainName"
              placeholder="Enter name"
              autoComplete="off"
              {...register("mainName")}
            />
            {errors.mainName && (
              <div className="invalid-msg">Please enter a name</div>
            )}
          </div>
          <div className="item">
            <label className="form-label">Image</label>
            <label htmlFor="mainImage" className="upload">
              Choose File
            </label>
            <input
              placeholder={
                data.mainImage ? data.mainImage.name : "No file choosen"
              }
              defaultValue=""
              style={{ color: "transparent" }}
              className={
                errors.mainImage ? "invalid-form-control" : "form-control"
              }
            />
            <input
              type="file"
              style={{ display: "none" }}
              id="mainImage"
              className={
                errors.mainImage ? "invalid-form-control" : "form-control"
              }
              name="mainImage"
              {...register("mainImage", {
                onChange: (e) => {
                  const { name, files } = e.target;
                  setData({ ...data, [name]: files[0] });
                },
              })}
            />
            {errors.mainImage && (
              <div className="invalid-msg">Please upload an image</div>
            )}
          </div>
        </form>
        <div className="action">
          <button onClick={handleSubmit(submitHandler)} className="activeBtn">
            Submit
          </button>
        </div>
      </Card>
      <Card width="768px" margin="24px auto">
        <div className="sub-title">
          <span>Sub Category</span>
        </div>
        <form className="form">
          <div className="item" style={{ marginRight: "24px" }}>
            <FormControl sx={{ width: "100%" }}>
              <label className="form-label">Main Category</label>
              <Select
                input={
                  <InputBase
                    className={errors2.mainId ? "error-select" : "select"}
                  />
                }
                displayEmpty
                name="mainId"
                value={data.mainId}
                {...register2("mainId", {
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
                {mainCategoryList?.map((d) => {
                  return (
                    <MenuItem
                      key={d.id}
                      value={d.title}
                      sx={{ fontSize: "14px", color: "#1a1c23" }}
                      onClick={() => setId(d.id)}
                    >
                      {d.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {errors2.mainId && (
              <div className="invalid-msg">Please select a main category</div>
            )}
          </div>
          <div className="item">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={
                errors2.subName ? "invalid-form-control" : "form-control"
              }
              name="subName"
              placeholder="Enter name"
              autoComplete="off"
              {...register2("subName")}
            />
            {errors2.subName && (
              <div className="invalid-msg">Please enter a name</div>
            )}
          </div>
          <div className="item">
            <label className="form-label">Image</label>
            <label htmlFor="subImage" className="upload">
              Choose File
            </label>
            <input
              placeholder={
                data.subImage ? data.subImage.name : "No file choosen"
              }
              defaultValue=""
              style={{ color: "transparent" }}
              className={
                errors2.subImage ? "invalid-form-control" : "form-control"
              }
            />
            <input
              type="file"
              style={{ display: "none" }}
              id="subImage"
              className={
                errors2.subImage ? "invalid-form-control" : "form-control"
              }
              name="subImage"
              {...register2("subImage", {
                onChange: (e) => {
                  const { name, files } = e.target;
                  setData({ ...data, [name]: files[0] });
                },
              })}
            />
            {errors2.subImage && (
              <div className="invalid-msg">Please upload an image</div>
            )}
          </div>
        </form>
        <div className="action">
          <button onClick={handleSubmit2(submitHandler2)} className="activeBtn">
            Submit
          </button>
        </div>
      </Card>
    </Container>
  );
};

export default CategoryAdd;
