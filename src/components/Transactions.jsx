import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

const Transactions = ({ selectedMonth, setSelectedMonth }) => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const months = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];

  useEffect(() => {
    if (selectedMonth) {
      fetchTransactions(selectedMonth);
    }
  }, [selectedMonth, currentPage, limit, search]);

  const fetchTransactions = async (month) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/transactions/${month}?search=${search}&page=${currentPage}&limit=${limit}`
      );
      setTransactions(response.data.data);
    } catch (err) {
      setError("Failed to fetch transactions.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-5 w-full">
      {/* Search & Month Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700 text-center md:text-left">
          TRANSACTIONS DASHBOARD
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 bg-white text-black"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>

          {/* Month Selector */}
          <select
            className="w-full sm:w-auto p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-black focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            value={selectedMonth}
          >
            <option value="">Select Month</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto mt-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">{error}</span>
            <button
              onClick={() => setError("")}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              ✖
            </button>
          </div>
        )}

        <table className="w-full border border-gray-300 rounded-lg shadow-lg">
          <thead className="text-black bg-gray-100">
            <tr className="border-b border-gray-300">
              <th className="p-3 border-r">ID</th>
              <th className="p-3 border-r">Title</th>
              <th className="p-3 border-r hidden md:table-cell">Description</th>
              <th className="p-3 border-r">Price</th>
              <th className="p-3 border-r">Sold</th>
              <th className="p-3">Category</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-gray-300">
                <td className="p-3 border-r">{tx.id}</td>
                <td className="p-3 border-r">{tx.title}</td>
                <td className="p-3 border-r hidden md:table-cell">
                  {tx.description}
                </td>
                <td className="p-3 border-r">{tx.price}</td>
                <td className="p-3 border-r">{tx.sold ? "Yes" : "No"}</td>
                <td className="p-3">{tx.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 rounded-lg gap-4">
        <span className="text-black font-medium text-lg">
          Page: {currentPage}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 text-black bg-gray-200 hover:bg-gray-300 rounded-lg transition duration-200"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 text-black bg-gray-200 hover:bg-gray-300 rounded-lg transition duration-200"
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-black font-medium text-lg">Per page : {limit}</p>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
