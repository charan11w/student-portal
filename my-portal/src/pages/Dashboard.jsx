import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const inputClass =
  "w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition";

const buttonPrimaryClass =
  "bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition";

const buttonSecondaryClass =
  "bg-gray-300 px-5 py-2 rounded hover:bg-gray-400 transition";

const Dashboard = () => {
  const { studentProfile, updateStudentProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: studentProfile.name || "",
    phone: studentProfile.phone || "",
    email: studentProfile.email || "",
    altEmail: studentProfile.altEmail || "",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateStudentProfile(formData);
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: studentProfile.name || "",
      phone: studentProfile.phone || "",
      email: studentProfile.email || "",
      altEmail: studentProfile.altEmail || "",
    });
    setEditing(false);
  };

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      {/* Top Section: Personal Data and Graduation Details */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Personal Data Card */}
        <section
          aria-labelledby="personal-data-title"
          className="bg-white border border-gray-300 rounded-lg p-6 flex-1 hover:shadow-lg transition-shadow duration-300"
        >
          <h2
            id="personal-data-title"
            className="text-xl font-semibold mb-5 border-b border-gray-400 pb-2"
          >
            Personal Data
          </h2>

          <p>
            <span className="font-medium">ID:</span> {studentProfile.id}
          </p>

          {editing ? (
            <form
              className="mt-6 space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label htmlFor="name" className="block font-medium mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block font-medium mb-1">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                  autoComplete="tel"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="altEmail" className="block font-medium mb-1">
                  Alternative Email
                </label>
                <input
                  id="altEmail"
                  name="altEmail"
                  type="email"
                  value={formData.altEmail}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleSave}
                  className={buttonPrimaryClass}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={buttonSecondaryClass}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-6 space-y-4">
              <p>
                <span className="font-medium">Name:</span> {studentProfile.name}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {studentProfile.phone}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {studentProfile.email}
              </p>
              <p>
                <span className="font-medium">Alternative Email:</span>{" "}
                {studentProfile.altEmail}
              </p>

              <button
                type="button"
                onClick={() => setEditing(true)}
                className={buttonPrimaryClass}
              >
                Edit Personal Data
              </button>
            </div>
          )}
        </section>

        {/* Graduation Details Card */}
        <section
          aria-labelledby="graduation-details-title"
          className="bg-white border border-gray-300 rounded-lg p-6 flex-1 hover:shadow-lg transition-shadow duration-300"
        >
          <h2
            id="graduation-details-title"
            className="text-xl font-semibold mb-5 border-b border-gray-400 pb-2"
          >
            Graduation Details
          </h2>

          <p>
            <span className="font-medium">Bachelors:</span>{" "}
            {studentProfile.bachelors}
          </p>
          <p>
            <span className="font-medium">Discipline:</span>{" "}
            {studentProfile.discipline}
          </p>
          <p>
            <span className="font-medium">Joining Date:</span>{" "}
            {studentProfile.joiningDate}
          </p>
        </section>
      </div>

      {/* Admin Notifications */}
      <section
        aria-labelledby="admin-notifications-title"
        className="bg-white border border-gray-300 rounded-lg shadow p-6 max-w-full"
      >
        <h2
          id="admin-notifications-title"
          className="text-xl font-semibold mb-5 border-b border-gray-400 pb-2"
        >
          Admin Notifications
        </h2>

        {studentProfile.adminNotifications?.length > 0 ? (
          <ul className="space-y-3">
            {studentProfile.adminNotifications.map(
              ({ id, message, status }) => (
                <li
                  key={id}
                  className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded p-3 hover:bg-gray-100 transition"
                >
                  <span className="text-gray-800">{message}</span>
                  <span
                    className={`px-3 py-1 rounded text-sm font-semibold ${
                      status === "Pending"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {status}
                  </span>
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No notifications available.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
