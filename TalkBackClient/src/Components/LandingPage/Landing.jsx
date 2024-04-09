/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../assets/Themes/colors";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { AuthContext } from "../../context/authContext";

const Landing = () => {
  const auth = useContext(AuthContext);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "black",
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.7)) ,url('../src/assets/Images/bg1.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{
              color: "white",
              textAlign: "center",
              marginBottom: "19px",
              paddingTop: { xs: "100px", md: "170px" },
            }}
          >
            Chat and play Backgammon
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: "18px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Discover the Perfect Fusion of Social Interaction and Strategic
            Gaming at TalkBack. Immerse Yourself in Engaging Conversations while
            Mastering the Art of Backgammon. Join Our Community for a Unique
            Blend of Chatting and Backgammon, Where Every Move Brings You Closer
            to Victory and Connection
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Link to={auth.isLoggedin ? "/chat" : "/signin"}>
              <Button variant="contained" sx={{ color: "white" }}>
                Chat and play now
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      <Container sx={{ marginTop: "50px" }}>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={8} lg={6}>
              <img
                src="../src/assets/Images/chat-landing.jpg"
                style={{ maxWidth: "100%", height: "auto" }}
                alt=""
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <Typography>
                Introducing our revolutionary chat messaging app, designed to
                transform the way you connect and communicate with others. With
                a sleek and intuitive interface, our app offers a seamless
                chatting experience that caters to your every need. Whether
                you're keeping in touch with friends, collaborating with
                colleagues, or meeting new people, our platform provides the
                perfect environment for meaningful conversations. Packed with
                innovative features such as encrypted messaging, customizable
                themes, and real-time translation, our app ensures privacy,
                personalization, and accessibility. Join the millions of users
                already enjoying the convenience and versatility of our chat
                messaging app, and discover a new standard in communication.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Landing;
