import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { login, register, getMe } from "../api/authApi";

const AuthContext = createContext(null);

const TOKEN_KEY = "sevana_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getMe();

        // Backend returns { success, message, data }
        setUser(response.data);
      } catch (err) {
        console.error("Session restore failed:", err);
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const signIn = async (credentials) => {
    try {
      const response = await login(credentials);

      // response = { success, message, data }
      const { accessToken, user } = response.data;

      localStorage.setItem(TOKEN_KEY, accessToken);
      setUser(user);

      return user;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  const signUp = async (payload) => {
    try {
      const response = await register(payload);

      // response = { success, message, data }
      const { accessToken, user } = response.data;

      localStorage.setItem(TOKEN_KEY, accessToken);
      setUser(user);

      return user;
    } catch (error) {
      console.error("Register Error:", error);
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const response = await getMe();
      setUser(response.data);
    } catch (error) {
      console.error("Refresh User Error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      signIn,
      signUp,
      logout,
      refreshUser,
      isAuthenticated: !!user,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);