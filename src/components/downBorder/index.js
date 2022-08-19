import React from "react";

import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  border: {
    background: "rgba(0, 0, 0, 0.12)",
    height: "1px",
    display: "block",
    margin: "22px auto",

    "@media only screen and (max-width: 1600px)": {
      margin: "17px auto !important",
    },

    "@media only screen and (max-width: 1366px)": {
      margin: "10px auto",
      width: "95% !important",
    },
  },
});

const Border = (props) => {
  const { sx, numbers } = props;

  const classes = useStyles();
  return (
    <Box
      className={classes.border}
      sx={{
        width: numbers ? "100%" : "90%",

        "@media only screen and (max-width: 1830px)": {
          margin: numbers ? "20px auto !important" : "13px auto !important",
        },

        "@media only screen and (max-width: 1600px)": {
          margin: numbers ? "18px auto 22px !important" : "8px auto !important",
        },

        "@media only screen and (max-width: 1366px)": {
          margin: numbers
            ? "14px auto 18px !important"
            : "10px auto !important",
        },

        "@media only screen and (max-width: 1280px)": {
          margin: numbers
            ? "12px auto 18px !important"
            : "10px auto !important",
        },
        sx,
      }}
    />
  );
};

export default Border;
