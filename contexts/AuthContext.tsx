import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    if (email === "test@test.com" && password === "123456") {
      const loggedUser = { name: "Test User", email };
      setUser(loggedUser);
      await AsyncStorage.setItem("user", JSON.stringify(loggedUser));
      return { success: true };
    }
    return { success: false, message: "Incorrect credentials" };
  };

  const signup = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) return { success: false, message: "All fields are required" };
    if (!/\S+@\S+\.\S+/.test(email)) return { success: false, message: "Invalid email" };
    if (password.length < 6) return { success: false, message: "Password must be at least 6 characters" };

    const newUser = { name, email };
    setUser(newUser);
    await AsyncStorage.setItem("user", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
