import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import Table from "../../../components/table/Table";
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
import { useSelector, useDispatch } from "react-redux";
import {
  FetchCategoryList,
  DeleteCategory,
} from "../../../redux/category/CategoryAction";
import "./CategoryList.css";

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

const CategoryList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const categoryList = useSelector((d) => d.category.list);

  const [searchData, setSearchData] = useState({
    search: "",
  });
  const [id, setId] = useState();
  const [moreDetail, setmoreDetail] = useState(false);
  useEffect(() => {
    dispatch(FetchCategoryList());
  }, [dispatch]);
  useEffect(() => {
    if (searchData.search) {
      const filterData = categoryList?.filter((d) => {
        return (
          d.title.toLowerCase().includes(searchData.search.toLowerCase()) ||
          d.id === +searchData.search
        );
      });

      const finalData = filterData.map((d, i) => {
        return {
          ...d,
          image: "https://api.komeserv.com" + d.image,
          sn: i + 1,
        };
      });

      setData(finalData);
    } else {
      const finalData = categoryList?.map((d, i) => {
        return {
          ...d,
          image: "https://api.komeserv.com" + d.image,
          sn: i + 1,
        };
      });
      setData(finalData);
    }
  }, [searchData, categoryList]);

  const moreHandler = (id) => {
    setId(id);
    setmoreDetail((prev) => !prev);
  };

  const viewHandler = (data) => {
    history.push({ pathname: "/category/details/" + data.id, state: data });
  };

  const editHandler = (data) => {
    history.push({ pathname: "/category/edit/" + data.id, state: data });
  };

  const deleteHandler = (data) => {
    history.push({ pathname: "/category/delete/" + data.id, state: data });
  };

  const columns = [
    {
      field: "sn",
      headerName: "S.No",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "id",
      headerName: "ID",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "image",
      headerName: "Category Image",
      width: 250,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="category">
            <img src={params.value} alt="category" />
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "Category Name",
      width: 250,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="category">
            <span>{params.value}</span>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 170,
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
                    <IconButton onClick={() => deleteHandler(params.row)}>
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
    <Container className="categoryList">
      <Table tableContainer="79.5vh" tableHeight="72vh">
        <div className="title">
          <span>Category List</span>
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

export default CategoryList;
