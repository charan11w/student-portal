import { courses } from "../utils/MockData";
import { useMemo } from "react";

export default function CGPA() {
  // Calculate CGPA using useMemo for efficiency
  const cgpa = useMemo(() => {
    const totalCredits = courses.reduce((sum, c) => sum + c.credit, 0);
    if (totalCredits === 0) return 0;
    const weightedPoints = courses.reduce(
      (sum, c) => sum + c.credit * c.points,
      0
    );
    return weightedPoints / totalCredits;
  }, []);

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
      <table className="min-w-full table-auto border-collapse border border-gray-200 mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border border-gray-300 text-left font-semibold text-gray-700">
              Course Name
            </th>
            <th className="p-3 border border-gray-300 text-left font-semibold text-gray-700">
              Credit Units
            </th>
            <th className="p-3 border border-gray-300 text-left font-semibold text-gray-700">
              Grade Points
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map(({ courseId, name, credit, points }) => (
            <tr
              key={courseId}
              className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <td className="p-3 border border-gray-200">{name}</td>
              <td className="p-3 border border-gray-200">{credit}</td>
              <td className="p-3 border border-gray-200">{points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-xl font-semibold text-gray-800">
        Your CGPA: <span className="text-blue-600">{cgpa.toFixed(2)}</span>
      </div>
    </div>
  );
}
