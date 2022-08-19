import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Chart from "./fusionChart";

import { Box, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

import CsvDownload from "../../../components/csvDownload";
import Modal from "../../../components/modal/numberOfViolations";

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

const NumberOfViolations = (props) => {
  const {
    byOperatorLoading,
    bySchoolLoading,
    byStudentsLoading,
    insideModal,
    setInsideModal,
  } = props;

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
  const operator = useSelector((state) => state.operator.byOperators);
  const school = useSelector((state) => state.school);
  const student = useSelector((state) => state.student.byStudents);

  const [categories, setCategories] = useState([]);
  const [toggleNumber, setToggleNumber] = useState(false);
  const [modalState, setModalState] = useState(false);

  const [operatorPerArray, setOperatorPerArray] = useState([]);
  const [schoolPerArray, setSchoolPerArray] = useState([]);
  const [studentPerArray, setstudentPerArray] = useState([]);

  const [operatorKArray, setOperatorKArray] = useState([]);
  const [schoolKArray, setSchoolKArray] = useState([]);
  const [studentKArray, setStudentKArray] = useState([]);

  useEffect(() => {
    if (school.allSchools.length) {
      const forCategories = school.allSchools.map((names) => {
        return {
          labelFont: "MontserratSemiBold",
          labelFontSize: width <= 1440 ? 8 : panel ? 10 : "12.79px",
          label: names.name,
          labelFontColor: "#222222",
        };
      });
      setCategories(forCategories);
    }

    if (operator.length) {
      if (toggleNumber) {
        const percentageVal = operator?.map((value) => {
          return {
            value: value.violationPercentage,
          };
        });
        setOperatorPerArray(percentageVal);
      } else {
        const thousdandVal = operator?.map((value) => {
          return {
            value: (value.violationCount / 1000).toFixed(2),
          };
        });
        setOperatorKArray(thousdandVal);
      }
    }

    if (school?.bySchool?.length) {
      if (toggleNumber) {
        const percentageVal = school?.bySchool?.map((value) => {
          return {
            value: value.violationPercentage,
          };
        });
        setSchoolPerArray(percentageVal);
      } else {
        const thousdandVal = school?.bySchool?.map((value) => {
          return {
            value: (value.violationCount / 1000).toFixed(2),
          };
        });
        setSchoolKArray(thousdandVal);
      }
    }

    if (student.length) {
      if (toggleNumber) {
        const percentageVal = student?.map((value) => {
          return {
            value: value.violationPercentage,
          };
        });
        setstudentPerArray(percentageVal);
      } else {
        const thousdandVal = student?.map((value) => {
          return {
            value: (value.violationCount / 1000).toFixed(2),
          };
        });
        setStudentKArray(thousdandVal);
      }
    }
  }, [operator, panel, school, student, toggleNumber, width]);

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
          <span>Number of Violations</span>{" "}
        </Typography>

        {operator?.length && school?.allSchools?.length && student.length ? (
          <CsvDownload
            violationsByNumber
            setToggleNumber={setToggleNumber}
            toggleNumber={toggleNumber}
            handleNumViolations={handleOpen}
            insideModal={insideModal}
            symbol={toggleNumber ? "K" : "%"}
          />
        ) : null}
      </div>

      {byOperatorLoading && bySchoolLoading && byStudentsLoading ? (
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
            categories={categories}
            operatorArray={toggleNumber ? operatorPerArray : operatorKArray}
            schoolArray={toggleNumber ? schoolPerArray : schoolKArray}
            studentArray={toggleNumber ? studentPerArray : studentKArray}
            valueType={toggleNumber ? "%" : "k"}
            inn={insideModal === "inside"}
          />
        </div>
      )}

      <Modal modalState={modalState} handleClose={handleClose} />
    </Box>
  );
};

export default NumberOfViolations;
