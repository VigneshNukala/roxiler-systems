import { useState, useEffect } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Barchart = ({ selectedMonth }) => {
  const [barData, setBarData] = useState([]);
  const [error, setError] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (selectedMonth) {
      fetchBarchartData(selectedMonth);
    }
  }, [selectedMonth]);

  const fetchBarchartData = async (month) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/bar-chart/${month}`
      );
      const formattedData = response.data.data.map((item) => ({
        range: item.price_range,
        count: item.item_count,
      }));
      setBarData(formattedData);
      setError("");
    } catch (err) {
      setError("Failed to fetch bar chart data.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-green-50 p-6 rounded-lg shadow-lg mt-5 w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6 text-center">
        Bar Chart Stats : {months[selectedMonth - 1]}
      </h1>

      {error ? (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center">
          {error}
        </div>
      ) : (
        <div className="w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid
                stroke="#ccc"
                strokeDasharray="0"
                vertical={false}
              />

              <XAxis
                dataKey="range"
                label={{
                  value: "Price Range",
                  position: "insideBottom",
                  offset: 10,
                }}
              />
              <YAxis
                label={{
                  value: "Item Count",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Legend />
              <Bar dataKey="count" fill="#4FC3F7" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Barchart;
