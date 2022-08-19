import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Box, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

import CsvDownload from "../../../components/csvDownload";
import Modal from "../../../components/modal/byDay";
import Charts from "./chart";

const useStyles = makeStyles({
  box: {
    background: "#FFFFFF",
    boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.15)",
    borderRadius: "14.7481px",
    padding: "22px 18px 0px",
    height: "calc(100% - 20px)",
    position: "relative",

    "& .headDiv": {
      display: "flex",
      justifyContent: "space-between",
    },

    "& h2": {
      fontSize: "15px",
      lineHeight: "18px",
      color: "#464255",
      fontFamily: "MontserratMedium",
    },

    "@media only screen and (max-width: 1830px)": {
      "& h2": {
        fontSize: "14px",
      },
    },

    "@media only screen and (max-width: 1600px)": {
      "& h2": {
        fontSize: "12px",
      },
    },

    "@media only screen and (max-width: 1366px)": {
      padding: "16px 14px 0px !important",
      height: "calc(100% - 16px) !important",

      "& h2": {
        fontSize: "11px",
        lineHeight: "17px",
      },
    },

    "@media only screen and (max-width: 1280px)": {
      "& h2": {
        fontSize: "10px",
        lineHeight: "15px",
      },
    },
  },

  divs: {
    display: "flex",
    alignItems: "center",

    "& .export": {
      marginLeft: 10,
    },
  },

  loader: {
    display: "flex",
    position: "absolute",
    top: "100px",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

const IncidentByTime = (props) => {
  const { byDayLoading, insideModal, setInsideModal } = props;

  const classes = useStyles();
  const panel = useSelector((state) => state.leftState.leftState);
  const byDay = useSelector((state) => state.byDay.byDay);

  const [toggleByDay, setToggleByDay] = useState(false);
  const [byDayState, setByDayState] = useState(false);

  const headers = [
    { label: "Date", key: "date" },
    { label: "Count in K", key: "violationCount" },
    { label: "Count in %", key: "violationPercentage" },
  ];

  const handleClose = () => {
    if (insideModal === "inside") {
      setInsideModal("");
    }
    setByDayState(false);
  };

  const handleOpen = () => {
    setByDayState(true);
  };

  return (
    <Box
      className={classes.box}
      sx={{
        "@media only screen and (max-width: 1600px)": {
          padding: panel ? "17px 14px 0px !important" : "18px 17px 0px",
          height: panel ? "calc(100% - 17px) !important" : "calc(100% - 18px)",
        },
      }}
    >
      <div className="headDiv">
        <Typography
          variant="h2"
          style={{ display: "flex", alignItems: "center" }}
        >
          <span>Violations by Day</span>{" "}
        </Typography>

        {byDay.length ? (
          <CsvDownload
            violationsByDay
            setToggleByDay={setToggleByDay}
            toggleByDay={toggleByDay}
            filename="Violations By Day.csv"
            headerArray={headers}
            data={byDay}
            handleDay={handleOpen}
            insideModal={insideModal}
            symbol={toggleByDay ? "K" : "%"}
          />
        ) : null}
      </div>

      {byDayLoading ? (
        <div className={classes.loader}>
          <CircularProgress
            sx={{
              color: "#020A58",
              "@media only screen and (max-width: 1440px)": {
                width: "30px !important",
                height: "30px !important",
              },
            }}
          />
        </div>
      ) : (
        <div
          className={`${
            insideModal === "inside"
              ? "insideMod"
              : panel
              ? "pnChartJS"
              : "chartJs"
          }`}
        >
          {byDay.length && (
            <Charts
              valueType={toggleByDay ? "%" : "k"}
              inn={insideModal === "inside"}
              toggleByDay={toggleByDay}
            />
          )}
        </div>
      )}

      <Modal byDayState={byDayState} handleClose={handleClose} />
    </Box>
  );
};

export default IncidentByTime;
