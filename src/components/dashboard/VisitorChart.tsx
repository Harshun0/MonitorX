
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
import { TimeSeriesDataPoint } from "@/utils/mock-data";

interface VisitorChartProps {
  data: TimeSeriesDataPoint[];
}

const VisitorChart: React.FC<VisitorChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis
          dataKey="time"
          stroke="rgba(255,255,255,0.5)"
          tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
          tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
        />
        <YAxis
          stroke="rgba(255,255,255,0.5)"
          tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
          tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "0.375rem",
            color: "white",
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8B5CF6"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#8B5CF6", stroke: "white", strokeWidth: 1 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default VisitorChart;
