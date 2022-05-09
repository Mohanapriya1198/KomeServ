import React from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useHistory } from "react-router-dom";
import "./CovidView.css";

const CovidView = () => {
  const history = useHistory();

  const backHandler = () => {
    history.push("/covid/list");
  };

  return (
    <Container className="covid-view">
      <div className="main-title">
        <KeyboardBackspaceIcon className="back-icon" onClick={backHandler} />
        <span>Covid Measures Details</span>
      </div>
      <Card width="768px" margin="0px auto">
        <div className="align">
          <div className="img-item">
            <img
              src="https://www.ruralhealthinfo.org/assets/4049-17150/covid-vaccination-fb.jpg"
              alt="banner"
            />
          </div>
          <div className="items">
            <div className="item">
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Id</span>
              </div>
              <div className="value">
                <span>12344</span>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Title</span>
              </div>
              <div className="value">
                <span>Vaccinated Professionals</span>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Description</span>
              </div>
              <div className="value">
                <span>
                  Professionals service with vaccinated service men vaccinated
                  professionals follows covid rules.
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default CovidView;
