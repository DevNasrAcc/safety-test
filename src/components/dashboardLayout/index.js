import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@mui/styles";
import { Box, Grid } from "@mui/material";

import Sidebar from "../sidebar";
import Header from "../header";

import { leftPanelToFalse } from "../../redux/actions/panel-left.actions";

const useStyles = makeStyles(() => ({
  headerDiv: {
    display: "none",

    "@media only screen and (max-width: 828px)": {
      display: "block",
    },
  },

  hide: {
    zIndex: 300,
    "@media only screen and (max-width: 1023px)": {
      display: "none",
    },
  },

  midSections: {
    "@media only screen and (max-width: 1000px)": {
      justifyContent: "center",
    },
  },
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const dispatch = useDispatch();

  const classes = useStyles();
  const panel = useSelector((state) => state.leftState.leftState);

  const [width, setWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (width <= 1023) {
      dispatch(leftPanelToFalse());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);
  return (
    <Box>
      <Grid
        container
        style={{ height: "100%" }}
        className={classes.midSections}
      >
        <Grid item lg={0.7} md={1} sm={12} xs={12} className={classes.hide}>
          <Sidebar />
        </Grid>
        <Grid
          item
          lg={11.3}
          md={11}
          sm={12}
          xs={12}
          sx={{
            paddingLeft: panel ? "190px" : 0,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },

            "@media only screen and (max-width: 1366px)": {
              paddingLeft: panel ? "160px" : "0",
            },

            "@media only screen and (max-width: 1280px)": {
              paddingLeft: panel ? "145px" : "0",
            },

            "@media only screen and (max-width: 1250px)": {
              paddingLeft: panel ? "138px" : "0",
            },

            "@media only screen and (max-width: 1023px)": {
              paddingLeft: "0px !important",
            },
          }}
        >
          <div className={classes.headerDiv}>
            <Header />
          </div>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
