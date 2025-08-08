import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Sidebar from "../component/Sidebar"; // your Sidebar component

export default function Layout({
  breadcrumb,
  studentProfile,
  updateStudentProfile,
  logout,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sidebarWidth = 240; // 60 * 4 = 240px, matches w-60
  const headerHeight = 56; // h-14 = 14 * 4 = 56px

  return (
    <>
      {/* Logo top-left fixed */}
      <div
        className="fixed top-0 left-0 w-60 h-14 bg-blue-700 flex items-center justify-center text-white font-bold text-xl shadow-md z-50"
        style={{ lineHeight: `${headerHeight}px` }}
      >
        🎓 Student Portal
      </div>

      {/* Header fixed top, shifted right by sidebar width */}
      <header
        className="fixed top-0 left-60 right-0 h-14 bg-blue-600 text-white flex items-center justify-between px-6 shadow-md z-40"
        style={{ height: headerHeight }}
      >
        {/* Breadcrumb left */}
        <div className="text-lg font-semibold">{breadcrumb}</div>

        {/* User menu right */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((open) => !open)}
            className="focus:outline-none"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            aria-label="User menu"
          >
            <FaUserCircle size={28} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg border z-50">
              <button
                onClick={() => {
                  setEditModalOpen(true);
                  setDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Edit Personal Data
              </button>
              <button
                onClick={() => {
                  setPasswordModalOpen(true);
                  setDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Change Password
              </button>
              <button
                onClick={() => {
                  logout();
                  setDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar fixed left, below header */}
      <Sidebar
        active={"Dashboard"} // pass your active state here
        setActive={() => {}} // pass your setter here
        onLogout={logout}
        style={{
          position: "fixed",
          top: headerHeight,
          left: 0,
          height: `calc(100vh - ${headerHeight}px)`,
          width: sidebarWidth,
          zIndex: 30,
        }}
        className="bg-gray-900 text-white"
      />

      {/* Main content shifted right by sidebar width and down by header height */}
      <main
        className="p-6 bg-gray-100 min-h-screen"
        style={{
          marginLeft: sidebarWidth,
          marginTop: headerHeight,
        }}
      >
        {/* Your main page content goes here */}
      </main>

      {/* Modals */}
      {editModalOpen && (
        <EditPersonalDataModal
          profile={studentProfile}
          onClose={() => setEditModalOpen(false)}
          onSave={(data) => updateStudentProfile(data)}
        />
      )}
      {passwordModalOpen && (
        <ChangePasswordModal onClose={() => setPasswordModalOpen(false)} />
      )}
    </>
  );
}
