import { useState } from "react";
import { assignments } from "../utils/MockData";

export default function Assignments() {
  const [filters, setFilters] = useState({ courseId: "", assignmentId: "" });
  const [filteredData, setFilteredData] = useState(assignments);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    let filtered = assignments;

    if (filters.courseId.trim() !== "") {
      filtered = filtered.filter((a) =>
        a.courseId.toLowerCase().includes(filters.courseId.trim().toLowerCase())
      );
    }

    if (filters.assignmentId.trim() !== "") {
      filtered = filtered.filter((a) =>
        a.assignmentId
          .toLowerCase()
          .includes(filters.assignmentId.trim().toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const handleClear = () => {
    setFilters({ courseId: "", assignmentId: "" });
    setFilteredData(assignments);
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          name="courseId"
          placeholder="Filter by Course ID"
          value={filters.courseId}
          onChange={handleChange}
          className="flex-1 min-w-[180px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="text"
          name="assignmentId"
          placeholder="Filter by Assignment ID"
          value={filters.assignmentId}
          onChange={handleChange}
          className="flex-1 min-w-[180px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
        >
          Clear Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b border-gray-300 text-left">
                Assignment ID
              </th>
              <th className="p-3 border-b border-gray-300 text-left">
                Course ID
              </th>
              <th className="p-3 border-b border-gray-300 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No assignments found.
                </td>
              </tr>
            ) : (
              filteredData.map(({ assignmentId, courseId, status }) => (
                <tr
                  key={assignmentId}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="p-3 border-b border-gray-200">
                    {assignmentId}
                  </td>
                  <td className="p-3 border-b border-gray-200">{courseId}</td>
                  <td className="p-3 border-b border-gray-200">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        status.toLowerCase() === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
