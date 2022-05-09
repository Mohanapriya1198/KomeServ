import * as React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SideBarAction } from "../../redux/sideBar/SideBarSlice";
import "./NavBar.css";

export default function NavBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [profileToggle, setprofileToggle] = React.useState(false);

  const profileHandler = () => {
    setprofileToggle((prev) => !prev);
  };

  const moreHandler = () => {
    setprofileToggle((prev) => !prev);
  };

  const orderHandler = () => {
    history.replace("/all");
    dispatch(SideBarAction.addData({ data: "order", status: true }));
  };

  const logoutHandler = () => {
    localStorage.removeItem("data");
    history.replace("/signin");
  };

  return (
    <>
      <AppBar position="static" className="navbar">
        <div className="main">
          <div className="icons">
            <IconButton
              size="large"
              sx={{ color: "#7e3af2" }}
              className="shopping"
              onClick={orderHandler}
            >
              <ShoppingCartIcon className="icon" />
            </IconButton>

            <IconButton onClick={profileHandler} className="avatar">
              <Avatar
                alt="Remy Sharp"
                src="https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg"
                sx={{ width: "32px", height: "32px" }}
              />
            </IconButton>
          </div>
        </div>
      </AppBar>

      {profileToggle && (
        <div className="moreInfo">
          <div className="viewProfile">
            <div className="name">
              <span>name</span>
            </div>
          </div>
          <hr />
          <Link to="/profile" className="link">
            <div className="editProfile" onClick={profileHandler}>
              <PersonOutlineIcon className="editicon" />
              <span className="editlabel">Profile</span>
            </div>
          </Link>

          <div className="logout" onClick={logoutHandler}>
            <LogoutIcon className="icon" />
            <span className="label">Logout</span>
          </div>
        </div>
      )}
    </>
  );
}
