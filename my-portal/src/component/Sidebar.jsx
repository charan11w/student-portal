import React from "react";
import {
  FaTachometerAlt,
  FaBookOpen,
  FaCalculator,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

const SIDEBAR_WIDTH = 240; // 15rem

export default function Sidebar({ active, setActive, onLogout }) {
  const items = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Courses", icon: <FaBookOpen /> },
    { name: "CGPA", icon: <FaCalculator /> },
    { name: "Assignments", icon: <FaClipboardList /> },
  ];

  return (
    <aside
      className="flex flex-col bg-gray-900 text-white p-6"
      style={{ width: SIDEBAR_WIDTH, height: "100vh" }}
    >
      {/* Logo */}
      <div className="flex items-center mb-10">
        <span className="text-xl font-bold">🎓 Student Portal</span>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-4 flex-grow">
        {items.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => setActive(name)}
            className={`flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-700 transition-colors text-left ${
              active === name ? "bg-blue-600" : ""
            }`}
          >
            <span className="text-lg">{icon}</span>
            <span className="font-medium">{name}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-4 py-3 rounded hover:bg-red-600 transition-colors text-left text-black-500 mt-auto"
      >
        <FaSignOutAlt className="text-lg" />
        <span>Logout</span>
      </button>
    </aside>
  );
}
