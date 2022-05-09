import React from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useLocation, useHistory } from "react-router-dom";
import "./AllOrderView.css";

const AllOrderView = () => {
  const location = useLocation();
  const history = useHistory();
  const data = location.state;

  const backHandler = () => {
    history.push("/all");
  };
  return (
    <Container className="allOrder-view">
      <div className="main-title">
        <KeyboardBackspaceIcon className="back-icon" onClick={backHandler} />
        <span>Order Details</span>
      </div>
      <Card width="768px" margin="0px auto">
        <div className="sub-title">
          <span>Customer Details</span>
        </div>

        <div className="item">
          <div className="title">
            <FiberManualRecordIcon className="icon" />
            <span>Customer Name</span>
          </div>
          <div className="value">
            <span>{data.customerName} </span>
          </div>
        </div>

        <div className="item">
          <div className="title">
            <FiberManualRecordIcon className="icon" />
            <span>Mobile Number</span>
          </div>
          <div className="value">
            <span>{data.mobileNumber} </span>
          </div>
        </div>
      </Card>
      <Card width="768px" margin="24px auto 0px auto">
        <div className="sub-title">
          <span>Address Details</span>
        </div>
        <div className="item">
          <div className="title">
            <FiberManualRecordIcon className="icon" />
            <span>Type</span>
          </div>
          <div className="value">
            <span>{data.addressType} </span>
          </div>
        </div>
        <div className="item">
          <div className="title">
            <FiberManualRecordIcon className="icon" />
            <span>Address</span>
          </div>
          <div className="value">
            <span>{`${data.houseNo},${data.city},${data.pincode}`}</span>
          </div>
        </div>
      </Card>
      <Card width="768px" margin="24px auto 0px auto">
        <div className="sub-title">
          <span>Service Details</span>
        </div>
        <div className="item">
          <div className="title">
            <FiberManualRecordIcon className="icon" />
            <span>Service Type</span>
          </div>
          <div className="value">
            <span>{data.serviceType} </span>
          </div>
        </div>
        <div className="item">
          <div className="title">
            <FiberManualRecordIcon className="icon" />
            <span>Date and time</span>
          </div>
          <div className="value">
            <span>
              {data.Date} and {data.time}
            </span>
          </div>
        </div>
        <div className="item">
          <div className="title">
            <FiberManualRecordIcon className="icon" />
            <span>Service Person</span>
          </div>
          <div className="value">
            <span>{data.servicePerson}</span>
          </div>
        </div>
        <div className="item">
          <div className="title">
            <FiberManualRecordIcon className="icon" />
            <span>Status</span>
          </div>
          <div className="value">
            <span>{data.orderStatus}</span>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default AllOrderView;
