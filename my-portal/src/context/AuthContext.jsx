import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // New: Store student profile
  const [studentProfile, setStudentProfile] = useState({
    name: "John Doe",
    id: "21f41a05a0",
    phone: "+91 9876543210",
    bachelors: "B.Tech",
    discipline: "CSE",
    joiningDate: "2022-08-01",
    email: "johndoe@example.com",
    altEmail: "johndoe.alt@example.com",
    adminNotifications: [
      { id: 1, message: "Fee payment due before 20th Aug", status: "Pending" },
      { id: 2, message: "Upload all certificates", status: "Pending" },
    ],
  });

  const login = (username, password) => {
    // Simple demo authentication
    if (username && password) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  // New: Update student profile data
  const updateStudentProfile = (updatedData) => {
    setStudentProfile((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        studentProfile, // added
        updateStudentProfile, // added
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
