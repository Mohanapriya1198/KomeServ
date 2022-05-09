import React from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useLocation, useHistory } from "react-router-dom";
import "./PlanView.css";

const PlanView = () => {
  const location = useLocation();
  const history = useHistory();
  const { title, price, planType, description } = location.state;

  const backHandler = () => {
    history.push("/user/list");
  };
  return (
    <Container className="plan-view">
      <div className="main-title">
        <KeyboardBackspaceIcon className="back-icon" onClick={backHandler} />
        <span>Plan Details</span>
      </div>
      <Card width="768px" margin="0px auto">
        <div className="item">
          <div className="title">
            <FiberManualRecordIcon className="icon" />
            <span>Title</span>
          </div>
          <div className="value">
            <span>{title} </span>
          </div>
        </div>
        <div className="item">
          <div className="title">
            <FiberManualRecordIcon className="icon" />
            <span>Price</span>
          </div>
          <div className="value">
            <span>₹{price} </span>
          </div>
        </div>
        <div className="item">
          <div className="title">
            <FiberManualRecordIcon className="icon" />
            <span>Type</span>
          </div>
          <div className="value">
            <span>{planType} </span>
          </div>
        </div>
        <div className="item" style={{ margin: "0px" }}>
          <div className="title">
            <FiberManualRecordIcon className="icon" />
            <span>Status</span>
          </div>
          <div className="value">
            <span>Enabled</span>
          </div>
        </div>
      </Card>

      <Card width="768px" margin="24px auto">
        <div className="sub-title">
          <span>Features</span>
        </div>
        <div className="item">
          <div
            className="title"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {description.map((d) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "350px",
                    marginBottom: "15px",
                  }}
                >
                  <FiberManualRecordIcon className="icon" />
                  <span>{d}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default PlanView;
