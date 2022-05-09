import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import Table from "../../../components/table/Table";
import { PlanData } from "../../../DummyData";
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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import "./PlanList.css";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 52,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(26px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#7e3af2",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#ffffff",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

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

const PlanList = () => {
  const history = useHistory();
  const [data, setData] = useState();
  const [headerData, setheaderData] = useState({
    search: "",
    status: "",
  });
  const [published, setPublished] = useState({
    switch: "",
    id: "",
  });
  const [id, setId] = useState();
  const [moreDetail, setmoreDetail] = useState(false);
  useEffect(() => {
    if (headerData.search) {
      const newData = [];
      const filterData = PlanData.filter((d) => {
        return (
          d.price.includes(headerData.search) ||
          d.title.toLowerCase().includes(headerData.search.toLowerCase())
        );
      });
      filterData.map((d, index) => {
        return newData.push({ sn: index + 1, ...d });
      });

      setData(newData);
    } else if (headerData.status) {
      if (headerData.status === "All") {
        const Data = PlanData.map((d, index) => {
          return { sn: index + 1, ...d };
        });
        setData(Data);
      } else {
        const newData = [];
        const filterData = PlanData.filter((d) => {
          return d.title === headerData.status;
        });
        filterData.map((d, index) => {
          return newData.push({ sn: index + 1, ...d });
        });

        setData(newData);
      }
    } else {
      const Data = PlanData.map((d, index) => {
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
      pathname: "/plan/details/" + data.id,
      state: data,
    });
  };

  const editHandler = (data) => {
    history.push({ pathname: "/plan/edit/" + data.id, state: data });
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
      field: "title",
      headerName: "Title",
      width: 180,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Price",
      width: 180,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <span>₹{params.value}</span>;
      },
    },
    {
      field: "planType",
      headerName: "Type",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "published",
      headerName: "Published",
      width: 180,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <FormGroup>
            <FormControlLabel
              control={
                <IOSSwitch
                  sx={{ m: 1 }}
                  name="switch"
                  value="Enabled"
                  onChange={(e) => changeHandler(e, params.id)}
                />
              }
              label=""
            />
          </FormGroup>
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

  const changeHandler = (e, id) => {
    const { name, value, checked } = e.target;
    if (name === "switch") {
      if (checked) {
        setPublished({ ...published, [name]: value, id });
      } else {
        setPublished({ ...published, [name]: "Disabled", id });
      }
    } else if (value) {
      setheaderData({ [name]: value });
    } else {
      setheaderData({ [name]: "" });
    }
  };

  console.log(published);

  return (
    <Container className="planList">
      <Table tableContainer="79.5vh" tableHeight="72vh">
        <div className="title">
          <span>Plan List</span>
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
              <option value="Basic Plan">Basic</option>
              <option value="Standard Plan">Standard</option>
              <option value="Premium Plan">Premium</option>
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

export default PlanList;
