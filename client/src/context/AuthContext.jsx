import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../api/auth.api.js";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const clearSession = useCallback(() => {
    localStorage.removeItem("authToken");
    setUser(null);
  }, []);

  const restoreSession = useCallback(async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsInitializing(false);
      return;
    }

    try {
      const response = await getCurrentUser();
      setUser(response.data.user);
    } catch {
      clearSession();
    } finally {
      setIsInitializing(false);
    }
  }, [clearSession]);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    const handleUnauthorized = () => {
      clearSession();
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener(
        "auth:unauthorized",
        handleUnauthorized
      );
    };
  }, [clearSession]);

  const login = async (credentials) => {
    const response = await loginUser(credentials);

    localStorage.setItem("authToken", response.data.token);
    setUser(response.data.user);

    return response;
  };

  const register = async (credentials) => {
    const response = await registerUser(credentials);

    localStorage.setItem("authToken", response.data.token);
    setUser(response.data.user);

    return response;
  };

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitializing,
      login,
      register,
      logout,
    }),
    [user, isInitializing, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };