import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import logo from "../assets/img/logo-01.png";

export const generatePDF = (Data, formData) => {
  const doc = new jsPDF();

  const tableColumn = ["S.No", "Name", "Processing", "Completed", "Cancelled"];

  const tableRows = [];

  const data = Data.map((d, i) => {
    return { ...d, sl: i + 1 };
  });

  data.forEach((ele) => {
    const Data = [
      ele.sl,
      ele.name,
      ele.inProgress,
      ele.completed,
      ele.cancelled,
    ];

    tableRows.push(Data);
  });

  doc.text("Service person report", 14, 30).setFontSize(14);

  doc
    .setFontSize(10)
    .text(`Date - ${formData.startDate} to ${formData.endDate}`, 14, 38);

  doc.addImage(logo, "png", 13, 8, 60, 15);
  doc.autoTable(tableColumn, tableRows, { startY: 45 });
  doc.save(`report_servicePerson.pdf`);
};

export function getSheetData(Data, formData) {
  const header = ["S.No", "Name", "Processing", "Completed", "Cancelled"];

  const Datas = [];

  const data = Data.map((d, i) => {
    return { ...d, sl: i + 1 };
  });

  data.forEach((ele) => {
    const { sl, name, inProgress, completed, cancelled } = ele;
    Datas.push({
      sl,
      name,
      inProgress,
      completed,
      cancelled,
    });
  });
  const ws = XLSX.utils.book_new();
  XLSX.utils.sheet_add_aoa(ws, [header]);
  XLSX.utils.sheet_add_json(ws, Datas, { origin: "A2", skipHeader: true });
  const wb = { Sheets: { Datas: ws }, SheetNames: ["Datas"] };
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true,
  });
  const finalData = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet ",
  });
  FileSaver.saveAs(finalData, `report_servicePerson.xlsx`);
}
