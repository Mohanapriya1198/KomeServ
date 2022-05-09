import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FetchUserList } from "../../../redux/user/UserAction";
import "./UserView.css";

const UserView = () => {
  const location = useLocation();
  const history = useHistory();
  const params = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchUserList());
  }, [dispatch]);
  const UserList = useSelector((d) => d.user.list);
  const [data, setData] = useState([]);
  useEffect(() => {
    const view = UserList?.filter((d) => {
      return d.id === +params.id;
    });
    setData(view);
  }, [UserList]);
  console.log(data);
  const backHandler = () => {
    history.push("/user/list");
  };
  return (
    <Container className="user-view">
      <div className="main-title">
        <KeyboardBackspaceIcon className="back-icon" onClick={backHandler} />
        <span>User Details</span>
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
                <span>{data?.[0]?.first_name} </span>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Mail id</span>
              </div>
              <div className="value">
                <span>{data?.[0]?.email} </span>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Mobile Number</span>
              </div>
              <div className="value">
                <span>{data?.[0]?.username} </span>
              </div>
            </div>
            <div className="item" style={{ margin: "0px" }}>
              <div className="title">
                <FiberManualRecordIcon className="icon" />
                <span>Pincode</span>
              </div>
              <div className="value">
                <span>{data?.[0]?.pincode}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default UserView;
