import { createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3DB250",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
});
export const OnlineBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));
