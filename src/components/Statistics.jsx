import { useState, useEffect } from "react";
import axios from "axios";

const Statistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({});
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
      fetchStatistics(selectedMonth);
    }
  }, [selectedMonth]);

  const fetchStatistics = async (month) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/statistics/${month}`
      );
      setStatistics(response.data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch statistics.");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6 text-center">
        Statistics: {months[selectedMonth - 1]}
      </h1>

      {error ? (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center">
          {error}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-green-100 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-4">
            <h2 className="text-lg font-semibold text-green-700">
              Total Sales :
            </h2>
            <p className="text-xl font-bold text-green-900">
              ₹{statistics.totalSale || 0}
            </p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-4">
            <h2 className="text-lg font-semibold text-blue-700">
              Total Sold Items :
            </h2>
            <p className="text-xl font-bold text-blue-900">
              {statistics.totalSold || 0}
            </p>
          </div>

          <div className="p-4 bg-red-100 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-4">
            <h2 className="text-lg font-semibold text-red-700">
              Not Sold Items :
            </h2>
            <p className="text-xl font-bold text-red-900">
              {statistics.totalUnsold || 0}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
