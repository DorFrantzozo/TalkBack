import Navbar from "./Components/Navbar/NavBar";
import Landing from "./Components/LandingPage/Landing";
import Signup from "./Components/Signup/Signup";
import Game from "./Components/Game/Game";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/Login/Signin";
import Chat from "./Components/Chat/Chat";
import { AuthContext, AuthProvider } from "./context/authContext";
function App() {
  const { isLoggedin, login, logout, user, onlineUsers } = AuthProvider();

  return (
    <>
      <AuthContext.Provider
        value={{ isLoggedin, login, logout, user, onlineUsers }}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            {<Route path="/" element={<Landing />} />},
            {!isLoggedin && <Route path="/signup" element={<Signup />} />},
            {!isLoggedin && <Route path="/signin" element={<SignIn />} />},
            {<Route path="/chat" element={<Chat />} />}
            {<Route path="/game" element={<Game />} />}
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
