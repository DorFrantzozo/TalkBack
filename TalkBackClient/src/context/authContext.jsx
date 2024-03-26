import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import {
  loginTokenValidation,
  logoutTokenValidation,
} from "../services/authService";

export const AuthContext = createContext({
  isLoggedin: false,
  login: () => {},
  logout: () => {},
});
export const AuthProvider = () => {
  const [isLoggedin, setIsLogIn] = useState(false);
  useMemo(async () => {
    if (await loginTokenValidation()) {
      setIsLogIn(true);
    }
  }, []);
  const login = useCallback(() => {
    if (loginTokenValidation()) {
      setIsLogIn(true);
    }
  }, []);
  const logout = useCallback(() => {
    if (logoutTokenValidation()) {
      setIsLogIn(false);
    }
  }, []);

  useEffect(() => {
    let refreshTimer;

    const refreshTime = 15 * 1000;
    refreshTimer = setTimeout(loginTokenValidation, refreshTime);

    return () => {
      clearTimeout(refreshTimer);
    };
  }, []);

  return { isLoggedin, login, logout };
};
