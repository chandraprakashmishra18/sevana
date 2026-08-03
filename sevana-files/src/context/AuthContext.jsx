import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  registerUser,
  loginUser,
  fetchCurrentUser,
} from "../services/auth.service";

const STORAGE_KEYS = {
  ACCESS_TOKEN: "sevana_access_token",
  REFRESH_TOKEN: "sevana_refresh_token",
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const isAuthenticated = !!user;

  // ----------------------------
  // Storage Helpers
  // ----------------------------

  const saveTokens = (accessToken, refreshToken) => {
    if (accessToken) {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    }

    if (refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
  };

  const clearTokens = () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  };

  const getAccessToken = () =>
    localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  // ----------------------------
  // Restore Session
  // ----------------------------

  const restoreSession = async () => {
    const token = getAccessToken();

    if (!token) {
      setLoading(false);
      setInitialized(true);
      return;
    }

    // client.js currently reads "sevana_token"
    // Keep it synced until we update client.js.
    localStorage.setItem("sevana_token", token);

    try {
      const me = await fetchCurrentUser();
      setUser(me.user || me);
    } catch (err) {
      console.error(err);
      clearTokens();
      localStorage.removeItem("sevana_token");
      setUser(null);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  // ----------------------------
  // Register
  // ----------------------------

  const signUp = async (payload) => {
    const result = await registerUser(payload);

    const accessToken = result.accessToken;
    const refreshToken = result.refreshToken;
    const currentUser = result.user;

    saveTokens(accessToken, refreshToken);

    // keep axios interceptor working
    localStorage.setItem("sevana_token", accessToken);

    setUser(currentUser);

    return currentUser;
  };

  // ----------------------------
  // Login
  // ----------------------------

  const signIn = async (payload) => {
    const result = await loginUser(payload);

    const accessToken = result.accessToken;
    const refreshToken = result.refreshToken;
    const currentUser = result.user;

    saveTokens(accessToken, refreshToken);

    // keep axios interceptor working
    localStorage.setItem("sevana_token", accessToken);

    setUser(currentUser);

    return currentUser;
  };

  // ----------------------------
  // Refresh User
  // ----------------------------

  const refreshUser = async () => {
    const me = await fetchCurrentUser();
    setUser(me.user || me);
    return me;
  };

  // ----------------------------
  // Logout
  // ----------------------------

  const logout = () => {
    clearTokens();
    localStorage.removeItem("sevana_token");
    setUser(null);
  };

  useEffect(() => {
    restoreSession();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      initialized,
      isAuthenticated,
      signIn,
      signUp,
      logout,
      refreshUser,
      setUser,
    }),
    [user, loading, initialized]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}