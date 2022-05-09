import React from "react";
import "./Table.css";

const Table = ({ children, title, tableContainer, tableHeight }) => {
  return (
    <div className="table-container" style={{ height: tableContainer }}>
      <div className="table" style={{ height: tableHeight }}>
        {children}
      </div>
    </div>
  );
};

export default Table;
