import React from "react";
import Container from "@mui/material/Container";
import Card from "../../components/card/Card";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import "./Profile.css";

const Profile = () => {
  return (
    <Container className="profile-view">
      <div className="main-title">
        <span>Admin Details</span>
      </div>
      <Card width="768px" margin="0px auto">
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
                <span>name </span>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Email Id</span>
              </div>
              <div className="value">
                <span>email </span>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Mobile Number</span>
              </div>
              <div className="value">
                <span>mobileNumber </span>
              </div>
            </div>
            <div className="item" style={{ margin: "0px" }}>
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Pincode</span>
              </div>
              <div className="value">
                <span>pincode</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Profile;
