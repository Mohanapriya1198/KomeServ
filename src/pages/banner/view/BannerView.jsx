import React from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useHistory } from "react-router-dom";
import "./BannerView.css";

const BannerView = () => {
  const history = useHistory();

  const backHandler = () => {
    history.push("/banner/list");
  };

  return (
    <Container className="banner-view">
      <div className="main-title">
        <KeyboardBackspaceIcon className="back-icon" onClick={backHandler} />
        <span>Banner Details</span>
      </div>
      <Card width="768px" margin="0px auto">
        <div className="align">
          <div className="img-item">
            <img
              src="https://www.creatopy.com/blog/wp-content/uploads/2018/05/animations-e-commerce.png"
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
                <span>Banner Type</span>
              </div>
              <div className="value">
                <span>Main Banner</span>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Status</span>
              </div>
              <div className="value">
                <span>Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default BannerView;
