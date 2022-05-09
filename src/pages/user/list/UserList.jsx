import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import Table from "../../../components/table/Table";
import { UserData } from "../../../DummyData";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useHistory, useParams } from "react-router-dom";
import "./UserList.css";
import { useSelector, useDispatch } from "react-redux";
import { FetchUserList, DeleteUser } from "../../../redux/user/UserAction";

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

const UserList = () => {
  const history = useHistory();
  const [data, setData] = useState();
  const UserList = useSelector((d) => d.user.list);
  console.log(UserList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchUserList());
  }, [dispatch]);
  const [searchData, setSearchData] = useState({
    search: "",
  });
  const [id, setId] = useState();
  const [moreDetail, setmoreDetail] = useState(false);
  useEffect(() => {
    if (searchData.search) {
      const newData = [];
      const filterData = UserData.filter((d) => {
        return (
          d.id.includes(searchData.search) ||
          d.name.toLowerCase().includes(searchData.search.toLowerCase()) ||
          d.mobileNumber.includes(searchData.search) ||
          d.pincode.includes(searchData.search)
        );
      });
      filterData.map((d, index) => {
        return newData.push({ sn: index + 1, ...d });
      });

      setData(newData);
    } else {
      const Data = UserList?.map((d, index) => {
        return { sn: index + 1, ...d };
      });
      setData(Data);
    }
  }, [searchData, UserList]);

  const moreHandler = (id) => {
    setId(id);
    setmoreDetail((prev) => !prev);
  };

  const viewHandler = (data) => {
    history.push({ pathname: "/user/details/" + data.id, state: data });
  };

  const editHandler = (data) => {
    history.push({ pathname: "/user/edit/" + data.id, state: data });
  };
  const params = useParams();

  // const userData = useSelector((d) => d.user.list);
  // const [subDataList, setsubDataList] = useState([]);

  // useEffect(() => {
  //   const filterData = userData?.filter((d) => d.id === +params.id);
  //   setsubDataList(filterData);
  // }, [userData]);

  const deleteHandler = (id) => {
    console.log(id);
    dispatch(DeleteUser({ id: +id }));
    dispatch(FetchUserList());
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
      field: "first_name",
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
      field: "username",
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
      setSearchData({ [name]: value });
    } else {
      setSearchData({ [name]: "" });
    }
  };

  return (
    <Container className="userList">
      <Table tableContainer="79.5vh" tableHeight="72vh">
        <div className="title">
          <span>User List</span>
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

export default UserList;
