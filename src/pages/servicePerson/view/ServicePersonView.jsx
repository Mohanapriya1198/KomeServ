import React from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useHistory } from "react-router-dom";
import "./ServicePersonView.css";

const ServicePersonView = () => {
  const history = useHistory();

  const backHandler = () => {
    history.push("/servicePerson/list");
  };

  const rejectHandler = () => {
    history.push("/servicePerson/list");
  };

  const approveHandler = () => {
    history.push("/servicePerson/list");
  };
  return (
    <Container className="servicePerson-view">
      <div className="main-title">
        <KeyboardBackspaceIcon className="back-icon" onClick={backHandler} />
        <span>Service Person Details</span>
        <div className="action">
          <button className="rejectedBtn" onClick={rejectHandler}>
            Rejected
          </button>
          <button className="approvedBtn" onClick={approveHandler}>
            Approved
          </button>
        </div>
      </div>
      <Card width="768px" margin="0px auto">
        <div className="sub-title">
          <span>Personal Details</span>
        </div>
        <div className="grid">
          <div className="img-item">
            <img
              src="https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg"
              alt="profile"
            />
          </div>
          <div className="items">
            <div className="item">
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Name</span>
              </div>
              <div className="value">
                <span>Praveen</span>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Email Id</span>
              </div>
              <div className="value">
                <span>praveen@gmail.com</span>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Mobile Number</span>
              </div>
              <div className="value">
                <span>9878965789</span>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Location</span>
              </div>
              <div className="value">
                <span>Othakadai</span>
              </div>
            </div>
            <div className="item" style={{ margin: "0px" }}>
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Pincode</span>
              </div>
              <div className="value">
                <span>656789</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card width="768px" margin="24px auto 24px auto">
        <div className="sub-title">
          <span>Aadhar Documents</span>
        </div>
        <div className="grid">
          <div className="items" style={{ padding: "0px 60px 0px 60px" }}>
            <div className="item">
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Aadhar Number</span>
              </div>
              <div className="value">
                <span>5124 4322 4567</span>
              </div>
            </div>
            <div className="doc-item">
              <img
                src="https://s3.ap-southeast-1.amazonaws.com/images.asianage.com/images/aa-Cover-vhobga052m2s92bvuc37ca5556-20170807014459.Medi.jpeg"
                alt="document"
              />
            </div>
          </div>
        </div>
      </Card>
      <Card width="768px" margin="0px auto 24px auto">
        <div className="sub-title">
          <span>Service Documents</span>
        </div>
        <div className="grid">
          <div className="items" style={{ padding: "0px 60px 0px 60px" }}>
            <div className="item">
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Service Type</span>
              </div>
              <div className="value">
                <span>Laptop Service</span>
              </div>
            </div>
            <div className="doc-item-service">
              <img
                src="https://content3.jdmagicbox.com/comp/delhi/n9/011pxx11.xx11.190223142907.e4n9/catalogue/laptech-services-dwarka-sector-7-delhi-laptop-repair-and-services-fnrzuri3ep.jpg?clr=404026"
                alt="document"
              />
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default ServicePersonView;
