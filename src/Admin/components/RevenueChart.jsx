import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function RevenueChart({ data }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
      <h3 className="font-semibold mb-3">Monthly Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid />
          <XAxis dataKey="month" />
          <YAxis
            domain={[0, (datamax) => Math.ceil(datamax * 1.2)]}
            tickFormatter={(value) => `Rp${(value / 1_000_000).toFixed(1)} Jt`}
          />
          <Tooltip
            tickFormatter={(value) => `Rp${(value / 1_000_000).toFixed(1)} Jt`}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="black"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;
