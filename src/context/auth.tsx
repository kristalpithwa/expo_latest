import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load auth status from storage on mount
    async function loadAuth() {
      try {
        const val = await AsyncStorage.getItem("isAuthenticated");
        if (val === "true") {
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error("Failed to load auth status:", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadAuth();
  }, []);

  const login = async () => {
    try {
      await AsyncStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
    } catch (e) {
      console.error("Failed to login:", e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
    } catch (e) {
      console.error("Failed to logout:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
