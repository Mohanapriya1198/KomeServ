import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { transactionData } from "../../DummyData";
import { DataGrid } from "@mui/x-data-grid";
import Table from "../../components/table/Table";
import "./Transaction.css";

const Transaction = () => {
  const [data, setData] = useState([]);
  const [headerData, setheaderData] = useState({
    status: "",
  });
  useEffect(() => {
    if (headerData.status) {
      const filterData = transactionData.filter((d, index) => {
        return d.planType === headerData.status;
      });
      let newData = [];

      filterData.map((d, index) => {
        return newData.push({ sn: index + 1, ...d });
      });
      setData(newData);
    } else {
      let newData = [];

      transactionData.map((d, index) => {
        return newData.push({ sn: index + 1, ...d });
      });

      setData(newData);
    }
  }, [headerData]);

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

  const changeHandler = (e, id) => {
    const { name, value } = e.target;

    if (value) {
      setheaderData({ [name]: value });
    } else {
      setheaderData({ [name]: "" });
    }
  };
  return (
    <Container className="transaction-table">
      <Table tableContainer="79.5vh" tableHeight="72vh">
        <div className="title">
          <span>Overall Transaction List</span>

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

export default Transaction;
