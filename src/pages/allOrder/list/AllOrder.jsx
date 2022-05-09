import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import Table from "../../../components/table/Table";
import { OrdersData } from "../../../DummyData";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import { useHistory } from "react-router-dom";
import "./AllOrder.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  margin: "0px 24px 24px 0px",
  width: "100%",

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#707275",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "35ch",
    },
    border: "1px solid #bebebe",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#1e293b",
  },
}));

const AllOrder = () => {
  const history = useHistory();
  const [data, setData] = useState();
  const [headerData, setheaderData] = useState({
    search: "",
    status: "",
  });

  useEffect(() => {
    if (headerData.search) {
      const newData = [];
      const filterData = OrdersData.filter((d) => {
        return (
          d.id.includes(headerData.search) ||
          d.customerName.toLowerCase().includes(headerData.search.toLowerCase())
        );
      });
      filterData.map((d, index) => {
        return newData.push({ sn: index + 1, ...d });
      });

      setData(newData);
    } else if (headerData.status) {
      if (headerData.status === "All") {
        const Data = OrdersData.map((d, index) => {
          return { sn: index + 1, ...d };
        });
        setData(Data);
      } else {
        const newData = [];
        const filterData = OrdersData.filter((d) => {
          return d.orderStatus === headerData.status;
        });
        filterData.map((d, index) => {
          return newData.push({ sn: index + 1, ...d });
        });

        setData(newData);
      }
    } else {
      const Data = OrdersData.map((d, index) => {
        return { sn: index + 1, ...d };
      });
      setData(Data);
    }
  }, [headerData]);

  const viewHandler = (data) => {
    history.push({
      pathname: "/all/details/" + data.id,
      state: data,
    });
  };

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
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Date",
      headerName: "Date",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 180,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "serviceType",
      headerName: "Service Type",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "servicePerson",
      headerName: "Service Person",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "orderStatus",
      headerName: "Status",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div
            className={
              params.value === "Completed"
                ? "approved"
                : params.value === "Cancelled"
                ? "rejected"
                : "none"
            }
          >
            <div className="title">
              <span>{params.value ? params.value : "None"}</span>
            </div>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <button className="view-btn" onClick={() => viewHandler(params.row)}>
            <Visibility className="view-icon" />
            view
          </button>
        );
      },
    },
  ];

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (value) {
      setheaderData({ [name]: value });
    } else {
      setheaderData({ [name]: "" });
    }
  };

  return (
    <Container className="allOrder">
      <Table tableContainer="79.5vh" tableHeight="72vh">
        <div className="title">
          <span>All Order List</span>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              name="search"
              onChange={changeHandler}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <div className="filter">
            <select name="status" id="status" onChange={changeHandler}>
              <option value="All">All </option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <DataGrid
          rows={data || []}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          disableSelectionOnClick
          disableColumnMenu
        />
      </Table>
    </Container>
  );
};

export default AllOrder;
