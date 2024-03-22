import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

const Home = () => {
  const [onlineUsers, setOnlineUsers] = useState(null);

  socket.on("connected", (users) => {
    console.log(users);
    if (users) {
      setOnlineUsers(...[Object.values(users)]);
    }
  });

  const handleDisconected = (disconected_user) => {
    setOnlineUsers((prevUsers) => [
      prevUsers.filter((user) => user !== disconected_user),
    ]);
  };

  const handleConnected = (user) => {
    setOnlineUsers((prevUsers) => [...prevUsers, user]);
  };
  useEffect(() => {
    // Listen for incoming messages
    socket.on("user-connected", (user) => {
      handleConnected(user);
    });
    socket.on("user-disconnect", (dis_user) => {
      handleDisconected(dis_user);
    });
    // Clean up the socket connection on unmount
    return () => {
      socket.off("user-connected", handleConnected);
      socket.off("user-disconnect", handleDisconected);
      socket.disconnect();
    };
  }, []);

  const JoinUser = () => {
    socket.emit("login", "alon");
  };
  const disUser = () => {
    console.log("disconnecting");
  };

  return <div></div>;
};

export default Home;
