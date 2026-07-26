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
        const data = await getMe();
        setUser(data.user);
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
    const data = await login(credentials);

    localStorage.setItem(TOKEN_KEY, data.token);

    setUser(data.user);

    return data.user;
  };

  const signUp = async (payload) => {
    const data = await register(payload);

    localStorage.setItem(TOKEN_KEY, data.token);

    setUser(data.user);

    return data.user;
  };

  const refreshUser = async () => {
    const data = await getMe();
    setUser(data.user);
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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);