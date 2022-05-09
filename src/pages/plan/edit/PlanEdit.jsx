import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import { useHistory } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./PlanEdit.css";

const PlanEdit = () => {
  const [data, setData] = useState({
    type: "",
  });
  const history = useHistory();

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    history.push("/plan/list");
  };

  const backHandler = () => {
    history.push("/plan/list");
  };

  return (
    <Container className="plan-edit">
      <div className="title">
        <KeyboardBackspaceIcon className="back-icon" onClick={backHandler} />
        <span>Edit Plan</span>
      </div>
      <Card width="768px" margin="0px auto">
        <form className="form">
          <div className="item" style={{ marginRight: "24px" }}>
            <label className="form-label">Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              name="title"
              placeholder="Enter title"
              autoComplete="off"
              onChange={changeHandler}
            />
          </div>
          <div className="item">
            <label className="form-label">Price</label>
            <input
              type="text"
              id="price"
              className="form-control"
              name="price"
              placeholder="Enter price"
              autoComplete="off"
              onChange={changeHandler}
            />
          </div>
          <div className="item" style={{ marginRight: "24px" }}>
            <FormControl sx={{ width: "100%" }}>
              <label className="form-label">Type</label>
              <Select
                input={<InputBase className="select" />}
                displayEmpty
                name="type"
                value={data.type}
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
          </div>
          <div className="item">
            <label className="form-label">Description</label>
            <textarea
              type="text"
              id="description"
              cols="10"
              rows="1"
              className="form-control"
              name="description"
              placeholder="ex:feature1,feature2,..."
              autoComplete="off"
              onChange={changeHandler}
            ></textarea>
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

export default PlanEdit;
