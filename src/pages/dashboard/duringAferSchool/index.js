import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Chart from "./fusionChart";

import { Box, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

import CsvDownload from "../../../components/csvDownload";
import Modal from "../../../components/modal/bySchoolHours";

const useStyles = makeStyles({
  box: {
    background: "#FFFFFF",
    boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.15)",
    borderRadius: "14.7481px",
    padding: "22px 18px 0px",
    height: "calc(100% - 22px)",
    position: "relative",

    "& .headDiv": {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "2px",
    },

    "& h2": {
      fontSize: "15px",
      color: "#464255",
      lineHeight: "18px",
      fontFamily: "MontserratMedium",
    },

    "@media only screen and (max-width: 1830px)": {
      marginBottom: "0px",

      "& h2": {
        fontSize: "14px",
      },
    },

    "@media only screen and (max-width: 1600px)": {
      "& h2": {
        fontSize: "12px",
      },
    },

    "@media only screen and (max-width: 1440px)": {
      "& h2": {
        lineHeight: "14px !important",
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

const DuringAfterSchool = (props) => {
  const { bySchoolHoursLoading, insideModal, setInsideModal } = props;

  const classes = useStyles();
  const panel = useSelector((state) => state.leftState.leftState);
  const byHours = useSelector((state) => state.byHours.byHours);

  const [toggleByHours, setToggleByHours] = useState(false);
  const [modalState, setModalState] = useState(false);

  const [valueWithPerc, setValueWithPerc] = useState([]);
  const [valueWithoutPerc, setValueWithoutPerc] = useState([]);

  useEffect(() => {
    if (toggleByHours) {
      const percentageVal = byHours.map((value) => {
        return {
          label: value.periodofDay,
          labelFont: "MontserratRegular",
          labelFontSize: panel ? 8 : "9",
          value: value.violationPercentage,
        };
      });
      setValueWithPerc(percentageVal);
    } else {
      const thousdandVal = byHours.map((value) => {
        return {
          label: value.periodofDay,
          labelFont: "MontserratRegular",
          labelFontSize: panel ? 8 : "9",
          value: (value.violationCount / 1000).toFixed(2),
        };
      });
      setValueWithoutPerc(thousdandVal);
    }
  }, [byHours, panel, toggleByHours]);

  const headers = [
    { label: "Period of Day", key: "periodofDay" },
    { label: "Count in K", key: "violationCount" },
    { label: "Count in %", key: "violationPercentage" },
  ];

  const handleClose = () => {
    if (insideModal === "inside") {
      setInsideModal("");
    }
    setModalState(false);
  };

  const handleOpen = () => {
    setModalState(true);
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
          <span>During / After School Hours</span>{" "}
        </Typography>

        {byHours.length ? (
          <CsvDownload
            violationsBySchoolhours
            setToggleByHours={setToggleByHours}
            toggleByHours={toggleByHours}
            filename="Violations By School Hours.csv"
            headerArray={headers}
            data={byHours}
            handleSchoolHours={handleOpen}
            insideModal={insideModal}
            symbol={toggleByHours ? "K" : "%"}
          />
        ) : null}
      </div>

      {bySchoolHoursLoading ? (
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
        <div>
          <Chart
            data={toggleByHours ? valueWithPerc : valueWithoutPerc}
            valueType={toggleByHours ? "%" : "k"}
            inn={insideModal === "inside"}
          />
        </div>
      )}

      <Modal modalState={modalState} handleClose={handleClose} />
    </Box>
  );
};

export default DuringAfterSchool;
