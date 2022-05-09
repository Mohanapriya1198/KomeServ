import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import { useHistory, useLocation } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddIcon from "@mui/icons-material/Add";
import "./BannerEdit.css";

const BannerEdit = () => {
  const location = useLocation();
  const { image, type } = location.state;
  console.log(location);
  const [data, setData] = useState({
    bannerType: "",
    bannerImage: "",
  });

  const history = useHistory();

  const changeHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === "bannerImage") {
      setData({ ...data, [name]: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    history.push("/banner/list");
  };

  const backHandler = () => {
    history.push("/banner/list");
  };
  return (
    <Container className="banner-edit">
      <div className="title">
        <KeyboardBackspaceIcon className="back-icon" onClick={backHandler} />
        <span>Edit Banner</span>
      </div>
      <Card width="768px" margin="0px auto">
        <form className="form">
          <div className="banner-item">
            <img
              src={
                data.bannerImage
                  ? URL.createObjectURL(data.bannerImage)
                  : image
                  ? image
                  : ""
              }
              alt="banner"
              className="img"
            />
            <div className="icon">
              <label htmlFor="add-icon" className="label-icon">
                <div className="add">
                  <AddIcon className="icon" />
                </div>
              </label>

              <input
                type="file"
                id="add-icon"
                name="bannerImage"
                style={{ display: "none" }}
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="item">
            <FormControl sx={{ width: "100%" }}>
              <label className="form-label">Banner Type</label>
              <Select
                input={<InputBase className="select" />}
                displayEmpty
                name="bannerType"
                value={data.bannerType || type}
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

export default BannerEdit;
