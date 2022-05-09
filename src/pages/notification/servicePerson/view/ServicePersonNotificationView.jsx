import React from "react";
import Container from "@mui/material/Container";
import Card from "../../../../components/card/Card";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useHistory } from "react-router-dom";
import "./ServicePersonNotificationView.css";

const ServicePersonNotificationView = () => {
  const history = useHistory();

  const backHandler = () => {
    history.push("/serviceNotification/list");
  };

  return (
    <Container className="servicePersonNotificationView">
      <div className="main-title">
        <KeyboardBackspaceIcon className="back-icon" onClick={backHandler} />
        <span>Service Person Notification Details</span>
      </div>
      <Card width="768px" margin="0px auto">
        <div className="item">
          <div className="title">
            <FiberManualRecordIcon className="icon" />
            <span>Title</span>
          </div>
          <div className="value">
            <span>Notification title </span>
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
      </Card>
    </Container>
  );
};

export default ServicePersonNotificationView;
