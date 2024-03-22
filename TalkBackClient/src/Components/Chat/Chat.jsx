import MyChat from "./MyChat";
import HisChat from "./HisChat";
import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import Contacts from "./Contacts";
import Grid from "@mui/material/Unstable_Grid2";
import SendIcon from "@mui/icons-material/Send";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../assets/Themes/colors";

export default function Chat() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={3} md={3}>
                <Typography
                  variant="h4"
                  sx={{ display: "flex", justifyContent: "center", mb: "20px" }}
                >
                  Contacts
                </Typography>
                <Contacts />
              </Grid>
              <Grid xs={9} md={9}>
                <Typography
                  variant="h4"
                  sx={{ display: "flex", justifyContent: "center", mb: "20px" }}
                >
                  Contact name
                </Typography>
                <MyChat />
                <HisChat />

                <Box
                  height={600}
                  sx={{
                    display: "flex",
                    alignSelf: "center",
                  }}
                >
                  <TextField
                    sx={{ width: "100%" }}
                    id="standard-basic"
                    label="Standard"
                    variant="standard"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    endIcon={<SendIcon />}
                    sx={{ height: "40px", marginLeft: "8px" }}
                  >
                    Send
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
