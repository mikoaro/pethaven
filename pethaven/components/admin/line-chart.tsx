"use client";

import {
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const data = [
  { date: "6/25/2024", revenue: 800 },
  { date: "6/26/2024", revenue: 2000 },
  { date: "6/27/2024", revenue: 700 },
];

export function LineChart() {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <RechartsLineChart data={data}>
        {/* Grid lines */}
        <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />

        {/* X and Y Axes */}
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine axisLine />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine
          axisLine
          tickFormatter={(value) => `${value}`}
        />

        {/* Line */}
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#2563eb"
          strokeWidth={2}
          dot={{ strokeWidth: 2, r: 4 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
