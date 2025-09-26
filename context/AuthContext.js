"use client";

import { getUserFromToken } from "@/lib/Auth/getUserFromToken";
import { logoutUser } from "@/lib/Auth/logout";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filteredEventId, setFilteredEventId] = useState(null);

   const [selectedOption, setSelectedOption] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await getUserFromToken();
      setUser(res);
      setLoading(false);
    } catch (err) {
      setUser(null);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
        fetchUser,
        filteredEventId,
        setFilteredEventId,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
