import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
export default function MyChat() {
  return (
    <Stack spacing={3}>
      {/* For variant="text", adjust the height via font-size */}

      <Box sx={{ display: "flex",  }}>
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ marginRight: "20px" ,mb:"50px"}}
        />
        <Skeleton
          variant="rectangular"
          width={400}
          height={60}
          sx={{ borderRadius: "15px" }}
        />
      </Box>
    </Stack>
  );
}
