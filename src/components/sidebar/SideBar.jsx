import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ImageIcon from "@mui/icons-material/Image";
import MasksIcon from "@mui/icons-material/Masks";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import PaymentsIcon from "@mui/icons-material/Payments";
import ReportIcon from "@mui/icons-material/Report";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { SideBarAction } from "../../redux/sideBar/SideBarSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./SideBar.css";

export default function SideBar() {
  const dispatch = useDispatch();
  const sideBarVal = useSelector((state) => state.sideBar);
  const [orderopen, setorderOpen] = useState(false);
  const [useropen, setuserOpen] = useState(false);
  const [serviceopen, setserviceOpen] = useState(false);
  const [banneropen, setbannerOpen] = useState(false);
  const [cateopen, setcateOpen] = useState(false);
  const [covidopen, setcovidOpen] = useState(false);
  const [planopen, setplanOpen] = useState(false);
  const [reportopen, setreportOpen] = useState(false);
  const [notificationopen, setnotificationOpen] = useState(false);
  const [userNotificationopen, setuserNotificationOpen] = useState(false);
  const [serviceNotificationopen, setserviceNotificationOpen] = useState(false);
  const [scheduleNotificationopen, setscheduleNotificationOpen] =
    useState(false);
  const [submenu, setsubmenu] = useState();
  const [selectedlist, setSelectedlist] = useState();
  const [selectedIndex, setSelectedIndex] = useState();

  const handleListItemClick = (menu) => {
    sessionStorage.setItem("key", menu);
    setSelectedIndex(menu);
  };

  useEffect(() => {
    if (sideBarVal.status) {
      sessionStorage.setItem("key", sideBarVal.data);
      setSelectedIndex(sideBarVal.data);
      setsubmenu({
        ...submenu,
        bannerAdd: false,
        serviceAdd: false,
        userAdd: false,
        categoryAdd: false,
        covidAdd: false,
        planAdd: false,
        userNotificationAdd: false,
        serviceNotificationAdd: false,
        scheduleNotificationAdd: false,
      });
      dispatch(SideBarAction.addData({ data: "", status: false }));
    } else {
      let selectedMenu = sessionStorage.getItem("key");
      setSelectedIndex(selectedMenu);
      setSelectedlist("");

      if (selectedMenu === "userList" || selectedMenu === "userAdd") {
        setuserOpen(true);
      } else if (
        selectedMenu === "serviceList" ||
        selectedMenu === "serviceAdd"
      ) {
        setserviceOpen(true);
      } else if (
        selectedMenu === "bannerList" ||
        selectedMenu === "bannerAdd"
      ) {
        setbannerOpen(true);
      } else if (
        selectedMenu === "categoryList" ||
        selectedMenu === "categoryAdd"
      ) {
        setcateOpen(true);
      } else if (selectedMenu === "covidList" || selectedMenu === "covidAdd") {
        setcovidOpen(true);
      } else if (selectedMenu === "planList" || selectedMenu === "planAdd") {
        setplanOpen(true);
      } else if (selectedMenu === "transaction") {
        sessionStorage.setItem("key", "transaction");
        setSelectedIndex("transaction");
      } else if (selectedMenu === "order") {
        sessionStorage.setItem("key", "order");
        setSelectedIndex("order");
      } else if (selectedMenu === "reportServicePerson") {
        setreportOpen(true);
      } else if (
        selectedMenu === "userNotificationList" ||
        selectedMenu === "userNotificationAdd"
      ) {
        setnotificationOpen(true);
        setuserNotificationOpen(true);
      } else if (
        selectedMenu === "serviceNotificationList" ||
        selectedMenu === "serviceNotificationAdd"
      ) {
        setnotificationOpen(true);
        setserviceNotificationOpen(true);
      } else if (
        selectedMenu === "scheduleNotificationList" ||
        selectedMenu === "scheduleNotificationAdd"
      ) {
        setnotificationOpen(true);
        setscheduleNotificationOpen(true);
      } else {
        sessionStorage.setItem("key", "dash");
        setSelectedIndex("dash");
      }
    }
  }, [selectedIndex, sideBarVal, dispatch, submenu]);

  const selectedHandler = (value) => {
    setSelectedlist({ [value]: true });
    setsubmenu({});
    handleListItemClick(value);
    if (value === "dash" || value === "transaction" || value === "order") {
      setorderOpen(false);
      setuserOpen(false);
      setcateOpen(false);
      setserviceOpen(false);
      setbannerOpen(false);
      setcovidOpen(false);
      setplanOpen(false);
      setreportOpen(false);
      setnotificationOpen(false);
      setuserNotificationOpen(false);
      setserviceNotificationOpen(false);
      setscheduleNotificationOpen(false);
    }
  };

  // Menu Handler

  const userMenuHandler = (value) => {
    selectedHandler("user");
    setsubmenu({ [value]: true });
    handleListItemClick(value);
  };

  const serviceMenuHandler = (value) => {
    selectedHandler("service");
    setsubmenu({ [value]: true });
    handleListItemClick(value);
  };

  const bannerMenuHandler = (value) => {
    selectedHandler("banner");
    setsubmenu({ [value]: true });
    handleListItemClick(value);
  };

  // const orderMenuHandler = (value) => {
  //   selectedHandler("order");
  //   setsubmenu({ [value]: true });
  //   handleListItemClick(value);
  // };

  const categoryMenuHandler = (value) => {
    selectedHandler("category");
    setsubmenu({ [value]: true });
    handleListItemClick(value);
  };

  const covidMenuHandler = (value) => {
    selectedHandler("covid");
    setsubmenu({ [value]: true });
    handleListItemClick(value);
  };

  const planMenuHandler = (value) => {
    selectedHandler("plan");
    setsubmenu({ [value]: true });
    handleListItemClick(value);
  };

  const reportMenuHandler = (value) => {
    selectedHandler("report");
    setsubmenu({ [value]: true });
    handleListItemClick(value);
  };

  const userNotificationMenuHandler = (value) => {
    selectedHandler("userNotification");
    setsubmenu({ [value]: true });
    handleListItemClick(value);
  };

  const serviceNotificationMenuHandler = (value) => {
    selectedHandler("serviceNotification");
    setsubmenu({ [value]: true });
    handleListItemClick(value);
  };

  const scheduleNotificationMenuHandler = (value) => {
    selectedHandler("scheduleNotification");
    setsubmenu({ [value]: true });
    handleListItemClick(value);
  };

  // Handle Click

  const userhandleClick = () => {
    setuserOpen(!useropen);
    setserviceOpen(false);
    setorderOpen(false);
    setcateOpen(false);
    setbannerOpen(false);
    setcovidOpen(false);
    setplanOpen(false);
    setreportOpen(false);
    setnotificationOpen(false);
    setuserNotificationOpen(false);
    setserviceNotificationOpen(false);
    setscheduleNotificationOpen(false);
  };

  const servicehandleClick = () => {
    setserviceOpen(!serviceopen);
    setuserOpen(false);
    setorderOpen(false);
    setcateOpen(false);
    setbannerOpen(false);
    setcovidOpen(false);
    setplanOpen(false);
    setreportOpen(false);
    setnotificationOpen(false);
    setuserNotificationOpen(false);
    setserviceNotificationOpen(false);
    setscheduleNotificationOpen(false);
  };

  const bannerhandleClick = () => {
    setbannerOpen(!banneropen);
    setserviceOpen(false);
    setuserOpen(false);
    setorderOpen(false);
    setcateOpen(false);
    setcovidOpen(false);
    setplanOpen(false);
    setreportOpen(false);
    setnotificationOpen(false);
    setuserNotificationOpen(false);
    setserviceNotificationOpen(false);
    setscheduleNotificationOpen(false);
  };

  const catehandleClick = () => {
    setcateOpen(!cateopen);
    setuserOpen(false);
    setserviceOpen(false);
    setorderOpen(false);
    setbannerOpen(false);
    setcovidOpen(false);
    setplanOpen(false);
    setreportOpen(false);
    setnotificationOpen(false);
    setuserNotificationOpen(false);
    setserviceNotificationOpen(false);
    setscheduleNotificationOpen(false);
  };

  const covidhandleClick = () => {
    setcovidOpen(!covidopen);
    setcateOpen(false);
    setuserOpen(false);
    setserviceOpen(false);
    setorderOpen(false);
    setbannerOpen(false);
    setplanOpen(false);
    setreportOpen(false);
    setnotificationOpen(false);
    setuserNotificationOpen(false);
    setserviceNotificationOpen(false);
    setscheduleNotificationOpen(false);
  };

  const planhandleClick = () => {
    setplanOpen(!planopen);
    setcovidOpen(false);
    setcateOpen(false);
    setuserOpen(false);
    setserviceOpen(false);
    setorderOpen(false);
    setbannerOpen(false);
    setreportOpen(false);
    setnotificationOpen(false);
    setuserNotificationOpen(false);
    setserviceNotificationOpen(false);
    setscheduleNotificationOpen(false);
  };

  // const orderhandleClick = () => {
  //   setorderOpen(!orderopen);
  //   setuserOpen(false);
  //   setserviceOpen(false);
  //   setcateOpen(false);
  //   setbannerOpen(false);
  //   setcovidOpen(false);
  //   setplanOpen(false);
  //   setreportOpen(false);
  //   setnotificationOpen(false);
  //   setuserNotificationOpen(false);
  //   setserviceNotificationOpen(false);
  //   setscheduleNotificationOpen(false);
  // };

  const reporthandleClick = () => {
    setreportOpen(!reportopen);
    setorderOpen(false);
    setuserOpen(false);
    setserviceOpen(false);
    setcateOpen(false);
    setbannerOpen(false);
    setcovidOpen(false);
    setplanOpen(false);
    setnotificationOpen(false);
    setuserNotificationOpen(false);
    setserviceNotificationOpen(false);
    setscheduleNotificationOpen(false);
  };

  const notificationhandleClick = () => {
    setnotificationOpen(!notificationopen);
    setreportOpen(false);
    setorderOpen(false);
    setuserOpen(false);
    setserviceOpen(false);
    setcateOpen(false);
    setbannerOpen(false);
    setcovidOpen(false);
    setplanOpen(false);
    setuserNotificationOpen(false);
    setserviceNotificationOpen(false);
    setscheduleNotificationOpen(false);
  };

  const userNotificationhandleClick = () => {
    setuserNotificationOpen(!userNotificationopen);
    setreportOpen(false);
    setorderOpen(false);
    setuserOpen(false);
    setserviceOpen(false);
    setcateOpen(false);
    setbannerOpen(false);
    setcovidOpen(false);
    setplanOpen(false);
    setserviceNotificationOpen(false);
    setscheduleNotificationOpen(false);
  };

  const serviceNotificationhandleClick = () => {
    setserviceNotificationOpen(!serviceNotificationopen);
    setscheduleNotificationOpen(false);
    setuserNotificationOpen(false);
    setreportOpen(false);
    setorderOpen(false);
    setuserOpen(false);
    setserviceOpen(false);
    setcateOpen(false);
    setbannerOpen(false);
    setcovidOpen(false);
    setplanOpen(false);
  };

  const scheduleNotificationhandleClick = () => {
    setscheduleNotificationOpen(!scheduleNotificationopen);
    setserviceNotificationOpen(false);
    setuserNotificationOpen(false);
    setreportOpen(false);
    setorderOpen(false);
    setuserOpen(false);
    setserviceOpen(false);
    setcateOpen(false);
    setbannerOpen(false);
    setcovidOpen(false);
    setplanOpen(false);
  };

  return (
    <Box
      sx={{
        width: 300,
        height: "100vh",
        bgcolor: "#ffffff",
        padding: "0px 24px 0px 24px",
      }}
      className="sidebar"
    >
      <List component="nav" sx={{ padding: "4px 0px" }}>
        <Typography className="logo">Kome Serv</Typography>

        {/* Dashboard */}

        <Link to="/" className="link">
          <ListItemButton
            sx={{ marginTop: "15px" }}
            className={
              selectedlist?.dash || selectedIndex === "dash"
                ? "selectedList"
                : "listItem"
            }
            onClick={() => selectedHandler("dash")}
          >
            <ListItemIcon>
              <DashboardIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" className="text" />
          </ListItemButton>
        </Link>

        {/* User */}

        <ListItemButton
          onClick={userhandleClick}
          className={
            selectedlist?.user ||
            selectedIndex === "userList" ||
            selectedIndex === "userAdd"
              ? "selectedList"
              : "listItem"
          }
        >
          <ListItemIcon>
            <PersonIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="User" className="text" />
          {useropen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={useropen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/user/list" className="link">
              <ListItemButton
                sx={{ marginTop: "10px" }}
                className={
                  submenu?.userList || selectedIndex === "userList"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => userMenuHandler("userList")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="List" className="subtext" />
              </ListItemButton>
            </Link>

            <Link to="/user/add" className="link">
              <ListItemButton
                className={
                  submenu?.userAdd || selectedIndex === "userAdd"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => userMenuHandler("userAdd")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="Add" className="subtext" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        {/* Service Person */}

        <ListItemButton
          onClick={servicehandleClick}
          className={
            selectedlist?.service ||
            selectedIndex === "serviceList" ||
            selectedIndex === "serviceAdd"
              ? "selectedList"
              : "listItem"
          }
        >
          <ListItemIcon>
            <ManageAccountsIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="Service Person" className="text" />
          {serviceopen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={serviceopen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/servicePerson/list" className="link">
              <ListItemButton
                sx={{ marginTop: "10px" }}
                className={
                  submenu?.serviceList || selectedIndex === "serviceList"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => serviceMenuHandler("serviceList")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="List" className="subtext" />
              </ListItemButton>
            </Link>

            <Link to="/servicePerson/add" className="link">
              <ListItemButton
                className={
                  submenu?.serviceAdd || selectedIndex === "serviceAdd"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => serviceMenuHandler("serviceAdd")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="Add" className="subtext" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        {/* Banner */}

        <ListItemButton
          onClick={bannerhandleClick}
          className={
            selectedlist?.banner ||
            selectedIndex === "bannerList" ||
            selectedIndex === "bannerAdd"
              ? "selectedList"
              : "listItem"
          }
        >
          <ListItemIcon>
            <ImageIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="Banner" className="text" />
          {banneropen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={banneropen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/banner/list" className="link">
              <ListItemButton
                sx={{ marginTop: "10px" }}
                className={
                  submenu?.bannerList || selectedIndex === "bannerList"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => bannerMenuHandler("bannerList")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="List" className="subtext" />
              </ListItemButton>
            </Link>

            <Link to="/banner/add" className="link">
              <ListItemButton
                className={
                  submenu?.bannerAdd || selectedIndex === "bannerAdd"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => bannerMenuHandler("bannerAdd")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="Add" className="subtext" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        {/* Category */}

        <ListItemButton
          onClick={catehandleClick}
          className={
            selectedlist?.category ||
            selectedIndex === "categoryList" ||
            selectedIndex === "categoryAdd"
              ? "selectedList"
              : "listItem"
          }
        >
          <ListItemIcon>
            <CategoryIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="Category" className="text" />
          {cateopen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={cateopen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/category/list" className="link">
              <ListItemButton
                sx={{ marginTop: "10px" }}
                className={
                  submenu?.categoryList || selectedIndex === "categoryList"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => categoryMenuHandler("categoryList")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="List" className="subtext" />
              </ListItemButton>
            </Link>

            <Link to="/category/add" className="link">
              <ListItemButton
                className={
                  submenu?.categoryAdd || selectedIndex === "categoryAdd"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => categoryMenuHandler("categoryAdd")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="Add" className="subtext" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        {/* Covid Measures */}

        <ListItemButton
          onClick={covidhandleClick}
          className={
            selectedlist?.covid ||
            selectedIndex === "covidList" ||
            selectedIndex === "covidAdd"
              ? "selectedList"
              : "listItem"
          }
        >
          <ListItemIcon>
            <MasksIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="Covid Measures" className="text" />
          {covidopen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={covidopen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/covid/list" className="link">
              <ListItemButton
                sx={{ marginTop: "10px" }}
                className={
                  submenu?.covidList || selectedIndex === "covidList"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => covidMenuHandler("covidList")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="List" className="subtext" />
              </ListItemButton>
            </Link>

            <Link to="/covid/add" className="link">
              <ListItemButton
                className={
                  submenu?.covidAdd || selectedIndex === "covidAdd"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => covidMenuHandler("covidAdd")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="Add" className="subtext" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        {/* Plan */}

        <ListItemButton
          onClick={planhandleClick}
          className={
            selectedlist?.plan ||
            selectedIndex === "planList" ||
            selectedIndex === "planAdd"
              ? "selectedList"
              : "listItem"
          }
        >
          <ListItemIcon>
            <CardMembershipIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="Plan" className="text" />
          {planopen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={planopen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/plan/list" className="link">
              <ListItemButton
                sx={{ marginTop: "10px" }}
                className={
                  submenu?.planList || selectedIndex === "planList"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => planMenuHandler("planList")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="List" className="subtext" />
              </ListItemButton>
            </Link>

            <Link to="/plan/add" className="link">
              <ListItemButton
                className={
                  submenu?.planAdd || selectedIndex === "planAdd"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => planMenuHandler("planAdd")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="Add" className="subtext" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        {/* order */}

        <Link to="/all" className="link">
          <ListItemButton
            sx={{ marginTop: "15px" }}
            className={
              selectedlist?.order || selectedIndex === "order"
                ? "selectedList"
                : "listItem"
            }
            onClick={() => selectedHandler("order")}
          >
            <ListItemIcon>
              <ShoppingCartIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Order" className="text" />
          </ListItemButton>
        </Link>

        {/* <Collapse in={orderopen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/all" className="link">
              <ListItemButton
                sx={{ marginTop: "10px" }}
                className={
                  submenu?.allorder || selectedIndex === "allorder"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => orderMenuHandler("allorder")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="All" className="subtext" />
              </ListItemButton>
            </Link>

            <Link to="/processing" className="link">
              <ListItemButton
                className={
                  submenu?.processing || selectedIndex === "processing"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => orderMenuHandler("processing")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="Processing" className="subtext" />
              </ListItemButton>
            </Link>

            <Link to="/completed" className="link">
              <ListItemButton
                className={
                  submenu?.completed || selectedIndex === "completed"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => orderMenuHandler("completed")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="Completed" className="subtext" />
              </ListItemButton>
            </Link>

            <Link to="/cancelled" className="link">
              <ListItemButton
                className={
                  submenu?.cancelled || selectedIndex === "cancelled"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => orderMenuHandler("cancelled")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="Cancelled" className="subtext" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse> */}

        {/* Transaction */}

        <Link to="/transaction" className="link">
          <ListItemButton
            sx={{ marginTop: "15px" }}
            className={
              selectedlist?.transaction || selectedIndex === "transaction"
                ? "selectedList"
                : "listItem"
            }
            onClick={() => selectedHandler("transaction")}
          >
            <ListItemIcon>
              <PaymentsIcon className="icon" />
            </ListItemIcon>
            <ListItemText primary="Transaction" className="text" />
          </ListItemButton>
        </Link>

        {/* Report */}

        <ListItemButton
          onClick={reporthandleClick}
          className={
            selectedlist?.report || selectedIndex === "reportServicePerson"
              ? "selectedList"
              : "listItem"
          }
        >
          <ListItemIcon>
            <ReportIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="Reports" className="text" />
          {reportopen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={reportopen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/report/ServicePerson" className="link">
              <ListItemButton
                sx={{ marginTop: "10px" }}
                className={
                  submenu?.reportServicePerson ||
                  selectedIndex === "reportServicePerson"
                    ? "selectedSub"
                    : "sublistItem"
                }
                onClick={() => reportMenuHandler("reportServicePerson")}
              >
                <ListItemIcon>
                  <FiberManualRecordIcon className="subicon" />
                </ListItemIcon>
                <ListItemText primary="Service Person" className="subtext" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>

        {/* Notification */}

        <ListItemButton
          onClick={notificationhandleClick}
          className={
            selectedlist?.notification ||
            selectedIndex === "userNotification" ||
            selectedIndex === "serviceNotification" ||
            selectedIndex === "scheduleNotification"
              ? "selectedList"
              : "listItem"
          }
        >
          <ListItemIcon>
            <NotificationsIcon className="icon" />
          </ListItemIcon>
          <ListItemText primary="Notification" className="text" />
          {notificationopen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={notificationopen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* user Notification */}
            <ListItemButton
              onClick={userNotificationhandleClick}
              className={
                selectedlist?.userNotification ||
                selectedIndex === "userNotificationList" ||
                selectedIndex === "userNotificationAdd"
                  ? "selectedList"
                  : "listItem"
              }
            >
              <ListItemText
                primary="User"
                className="text"
                sx={{ paddingLeft: "58px" }}
              />
              {userNotificationopen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={userNotificationopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/userNotification/list" className="link">
                  <ListItemButton
                    sx={{ marginTop: "10px" }}
                    className={
                      submenu?.userNotificationList ||
                      selectedIndex === "userNotificationList"
                        ? "selectedSub"
                        : "sublistItem"
                    }
                    onClick={() =>
                      userNotificationMenuHandler("userNotificationList")
                    }
                  >
                    <ListItemIcon>
                      <FiberManualRecordIcon className="subicon" />
                    </ListItemIcon>
                    <ListItemText primary="List" className="subtext" />
                  </ListItemButton>
                </Link>

                <Link to="/userNotification/Add" className="link">
                  <ListItemButton
                    className={
                      submenu?.userNotificationAdd ||
                      selectedIndex === "userNotificationAdd"
                        ? "selectedSub"
                        : "sublistItem"
                    }
                    onClick={() =>
                      userNotificationMenuHandler("userNotificationAdd")
                    }
                  >
                    <ListItemIcon>
                      <FiberManualRecordIcon className="subicon" />
                    </ListItemIcon>
                    <ListItemText primary="Add" className="subtext" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>

            {/* service Person Notification */}

            <ListItemButton
              onClick={serviceNotificationhandleClick}
              className={
                selectedlist?.serviceNotification ||
                selectedIndex === "serviceNotificationList" ||
                selectedIndex === "serviceNotificationAdd"
                  ? "selectedList"
                  : "listItem"
              }
            >
              <ListItemText
                primary="Service Person"
                className="text"
                sx={{ paddingLeft: "58px" }}
              />
              {serviceNotificationopen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={serviceNotificationopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/serviceNotification/list" className="link">
                  <ListItemButton
                    sx={{ marginTop: "10px" }}
                    className={
                      submenu?.serviceNotificationList ||
                      selectedIndex === "serviceNotificationList"
                        ? "selectedSub"
                        : "sublistItem"
                    }
                    onClick={() =>
                      serviceNotificationMenuHandler("serviceNotificationList")
                    }
                  >
                    <ListItemIcon>
                      <FiberManualRecordIcon className="subicon" />
                    </ListItemIcon>
                    <ListItemText primary="List" className="subtext" />
                  </ListItemButton>
                </Link>

                <Link to="/serviceNotification/Add" className="link">
                  <ListItemButton
                    className={
                      submenu?.serviceNotificationAdd ||
                      selectedIndex === "serviceNotificationAdd"
                        ? "selectedSub"
                        : "sublistItem"
                    }
                    onClick={() =>
                      serviceNotificationMenuHandler("serviceNotificationAdd")
                    }
                  >
                    <ListItemIcon>
                      <FiberManualRecordIcon className="subicon" />
                    </ListItemIcon>
                    <ListItemText primary="Add" className="subtext" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>

            {/* schedule Notification */}

            <ListItemButton
              onClick={scheduleNotificationhandleClick}
              className={
                selectedlist?.scheduleNotification ||
                selectedIndex === "scheduleNotificationList" ||
                selectedIndex === "scheduleNotificationAdd"
                  ? "selectedList"
                  : "listItem"
              }
            >
              <ListItemText
                primary="Schedule"
                className="text"
                sx={{ paddingLeft: "58px" }}
              />
              {scheduleNotificationopen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={scheduleNotificationopen}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <Link to="/scheduleNotification/list" className="link">
                  <ListItemButton
                    sx={{ marginTop: "10px" }}
                    className={
                      submenu?.scheduleNotificationList ||
                      selectedIndex === "scheduleNotificationList"
                        ? "selectedSub"
                        : "sublistItem"
                    }
                    onClick={() =>
                      scheduleNotificationMenuHandler(
                        "scheduleNotificationList"
                      )
                    }
                  >
                    <ListItemIcon>
                      <FiberManualRecordIcon className="subicon" />
                    </ListItemIcon>
                    <ListItemText primary="List" className="subtext" />
                  </ListItemButton>
                </Link>

                <Link to="/scheduleNotification/Add" className="link">
                  <ListItemButton
                    sx={{ marginBottom: "10px" }}
                    className={
                      submenu?.scheduleNotificationAdd ||
                      selectedIndex === "scheduleNotificationAdd"
                        ? "selectedSub"
                        : "sublistItem"
                    }
                    onClick={() =>
                      scheduleNotificationMenuHandler("scheduleNotificationAdd")
                    }
                  >
                    <ListItemIcon>
                      <FiberManualRecordIcon className="subicon" />
                    </ListItemIcon>
                    <ListItemText primary="Add" className="subtext" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
          </List>
        </Collapse>
      </List>
    </Box>
  );
}
