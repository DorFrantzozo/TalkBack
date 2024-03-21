import React from "react";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { theme } from "../../assets/Themes/colors";

export default function Landing() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundColor: "black",
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.7)) ,url('../src/assets/Images/bg1.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "730px",
          }}
        >
          <Container>
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                justifyContent: "center",
                color: "white",
                marginBottom: "19px",
                paddingTop: "170px",
              }}
            >
              Chat and play Backgammon
            </Typography>
            <Container>
              <Typography
                sx={{
                  justifyContent: "center",
                  color: "white",
                  fontSize: "27px",
                  alignItems: "center",
                }}
              >
                Discover the Perfect Fusion of Social Interaction and Strategic
                Gaming at TalkBack. Immerse Yourself in Engaging Conversations
                while Mastering the Art of Backgammon. Join Our Community for a
                Unique Blend of Chatting and Backgammon, Where Every Move Brings
                You Closer to Victory and Connection
              </Typography>
            </Container>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
                bgcolor: "primary",
              }}
            >
              <a href="/signin">
                {" "}
                <Button variant="contained" sx={{ color: "white" }}>
                  Chat an play now
                </Button>
              </a>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}
