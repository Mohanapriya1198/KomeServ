import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Chart from "../../components/chart/Chart";
import { bookedServiceData, transactionData } from "../../DummyData";
import { DataGrid } from "@mui/x-data-grid";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useHistory } from "react-router-dom";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { SideBarAction } from "../../redux/sideBar/SideBarSlice";
import "./Dashboard.css";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState([]);
  useEffect(() => {
    const filterData = transactionData.filter((d, index) => {
      return index <= 4;
    });

    let newData = [];

    filterData.map((d, index) => {
      return newData.push({ sn: index + 1, ...d });
    });

    setData(newData);
  }, []);

  const columns = [
    {
      field: "sn",
      headerName: "S.No",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "id",
      headerName: "ID",
      width: 180,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "date",
      headerName: "Date",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 180,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "planType",
      headerName: "Plan Type",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "planAmount",
      headerName: "Plan Amount",
      width: 180,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <span>₹{params.value}</span>;
      },
    },
    {
      field: "serviceAmount",
      headerName: "Service Amount",
      width: 180,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <span>₹{params.value}</span>;
      },
    },
  ];

  const moreHandler = () => {
    dispatch(SideBarAction.addData({ data: "transaction", status: true }));
    history.push("/transaction");
  };

  return (
    <Container className="dashboard">
      <div className="header">
        <div className="card">
          <div className="icon">
            <ShoppingCartIcon sx={{ width: "20px", height: "20px" }} />
          </div>
          <div className="info">
            <div className="title">
              <span>Total ordered </span>
            </div>
            <div className="value">
              <span>9989</span>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="com-icon">
            <CheckCircleIcon sx={{ width: "20px", height: "20px" }} />
          </div>
          <div className="info">
            <div className="title">
              <span>Total Completed</span>
            </div>
            <div className="value">
              <span>9989</span>
            </div>
          </div>
        </div>
        <div className="card" style={{ marginRight: "0px" }}>
          <div className="failed-icon">
            <RemoveShoppingCartIcon sx={{ width: "20px", height: "20px" }} />
          </div>
          <div className="info">
            <div className="title">
              <span>Total Cancelled</span>
            </div>
            <div className="value">
              <span>9989</span>
            </div>
          </div>
        </div>
      </div>
      <div className="graph">
        <Chart
          data={bookedServiceData}
          title="Ordered Analytics"
          datakey="Total Count"
          stroke="#ff5a1f"
          grid
        />
        <Chart
          data={bookedServiceData}
          title="Completed Analytics"
          datakey="Total Count"
          stroke="#0e9f6e"
          grid
        />
        <Chart
          data={bookedServiceData}
          title="Cancelled Analytics"
          datakey="Total Count"
          stroke="#c81e1e"
          grid
        />
      </div>
      <Table tableContainer="400px" tableHeight="318px">
        <div className="table-title">Over All Transaction</div>
        <DataGrid
          rows={data}
          columns={columns}
          hideFooter
          disableSelectionOnClick
          disableColumnMenu
        />

        <div className="more" onClick={moreHandler}>
          <span className="title">View More</span>
          <ArrowForwardIcon className="icon" />
        </div>
      </Table>
    </Container>
  );
};

export default Home;
