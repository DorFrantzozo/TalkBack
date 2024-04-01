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
import { userSocketManager, userSocket } from "../services/userSocketService";
export const AuthContext = createContext({
  user: null,
  isLoggedin: false,
  onlineUsers: [],
  login: () => {},
  logout: () => {},
});
export const AuthProvider = () => {
  const [isLoggedin, setIsLogIn] = useState(false);
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useMemo(async () => {
    if (await loginTokenValidation()) {
      setIsLogIn(true);
      const user = await getUser();
      userSocketManager.connect();
      setUser(user);
    }
  }, []);
  const login = useCallback(async () => {
    if (await loginTokenValidation()) {
      setIsLogIn(true);
      const user = await getUser();
      userSocketManager.connect();
      setUser(user);
    }
  }, []);
  const logout = useCallback(async () => {
    if (await logoutTokenValidation()) {
      setIsLogIn(false);
      userSocketManager.disconnect();
      setUser(null);
    }
  }, []);

  const handleOnlineUsers = (onlineusers, alert) => {
    if (onlineusers)
      setOnlineUsers(userSocketManager.handleUpdateUsers(onlineusers));
    if (alert) userSocketManager.handleAlert(alert);
  };

  useEffect(() => {
    userSocket.on("updateOnlineUsers", handleOnlineUsers);
    return () => {
      userSocket.off("updateOnlineUsers", handleOnlineUsers);
    };
  }, []);

  useEffect(() => {
    let refreshTimer;

    const refreshTime = 15 * 1000;
    refreshTimer = setTimeout(loginTokenValidation, refreshTime);

    return () => {
      clearTimeout(refreshTimer);
    };
  }, []);

  return { isLoggedin, login, logout, user, onlineUsers };
};
