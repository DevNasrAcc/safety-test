import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Box, Input, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Border from "../../../components/downBorder";

const useStyles = makeStyles({
  mainDiv: {
    paddingLeft: "43px",
    paddingRight: "43px",

    "& h2": {
      fontSize: "17.1166px",
      lineHeight: "29px",
      color: "#1D2B4F",
      fontFamily: "MontserratSemiBold",
    },

    "@media only screen and (max-width: 1730px)": {
      "& h2": {
        fontSize: "15px",
        lineHeight: "22px",
      },
    },

    "@media only screen and (max-width: 1366px)": {
      padding: "0px 18px !important",

      "& h2": {
        fontSize: "13px !important",
        lineHeight: "16px",
      },
    },

    "@media only screen and (max-width: 1024px)": {
      padding: "0px 40px",

      "& h2": {
        fontSize: "18px !important",
        lineHeight: "24px !important",
      },
    },
  },

  dateInput: {
    width: "100%",

    "& input": {
      fontFamily: "MontserratRegular",
      fontSize: "9px",
      lineHeight: "11px",
      color: "#ACACAC",
      width: "100%",
      padding: "16px 8px",
      display: "block",

      "@media only screen and (max-width: 1830px)": {
        padding: "12px 8px",
      },

      "@media only screen and (max-width: 1600px)": {
        padding: "10px 8px",
      },

      "@media only screen and (max-width: 1366px)": {
        padding: "6px",
      },
    },

    "& .MuiInput-root": {
      width: "100%",
      border: "0.779156px solid rgba(0, 0, 0, 0.16)",
      borderRadius: "3.85682px",
      marginTop: "8px",
      marginBottom: "8px",

      "&::before": {
        borderBottom: "none !important",
      },

      "&::after": {
        borderBottom: "none !important",
      },

      "@media only screen and (max-width: 1830px)": {
        marginTop: "6px",
        marginBottom: "6px",
      },

      "@media only screen and (max-width: 1600px)": {
        marginTop: "4px",
        marginBottom: "4px",
      },

      "@media only screen and (max-width: 1366px)": {
        marginTop: "3px",
        marginBottom: "3px",
      },
    },
  },
});

const Date = (props) => {
  const { setStartDate, setEndDate } = props;

  const classes = useStyles();
  const panel = useSelector((state) => state.leftState.leftState);

  const [dates, setDates] = useState({
    fromDate: null,
    toDate: null,
  });

  const handleChange = (key, value) => {
    setDates((dates) => ({ ...dates, [key]: value }));
  };

  return (
    <div className={classes.calenderDiv}>
      <Box
        className={classes.mainDiv}
        sx={{
          "@media only screen and (max-width: 1830px)": {
            padding: panel ? "0px 38px" : "0px 43px",
          },

          "@media only screen and (max-width: 1600px)": {
            padding: panel ? "0px 28px" : "0px 38px",
          },
        }}
      >
        <div className={classes.dateInput}>
          <div className="input">
            <Typography variant="h2">From Date</Typography>

            <Input
              placeholder="Start Date"
              type="date"
              name="fromDate"
              value={dates.fromDate}
              onChange={(e) => setStartDate(e.target.value)}
              // onChange={(e) => handleChange("fromDate", e.target.value)}
            />
          </div>

          <div className="input">
            <Typography variant="h2">To Date</Typography>

            <Input
              placeholder="End Date"
              type="date"
              name="toDate"
              value={dates.toDate}
              onChange={(e) => setEndDate(e.target.value)}
              // onChange={(e) => handleChange("toDate", e.target.value)}
            />
          </div>
        </div>
      </Box>

      <Border />
    </div>
  );
};

export default Date;
