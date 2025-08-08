import React, { useState } from "react";
import { courses } from "../utils/MockData";

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    if (term === "") {
      setFilteredCourses(courses);
      return;
    }

    const filtered = courses.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.courseId.toLowerCase().includes(term)
    );
    setFilteredCourses(filtered);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredCourses(courses);
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md max-w-7xl">
      {/* Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start mb-6 gap-3">
        <input
          type="text"
          placeholder="Search by Course Name or Course ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          aria-label="Search courses"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          aria-label="Search courses button"
          type="button"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          aria-label="Clear filters button"
          type="button"
        >
          Clear All
        </button>
      </div>

      {/* Courses Table */}
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Course Name",
                "Course ID",
                "Credit Units",
                "Grade",
                "Grade Points",
              ].map((header) => (
                <th
                  key={header}
                  className="p-3 border border-gray-300 text-left font-semibold text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map(
                ({ courseId, name, credit, grade, points }) => (
                  <tr
                    key={courseId}
                    className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <td className="p-3 border border-gray-200">{name}</td>
                    <td className="p-3 border border-gray-200">{courseId}</td>
                    <td className="p-3 border border-gray-200">{credit}</td>
                    <td className="p-3 border border-gray-200">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        grade === "A"
                          ? "bg-green-100 text-green-800"
                          : grade === "B"
                          ? "bg-yellow-100 text-yellow-800"
                          : grade === "C"
                          ? "bg-orange-100 text-orange-800"
                          : grade === "D"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-600"
                      }
                    `}
                      >
                        {grade}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200">{points}</td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center text-gray-500 italic"
                >
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
