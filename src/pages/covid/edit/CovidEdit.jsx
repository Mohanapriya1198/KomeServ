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
import "./CovidEdit.css";

const CovidEdit = () => {
  const location = useLocation();
  const { img, title, description } = location.state;
  console.log(location);
  const [data, setData] = useState({
    image: "",
  });

  const history = useHistory();

  const changeHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setData({ ...data, [name]: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    history.push("/covid/list");
  };

  const backHandler = () => {
    history.push("/covid/list");
  };
  return (
    <Container className="covid-edit">
      <div className="title">
        <KeyboardBackspaceIcon className="back-icon" onClick={backHandler} />
        <span>Edit Banner</span>
      </div>
      <Card width="768px" margin="0px auto">
        <form className="form">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="banner-item">
              <img
                src={
                  data.image ? URL.createObjectURL(data.image) : img ? img : ""
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
                  name="image"
                  style={{ display: "none" }}
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "24px" }}>
            <div className="item" style={{ marginRight: "24px" }}>
              <label className="form-label">Title</label>
              <input
                type="text"
                id="title"
                className={false ? "invalid-form-control" : "form-control"}
                name="title"
                placeholder={title}
                autoComplete="off"
                onChange={changeHandler}
              />
            </div>
            <div className="item">
              <label className="form-label">Description</label>
              <textarea
                type="text"
                id="description"
                cols="10"
                rows="1"
                className={false ? "invalid-form-control" : "form-control"}
                name="description"
                placeholder={description}
                autoComplete="off"
                onChange={changeHandler}
              ></textarea>
            </div>
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

export default CovidEdit;
