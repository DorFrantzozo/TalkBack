import React from "react";
import myLogo from "../../assets/Images/Logo.png";
import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import "./footer.css";
export default function Footer() {
  return (
    <>
      <Box
        sx={{
          marginTop: "70px",
          width: "100%",
          height: { xs: "auto", m: "auto" },
          bgcolor: "black",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Container sx={{ display: { xs: "block", sm: "flex" } }}>
          <Box>
            <img id="img-footer" src={myLogo} width={"200px"} />
          </Box>
          <Box>
            <Typography
              sx={{
                color: "white",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "45px",
                marginLeft: "120px",
              }}
            >
              Link with other people and play Backgrammon Online .
              <br />
              Chat with and comunicate with people in real Time
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "white",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "100px",
                marginLeft: "40px",
              }}
            >
              Made by Alon Ben Zaken And Dor Frantzozo
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}
