import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

// Hook to detect outside clicks
function useOutsideClick(ref, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
}

// Modal to edit personal data
const EditPersonalDataModal = ({ profile, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: profile.name || "",
    phone: profile.phone || "",
    email: profile.email || "",
    altEmail: profile.altEmail || "",
  });
  const [initialData] = useState(formData);
  const modalRef = useRef();
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  const tryClose = () => {
    if (hasChanges) {
      setShowDiscardConfirm(true);
    } else {
      onClose();
    }
  };

  useOutsideClick(modalRef, tryClose);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const discardChanges = () => {
    setShowDiscardConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-full max-w-md relative"
      >
        <h2 className="text-xl font-semibold mb-4">Edit Personal Data</h2>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">ID (readonly)</label>
            <input
              type="text"
              value={profile.id}
              disabled
              className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Alternative Email</label>
            <input
              name="altEmail"
              type="email"
              value={formData.altEmail}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={tryClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(formData);
              onClose();
            }}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>

        {/* Discard confirmation */}
        {showDiscardConfirm && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center rounded-lg">
            <p className="mb-4 text-center text-gray-700">
              You have unsaved changes. Discard them?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDiscardConfirm(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Keep Editing
              </button>
              <button
                onClick={discardChanges}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Discard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Modal to change password
const ChangePasswordModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [initialData] = useState(formData);
  const modalRef = useRef();
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [error, setError] = useState("");

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  const tryClose = () => {
    if (hasChanges) {
      setShowDiscardConfirm(true);
    } else {
      onClose();
    }
  };

  useOutsideClick(modalRef, tryClose);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSave = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
    // TODO: Implement actual password change logic (e.g. API call)
    alert("Password changed successfully!");
    onClose();
  };

  const discardChanges = () => {
    setShowDiscardConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 w-full max-w-md relative"
      >
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Old Password</label>
            <input
              name="oldPassword"
              type="password"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              autoComplete="current-password"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">New Password</label>
            <input
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              autoComplete="new-password"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-600 mt-3 font-medium text-center">{error}</p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={tryClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Change Password
          </button>
        </div>

        {/* Discard confirmation */}
        {showDiscardConfirm && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center rounded-lg">
            <p className="mb-4 text-center text-gray-700">
              You have unsaved changes. Discard them?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDiscardConfirm(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Keep Editing
              </button>
              <button
                onClick={discardChanges}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Discard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Header({ breadcrumb }) {
  const { logout, studentProfile, updateStudentProfile } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-60 right-0 h-20 bg-blue-600 text-white flex items-center justify-between px-6 shadow-md z-50">
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
