import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const Piechart = ({ selectedMonth }) => {
  const [pieData, setPieData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedMonth) {
      fetchPieData(selectedMonth);
    }
  }, [selectedMonth]);

  const fetchPieData = async (month) => {
    try {
      const response = await axios.get(API_BASE_URL + `/pie-chart/${month}`);

      const formattedData = response.data.data.map((item, index) => ({
        name: item.category,
        value: item.item_count,
        color: ["#4CAF50", "#2196F3", "#F44336", "#FFC107", "#9C27B0"][
          index % 5
        ],
      }));

      setPieData(formattedData);
      setError("");
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to fetch statistics.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col items-center min-h-[350px]">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Product Categories
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {pieData.length === 0 ? (
        <p className="text-center">No data available for {selectedMonth}.</p>
      ) : (
        <div className="w-full flex justify-center">
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default Piechart;
