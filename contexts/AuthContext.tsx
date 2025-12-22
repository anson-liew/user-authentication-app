import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthResult {
  success: boolean;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]); // cache 所有注册用户

  useEffect(() => {
    const loadUserData = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      const savedUsers = await AsyncStorage.getItem("allUsers");

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedUsers) setAllUsers(JSON.parse(savedUsers));
    };
    loadUserData();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    const foundUser = allUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      await AsyncStorage.setItem("user", JSON.stringify(foundUser));
      return { success: true };
    }
    return { success: false, message: "Incorrect email or password" };
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResult> => {
    if (allUsers.some((u) => u.email === email)) {
      return { success: false, message: "Email already exists" };
    }

    const newUser: User = { name, email, password };
    const updatedUsers = [...allUsers, newUser];
    setAllUsers(updatedUsers);
    setUser(newUser);

    await AsyncStorage.setItem("allUsers", JSON.stringify(updatedUsers));
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
