import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Chart from "./fusionChart";

import { Box, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Modal from "../../../components/modal/byKeyword";
import CsvDownload from "../../../components/csvDownload";

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
      lineHeight: "18px",
      color: "#464255",
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

      "@media only screen and (max-width: 1600px)": {
        marginLeft: 7,
      },
    },
  },

  legends: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    bottom: "10px",
    width: "85%",
    justifyContent: "center",

    "& h6": {
      color: "rgba(152, 161, 176, 1)",
      fontFamily: "MontserratRegular",
    },

    "@media only screen and (max-width: 1830px)": {
      bottom: "19px",
    },

    "@media only screen and (max-width: 1366px)": {
      bottom: "26px",

      "& h6": {
        fontSize: "8px",
      },
    },

    "@media only screen and (max-width: 540px)": {
      justifyContent: "left",
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

const KeywordsAttempted = (props) => {
  const { byKeywordLoading, insideModal, setInsideModal } = props;

  const classes = useStyles();
  const [width, setWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const panel = useSelector((state) => state.leftState.leftState);
  const byKeyword = useSelector((state) => state.byKeyword.byKeyword);

  const [toggleByKeyword, setToggleByKeyword] = useState(false);
  const [modalState, setModalState] = useState(false);

  const [categories, setCategories] = useState([]);
  const [valueWithPerc, setValueWithPerc] = useState([]);
  const [valueWithoutPerc, setValueWithoutPerc] = useState([]);

  useEffect(() => {
    if (byKeyword.length) {
      const allCategories = byKeyword.map((value) => {
        return {
          label: value.keyword.charAt(0).toUpperCase() + value.keyword.slice(1),
          labelFont: "MontserratSemiBold",
          labelFontSize: width <= 1440 ? 8 : panel ? 10 : "12.79px",
          labelFontColor: "#222222",
        };
      });

      setCategories(allCategories);
    }

    if (toggleByKeyword) {
      const percentageVal = byKeyword.map((value) => {
        let color = "";

        if (value.category === "Critical") {
          color = "#88CDD4";
        }

        if (value.category === "Mild") {
          color = "#9BA5CC";
        }

        if (value.category === "Low") {
          color = "#188E9C";
        }

        return {
          color: color,
          value: value.violationPercentage,
        };
      });

      setValueWithPerc(percentageVal);
    } else {
      const thousdandVal = byKeyword.map((value) => {
        let color = "";

        if (value.category === "Critical") {
          color = "#88CDD4";
        }

        if (value.category === "Mild") {
          color = "#9BA5CC";
        }

        if (value.category === "Low") {
          color = "#188E9C";
        }

        return {
          color: color,
          value: (value.violationCount / 1000).toFixed(2),
        };
      });

      setValueWithoutPerc(thousdandVal);
    }
  }, [byKeyword, panel, toggleByKeyword, width]);

  const headers = [
    { label: "Category", key: "category" },
    { label: "Keyword", key: "keyword" },
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
          <span>Most Keywords Attempted</span>{" "}
        </Typography>

        {byKeyword.length ? (
          <CsvDownload
            violationsByKeyword
            setToggleByKeyword={setToggleByKeyword}
            toggleByKeyword={toggleByKeyword}
            filename="Violations By Keyword.csv"
            headerArray={headers}
            data={byKeyword}
            handleKeyword={handleOpen}
            insideModal={insideModal}
            symbol={toggleByKeyword ? "K" : "%"}
          />
        ) : null}
      </div>

      {byKeywordLoading ? (
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
            data={toggleByKeyword ? valueWithPerc : valueWithoutPerc}
            categories={categories}
            valueType={toggleByKeyword ? "%" : "k"}
            inn={insideModal === "inside"}
          />

          <div className={classes.legends}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: `10px`,
                  backgroundColor: "#88CDD4",
                  height: "10px",
                  marginRight: "5px",
                  borderRadius: "3.35183px",
                }}
              />
              <h6
                style={{
                  fontSize: panel ? "8px" : "9px",
                }}
              >
                Critical
              </h6>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <div
                style={{
                  width: `10px`,
                  backgroundColor: "#188E9C",
                  height: "10px",
                  marginRight: "5px",
                  borderRadius: "3.35183px",
                }}
              />
              <h6
                style={{
                  fontSize: panel ? "8px" : "9px",
                }}
              >
                Low
              </h6>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <div
                style={{
                  width: `10px`,
                  backgroundColor: "rgba(155, 165, 204, 0.76)",
                  height: "10px",
                  marginRight: "5px",
                  borderRadius: "3.35183px",
                }}
              />
              <h6
                style={{
                  fontSize: panel ? "8px" : "9px",
                }}
              >
                Mid
              </h6>
            </div>
          </div>
        </div>
      )}

      <Modal modalState={modalState} handleClose={handleClose} />
    </Box>
  );
};

export default KeywordsAttempted;
