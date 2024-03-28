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
  getUser,
} from "../services/authService";
import { userSocketManager } from "../services/userSocketService";

export const AuthContext = createContext({
  name: null,
  isLoggedin: false,
  login: () => {},
  logout: () => {},
});
export const AuthProvider = () => {
  const [isLoggedin, setIsLogIn] = useState(false);
  const [name, setName] = useState(null);

  useMemo(async () => {
    if (await loginTokenValidation()) {
      setIsLogIn(true);
      const user = await getUser();
      console.log(user);
      userSocketManager.connect();
      setName(user.name);
    }
  }, []);
  const login = useCallback(async () => {
    if (await loginTokenValidation()) {
      setIsLogIn(true);
      const user = await getUser();
      console.log(user);
      userSocketManager.connect();
      setName(user.name);
    }
  }, []);
  const logout = useCallback(() => {
    if (logoutTokenValidation()) {
      setIsLogIn(false);
      userSocketManager.disconnect();
      setName(null);
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

  return { isLoggedin, login, logout, name };
};
