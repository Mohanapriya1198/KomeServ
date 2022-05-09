import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { DataGrid } from "@mui/x-data-grid";
import { generatePDF, getSheetData } from "../../../invoice/servicePerson";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ServicePersonReportData } from "../../../DummyData";
import { useSelector } from "react-redux";
// import Loader from "../../loader/Loader";
import "./TableModal.css";

export default function BasicModal({ state, setState, formData }) {
  const handleClose = () => setState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const newdata = ServicePersonReportData.map((d, i) => {
      return { ...d, sl: i + 1 };
    });
    setData(newdata);
  }, []);

  const columns = [
    {
      field: "sl",
      headerName: "S.No",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "inProgress",
      headerName: "Processing",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "completed",
      headerName: "Completed",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "cancelled",
      headerName: "Cancelled",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
  ];

  const generatePdf = () => {
    generatePDF(ServicePersonReportData, formData);
  };

  const generateXlsx = () => {
    getSheetData(ServicePersonReportData, formData);
  };

  return (
    <div>
      <Modal
        open={state}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="table-modal">
          <div className="table">
            <div className="align">
              <div className="title">
                <KeyboardBackspaceIcon className="icon" onClick={handleClose} />
                <span>Service person report</span>
              </div>
              <div className="inner-align">
                <div className="button-align">
                  <button onClick={generatePdf} className="pdf-Btn">
                    Export as Pdf
                  </button>
                  <button onClick={generateXlsx} className="xl-Btn">
                    Export as Excel
                  </button>
                </div>
              </div>
            </div>
            <DataGrid
              rows={data || []}
              columns={columns}
              pageSize={6}
              rowsPerPageOptions={[6]}
              disableSelectionOnClick
              disableColumnMenu
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
