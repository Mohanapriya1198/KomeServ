import React from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useLocation, useHistory } from "react-router-dom";
import "./CategoryView.css";

const CategoryView = () => {
  const location = useLocation();
  const history = useHistory();
  const data = location.state;

  const backHandler = () => {
    history.push("/category/list");
  };
  return (
    <Container className="category-view">
      <div className="main-title">
        <KeyboardBackspaceIcon className="back-icon" onClick={backHandler} />
        <span>Category Details</span>
      </div>
      <Card width="768px" margin="0px auto">
        <div className="sub-title">
          <span>Main Category</span>
        </div>
        <div className="items">
          <div className="item">
            <div className="title">
              <img src={data.image} alt="mainCategory" />
              <span>{data.title}</span>
            </div>
          </div>
        </div>
        <div className="sub-title" style={{ marginTop: "9px" }}>
          <span>Sub Category</span>
        </div>
        <div className="items">
          {data?.sub_category?.map((d) => {
            return (
              <div className="item">
                <div className="title">
                  <img
                    src={"https://api.komeserv.com" + d.image}
                    alt="mainCategory"
                  />
                  <span>{d.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </Container>
  );
};

export default CategoryView;
