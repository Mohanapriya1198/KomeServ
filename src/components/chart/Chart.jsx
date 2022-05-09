import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Chart.css";

const Chart = ({ data, title, datakey, grid, stroke }) => {
  return (
    <div className="chart">
      <h4 className="chartTitle">{title}</h4>
      <ResponsiveContainer width="100%" aspect={6 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke={stroke} />
          <Line type="monotone" dataKey={datakey} stroke={stroke} />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
