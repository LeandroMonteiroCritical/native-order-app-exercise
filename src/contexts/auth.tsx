import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockClient } from "../data/mock";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (phoneNumber: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function checkAuthStatus() {
    try {
      const phone = await AsyncStorage.getItem("@auth:phone");
      setIsAuthenticated(!!phone);
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(phoneNumber: string) {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validate phone number (simple validation)
      if (phoneNumber.length < 10) {
        throw new Error("Invalid phone number");
      }

      // Mock validation against our mock client
      if (phoneNumber !== mockClient.phone) {
        throw new Error("Invalid credentials");
      }

      await AsyncStorage.setItem("@auth:phone", phoneNumber);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("@auth:phone");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
