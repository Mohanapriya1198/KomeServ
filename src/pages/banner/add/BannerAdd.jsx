import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { SideBarAction } from "../../../redux/sideBar/SideBarSlice";
import "./BannerAdd.css";

const BannerAdd = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState({
    bannerImage: "",
    bannerType: "",
  });
  const validationSchema = Yup.object().shape({
    bannerImage: Yup.mixed()
      .required()
      .test("file", "The File is required", (value) => {
        return value[0];
      }),
    bannerType: Yup.string().required(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const submitHandler = (data) => {
    console.log(data);
    reset();
    dispatch(SideBarAction.addData({ data: "bannerList", status: true }));
    history.push("/banner/list");
  };

  return (
    <Container className="banner-add">
      <div className="title">
        <span>Create a new banner</span>
      </div>
      <Card width="768px" margin="0px auto">
        <form className="form">
          <div className="item" style={{ marginRight: "24px" }}>
            <label className="form-label">Banner Image</label>
            <label htmlFor="bannerImage" className="upload">
              Choose File
            </label>
            <input
              placeholder={
                data.bannerImage ? data.bannerImage.name : "No file choosen"
              }
              defaultValue=""
              style={{ color: "transparent" }}
              className={
                errors.bannerImage ? "invalid-form-control" : "form-control"
              }
            />
            <input
              type="file"
              style={{ display: "none" }}
              id="bannerImage"
              className={
                errors.bannerImage ? "invalid-form-control" : "form-control"
              }
              name="bannerImage"
              {...register("bannerImage", {
                onChange: (e) => {
                  const { name, files } = e.target;
                  setData({ ...data, [name]: files[0] });
                },
              })}
            />
            {errors.bannerImage && (
              <div className="invalid-msg">Please upload a banner image</div>
            )}
          </div>

          <div className="item">
            <FormControl sx={{ width: "100%" }}>
              <label className="form-label">Banner Type</label>
              <Select
                input={
                  <InputBase
                    className={errors.bannerType ? "error-select" : "select"}
                  />
                }
                displayEmpty
                name="bannerType"
                value={data.bannerType}
                {...register("bannerType", {
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
                  value="Main Banner"
                  sx={{ fontSize: "14px", color: "#1a1c23" }}
                >
                  Main Banner
                </MenuItem>
                <MenuItem
                  value="Secondary Banner"
                  sx={{ fontSize: "14px", color: "#1a1c23" }}
                >
                  Secondary Banner
                </MenuItem>
                <MenuItem
                  value="Popup Banner"
                  sx={{ fontSize: "14px", color: "#1a1c23" }}
                >
                  Popup Banner
                </MenuItem>
                <MenuItem
                  value="Covid Banner"
                  sx={{ fontSize: "14px", color: "#1a1c23" }}
                >
                  Covid Banner
                </MenuItem>
              </Select>
            </FormControl>
            {errors.bannerType && (
              <div className="invalid-msg">Please select a banner type</div>
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

export default BannerAdd;
