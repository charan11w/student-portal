import React, { useState } from "react";
import {
  Header,
  Sidebar,
  Breadcrumb,
  Dashboard,
  Courses,
  CGPA,
  Assignments,
} from "./routesConfig";

export default function App() {
  const [active, setActive] = useState("Dashboard");

  // Modal open handlers (implement your modal logic)
  const openEditModal = () => {
    alert("Open Edit Personal Data Modal");
  };
  const openPasswordModal = () => {
    alert("Open Change Password Modal");
  };

  const logout = () => {
    alert("Logged out");
    // Add your logout logic here
  };

  const renderPage = () => {
    return (
      <div>
        <h2
          className="text-2xl sm:text-3xl font-extrabold mb-6
             bg-gradient-to-r from-blue-600 to-indigo-600
             bg-clip-text text-transparent
             border-b-2 border-blue-300 pb-2 pt-5"
        >
          {active}
        </h2>

        {(() => {
          switch (active) {
            case "Dashboard":
              return <Dashboard />;
            case "Courses":
              return <Courses />;
            case "CGPA":
              return <CGPA />;
            case "Assignments":
              return <Assignments />;
            default:
              return null;
          }
        })()}
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar active={active} setActive={setActive} onLogout={logout} />

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          breadcrumb={<Breadcrumb active={active} />}
          logout={logout}
          openEditModal={openEditModal}
          openPasswordModal={openPasswordModal}
        />
        <main
          className="flex-1 bg-gray-100 p-6 overflow-auto"
          style={{ marginTop: "56px" }} // add margin-top same as header height (e.g. 14 * 4 = 56px)
        >
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
