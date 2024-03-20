import MyChat from "./MyChat";
import HisChat from "./HisChat";
import React from "react";
import { Box ,Typography} from "@mui/material";
import Contacts from "./Contacts";
import Grid from "@mui/material/Unstable_Grid2";

export default function Chat() {
  return (
    <>
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
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
