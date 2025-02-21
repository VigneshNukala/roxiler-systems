import React, { useState } from "react";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const months = ["January", "February", "March", "April", "May", "June"];
  const transactions = [
    {
      id: 1,
      title: "Product A",
      description: "Sample Item",
      price: "$100",
      sold: "Yes",
      category: "Electronics",
    },
    {
      id: 2,
      title: "Product B",
      description: "Another Item",
      price: "$150",
      sold: "No",
      category: "Furniture",
    },
    {
      id: 3,
      title: "Product C",
      description: "Third Item",
      price: "$200",
      sold: "Yes",
      category: "Clothing",
    },
    {
      id: 4,
      title: "Product D",
      description: "Fourth Item",
      price: "$250",
      sold: "No",
      category: "Accessories",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 min-h-screen rounded-lg">
      {/* Heading */}
      {/* Search & Month Filter */}
      <div className="flex items-between gap-4 mb-6 p-4 rounded-lg">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Transactions Dashboard
        </h1>
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 bg-white text-black"
        />

        <select
          className="p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-black focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto p-4">
        <table className="w-full text-left">
          <thead className="text-black">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Price</th>
              <th className="p-3">Sold</th>
              <th className="p-3">Category</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {transactions.map((tx, index) => (
              <tr key={tx.id}>
                <td className="p-3">{tx.id}</td>
                <td className="p-3">{tx.title}</td>
                <td className="p-3">{tx.description}</td>
                <td className="p-3">{tx.price}</td>
                <td className="p-3">{tx.sold}</td>
                <td className="p-3">{tx.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6 p-4 rounded-lg">
        <span className="text-black font-medium">Page : {currentPage}</span>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 text-black hover:bg-gray-600 rounded-lg transition duration-200"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 text-black hover:bg-gray-600 rounded-lg transition duration-200"
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-black">Per page:</span>
          <select
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 text-black"
            onChange={(e) => setLimit(e.target.value)}
          >
            {[10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
