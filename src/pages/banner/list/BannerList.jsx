import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import Table from "../../../components/table/Table";
import { BannerData } from "../../../DummyData";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import "./BannerList.css";

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

const BannerList = () => {
  const history = useHistory();
  const [data, setData] = useState();
  const [headerData, setheaderData] = useState({
    type: "",
  });
  const [published, setPublished] = useState({
    switch: "",
    id: "",
  });
  const [id, setId] = useState();
  const [moreDetail, setmoreDetail] = useState(false);
  useEffect(() => {
    if (headerData.type) {
      if (headerData.type === "All") {
        const Data = BannerData.map((d, index) => {
          return { sn: index + 1, ...d };
        });
        setData(Data);
      } else {
        const newData = [];
        const filterData = BannerData.filter((d) => {
          return d.type === headerData.type;
        });
        filterData.map((d, index) => {
          return newData.push({ sn: index + 1, ...d });
        });

        setData(newData);
      }
    } else {
      const Data = BannerData.map((d, index) => {
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
      pathname: "/banner/details/" + data.id,
      state: data,
    });
  };

  const editHandler = (data) => {
    history.push({ pathname: "/banner/edit/" + data.id, state: data });
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
      field: "image",
      headerName: "Banner Image",
      width: 300,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="banner">
            <img src={params.value} alt="Banner" />
          </div>
        );
      },
    },
    {
      field: "type",
      headerName: "Banner Type",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "published",
      headerName: "Published",
      width: 250,
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
    if (name === "type") {
      if (value) {
        setheaderData({ [name]: value });
      } else {
        setheaderData({ [name]: "" });
      }
    } else {
      if (checked) {
        setPublished({ ...published, [name]: value, id });
      } else {
        setPublished({ ...published, [name]: "Disabled", id });
      }
    }
  };

  return (
    <Container className="bannerList">
      <Table tableContainer="79.5vh" tableHeight="72vh">
        <div className="title">
          <span>Banner List</span>

          <div className="filter">
            <select name="type" id="type" onChange={changeHandler}>
              <option value="All">All</option>
              <option value="Main Banner">Main Banner</option>
              <option value="Secondary Banner">Secondary Banner</option>
              <option value="Popup Banner">Popup Banner</option>
              <option value="Covid Banner">Covid Banner</option>
            </select>
          </div>
        </div>

        <DataGrid
          rowHeight={120}
          rows={data || []}
          columns={columns}
          pageSize={3}
          rowsPerPageOptions={[3]}
          disableSelectionOnClick
          disableColumnMenu
        />
      </Table>
    </Container>
  );
};

export default BannerList;
