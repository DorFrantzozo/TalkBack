import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  divider: {
    height: "100%",
    width: "1px", // Adjust as needed
    backgroundColor: theme.palette.divider,
    margin: "0 8px", // Adjust as needed
  },
}));

const VerticalDivider = () => {
  const classes = useStyles();

  return <div className={classes.divider} />;
};

export default VerticalDivider;
