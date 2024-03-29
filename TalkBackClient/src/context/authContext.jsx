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
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext({
  name: null,
  isLoggedin: false,
  onlineUsers: [],
  login: () => {},
  logout: () => {},
});
export const AuthProvider = () => {
  const [isLoggedin, setIsLogIn] = useState(false);
  const [name, setName] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
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
  const handleOnlineUsers = (onlineusers) => {
    if (onlineusers)
      setOnlineUsers(userSocketManager.handleUpdateUsers(onlineusers));
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

  return { isLoggedin, login, logout, name, onlineUsers };
};
