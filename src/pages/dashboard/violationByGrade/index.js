import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { GridBox } from "../../../components/box";

import CsvDownload from "../../../components/csvDownload";
import Modal from "../../../components/modal/byGrade";

import Chart from "./apexChart";

const useStyles = makeStyles({
  box: {
    "& .headDiv": {
      display: "flex",
      alignItems: "center",
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
        lineHeight: "14px",
        fontSize: "11px",
      },
    },

    "@media only screen and (max-width: 828px)": {
      "& h2": {
        fontSize: "10px",
        lineHeight: "14px",
      },
    },
  },

  button: {
    fontSize: "8.60304px !important",
    lineHeight: "13px",
    color: "#AB54DB !important",
    fontFamily: "MontserratBold",

    "@media only screen and (max-width: 828px)": {
      fontSize: "6px",
      lineHeight: "9px",
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

const ViolationByGrade = (props) => {
  const { byGradeLoading, insideModal, setInsideModal } = props;

  const classes = useStyles();
  const panel = useSelector((state) => state.leftState.leftState);
  const byGrade = useSelector((state) => state.grade.byGrade);

  const [toggleByGrade, setToggleByGrade] = useState(false);
  const [modalState, setModalState] = useState(false);

  const [categories, setCategories] = useState([]);
  const [valueWithPerc, setValueWithPerc] = useState([]);
  const [valueWithoutPerc, setValueWithoutPerc] = useState([]);

  useEffect(() => {
    if (byGrade.length) {
      const categoriies = byGrade.map((grades) => grades.grade);
      setCategories(categoriies);
    }
    if (toggleByGrade) {
      const percentageVal = byGrade.map(
        (value) => `${value.violationPercentage}%`
      );
      setValueWithPerc(percentageVal);
    } else {
      const thousdandVal = byGrade.map((value) => {
        const val = (value.violationCount / 1000).toFixed(2);
        return `${val}k`;
      });
      setValueWithoutPerc(thousdandVal);
    }
  }, [byGrade, panel, toggleByGrade]);

  const headers = [
    { label: "Grade", key: "grade" },
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
    <GridBox
      className={classes.box}
      sx={{
        "@media only screen and (max-width: 1600px)": {
          padding: panel ? "17px 14px 0px !important" : "18px 17px 0px",
          height: panel ? "calc(100% - 17px) !important" : "calc(100% - 18px)",
        },
      }}
    >
      <div>
        <div className="headDiv">
          <Typography variant="h2">Violation by Grade</Typography>

          {byGrade.length ? (
            <CsvDownload
              violationsByGrade
              setToggleByGrade={setToggleByGrade}
              toggleByGrade={toggleByGrade}
              filename="Violations By Grade.csv"
              headerArray={headers}
              data={byGrade}
              handleGrade={handleOpen}
              insideModal={insideModal}
              symbol={toggleByGrade ? "K" : "%"}
            />
          ) : null}
        </div>
      </div>

      {byGradeLoading ? (
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
            data={toggleByGrade ? valueWithPerc : valueWithoutPerc}
            valueType={toggleByGrade ? "%" : "k"}
            inn={insideModal === "inside"}
            categories={categories}
          />
        </div>
      )}

      <Modal modalState={modalState} handleClose={handleClose} />
    </GridBox>
  );
};

export default ViolationByGrade;
