import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import Table from "../../../components/table/Table";
import { ServicePersonData } from "../../../DummyData";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useHistory } from "react-router-dom";
import "./ServicePersonList.css";

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

const ServicePersonList = () => {
  const history = useHistory();
  const [data, setData] = useState();
  const [headerData, setheaderData] = useState({
    search: "",
    status: "",
  });
  const [id, setId] = useState();
  const [moreDetail, setmoreDetail] = useState(false);
  useEffect(() => {
    if (headerData.search) {
      const newData = [];
      const filterData = ServicePersonData.filter((d) => {
        return (
          d.id.includes(headerData.search) ||
          d.name.toLowerCase().includes(headerData.search.toLowerCase()) ||
          d.mobileNumber.includes(headerData.search) ||
          d.pincode.includes(headerData.search)
        );
      });
      filterData.map((d, index) => {
        return newData.push({ sn: index + 1, ...d });
      });

      setData(newData);
    } else if (headerData.status) {
      if (headerData.status === "All") {
        const Data = ServicePersonData.map((d, index) => {
          return { sn: index + 1, ...d };
        });
        setData(Data);
      } else if (headerData.status === "None") {
        const newData = [];
        const filterData = ServicePersonData.filter((d) => {
          return d.status === "";
        });
        filterData.map((d, index) => {
          return newData.push({ sn: index + 1, ...d });
        });

        setData(newData);
      } else {
        const newData = [];
        const filterData = ServicePersonData.filter((d) => {
          return d.status === headerData.status;
        });
        filterData.map((d, index) => {
          return newData.push({ sn: index + 1, ...d });
        });

        setData(newData);
      }
    } else {
      const Data = ServicePersonData.map((d, index) => {
        return { sn: index + 1, ...d };
      });
      setData(Data);
    }
  }, [headerData]);

  const moreHandler = (id) => {
    setId(id);
    setmoreDetail((prev) => !prev);
  };

  const viewHandler = (data) => {
    history.push({
      pathname: "/servicePerson/details/" + data.id,
      state: data,
    });
  };

  const editHandler = (data) => {
    history.push({ pathname: "/servicePerson/edit/" + data.id, state: data });
  };

  const deleteHandler = () => {};

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
      field: "name",
      headerName: "Name",
      width: 180,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "mobileNumber",
      headerName: "Mobile No",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "pincode",
      headerName: "Pincode",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "serviceType",
      headerName: "Service Type",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div
            className={
              params.value === "Approved"
                ? "approved"
                : params.value === "Rejected"
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
          <div className="moreDetails">
            <div className="more-align">
              <MoreVertIcon
                className="more-icon"
                onClick={() => moreHandler(params.id)}
              />
            </div>
            {moreDetail && params.id === id && (
              <div className="detail">
                <div className="options">
                  <Tooltip title="view">
                    <IconButton onClick={() => viewHandler(params.row)}>
                      <VisibilityIcon className="icon" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => editHandler(params.row)}>
                      <EditIcon className="icon" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => deleteHandler(params.id)}>
                      <DeleteIcon className="icon" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            )}
          </div>
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
    <Container className="servicePersonList">
      <Table tableContainer="79.5vh" tableHeight="72vh">
        <div className="title">
          <span>Service Person List</span>
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
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="None">None</option>
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

export default ServicePersonList;
