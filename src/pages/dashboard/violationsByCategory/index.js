/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Box, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

import CsvDownload from "../../../components/csvDownload";
import Modal from "../../../components/modal/byCategory";

import Chart from "./fusionChart";

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
        lineHeight: "14px !important",
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
        lineHeight: "14px",
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

const ViolationsByCategory = (props) => {
  const { categoryLoading, byCategory, insideModal, setInsideModal } = props;

  const classes = useStyles();
  const panel = useSelector((state) => state.leftState.leftState);

  const [toggleByCategory, setToggleByCategory] = useState(false);
  const [valueWithPerc, setValueWithPerc] = useState([]);
  const [valueWithoutPerc, setValueWithoutPerc] = useState([]);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    if (toggleByCategory) {
      const percentageVal = byCategory.map((value) => {
        let obj = {};
        if (
          value?.category === "Mild" ||
          value?.category === "Low" ||
          value?.category === "Critical"
        ) {
          obj = {
            label: value?.category,
            labelFont: "MontserratRegular",
            labelFontSize: panel ? 8 : "9",
            value: value?.violationPercentage,
          };
        }
        return obj;
      });
      setValueWithPerc(percentageVal);
    } else {
      const thousdandVal = byCategory.map((value) => {
        let obj = {};
        if (
          value?.category === "Mild" ||
          value?.category === "Low" ||
          value?.category === "Critical"
        ) {
          obj = {
            label: value?.category,
            labelFont: "MontserratRegular",
            labelFontSize: panel ? 8 : "9",
            value: (value.violationCount / 1000).toFixed(2),
          };
        }
        return obj;
      });
      setValueWithoutPerc(thousdandVal);
    }
  }, [byCategory, panel, toggleByCategory]);

  const headers = [
    { label: "Category", key: "category" },
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
          <span>Violations by Category</span>{" "}
        </Typography>

        {byCategory.length ? (
          <CsvDownload
            violationsByCategory
            setToggleByCategory={setToggleByCategory}
            toggleByCategory={toggleByCategory}
            filename="Violations By Category.csv"
            headerArray={headers}
            data={byCategory}
            handleCategory={handleOpen}
            insideModal={insideModal}
            symbol={toggleByCategory ? "K" : "%"}
          />
        ) : null}
      </div>

      {categoryLoading ? (
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
          {byCategory?.length && (
            <Chart
              data={toggleByCategory ? valueWithPerc : valueWithoutPerc}
              valueType={toggleByCategory ? "%" : "k"}
              toggleByCategory={toggleByCategory}
              inn={insideModal === "inside"}
            />
          )}
        </div>
      )}

      <Modal
        handleClose={handleClose}
        modalState={modalState}
        categoryLoading={categoryLoading}
        byCategory={byCategory}
      />
    </Box>
  );
};

export default ViolationsByCategory;
