import React, { useRef } from "react";

import { CSVLink } from "react-csv";

import { Box, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Save from "../../assets/images/logos/save.svg";
import Export from "../../assets/images/logos/export.svg";

const useStyles = makeStyles({
  divs: {
    display: "flex",
    alignItems: "center",

    "& .export": {
      marginLeft: 10,

      "@media only screen and (max-width: 1730px)": {
        marginLeft: 5,

        "& img": {
          width: "16px",
        },
      },

      "@media only screen and (max-width: 1366px)": {
        "& img": {
          width: "14px",
        },
      },
    },

    "@media only screen and (max-width: 1730px)": {
      "& .perc": {
        fontSize: "22px !important",
      },

      "& .save": {
        width: "13px",
      },
    },

    "@media only screen and (max-width: 1366px)": {
      "& .perc": {
        fontSize: "19px !important",
      },

      "& .save": {
        width: "12px",
      },
    },

    "@media only screen and (max-width: 1280px)": {
      "& .perc": {
        fontSize: "17px !important",
        paddingTop: "4px",
      },
    },
  },

  symbols: {
    color: "#3246D2",
    fontSize: "20px",
    marginRight: "5px",
    cursor: "pointer",

    "@media only screen and (max-width: 1366px)": {
      fontSize: "15px",
    },
  },
});

const CSVDownloader = (props) => {
  const {
    violoationByGender,
    setToggleValueType,
    toggleValueType,
    violationsByNumber,
    setToggleNumber,
    toggleNumber,
    violationsByDay,
    setToggleByDay,
    toggleByDay,
    violationsByGrade,
    setToggleByGrade,
    toggleByGrade,
    violationsByCategory,
    setToggleByCategory,
    toggleByCategory,
    violationsBySchoolhours,
    setToggleByHours,
    toggleByHours,
    violationsByKeyword,
    setToggleByKeyword,
    toggleByKeyword,
    headerArray,
    filename,
    data,
    handleGender,
    handleGrade,
    handleCategory,
    handleDay,
    handleSchoolHours,
    handleNumViolations,
    handleKeyword,
    insideModal,
    symbol,
  } = props;

  const classes = useStyles();

  const csvRef = useRef();
  const headers = headerArray;

  const downloadCsv = () => {
    csvRef.current.link.click();
  };

  const toggleState = () => {
    if (violoationByGender) {
      setToggleValueType(!toggleValueType);
    }

    if (violationsByNumber) {
      setToggleNumber(!toggleNumber);
    }

    if (violationsByDay) {
      setToggleByDay(!toggleByDay);
    }

    if (violationsByGrade) {
      setToggleByGrade(!toggleByGrade);
    }

    if (violationsByCategory) {
      setToggleByCategory(!toggleByCategory);
    }

    if (violationsBySchoolhours) {
      setToggleByHours(!toggleByHours);
    }

    if (violationsByKeyword) {
      setToggleByKeyword(!toggleByKeyword);
    }
  };

  const openModal = () => {
    if (violoationByGender) {
      handleGender();
    }

    if (violationsByDay) {
      handleDay();
    }

    if (violationsByGrade) {
      handleGrade();
    }

    if (violationsByCategory) {
      handleCategory();
    }

    if (violationsBySchoolhours) {
      handleSchoolHours();
    }

    if (violationsByNumber) {
      handleNumViolations();
    }

    if (violationsByKeyword) {
      handleKeyword();
    }
  };

  return (
    <Box className={classes.divs}>
      <div onClick={() => toggleState()}>
        <span
          className={classes.symbols}
          style={{
            marginLeft: violationsBySchoolhours && "5px",
          }}
        >
          {symbol}
        </span>
      </div>

      {data?.length && (
        <CSVLink
          headers={headers}
          data={data}
          filename={filename}
          ref={csvRef}
        />
      )}
      <IconButton
        sx={{ padding: 0, background: "none !important" }}
        onClick={() => downloadCsv()}
      >
        <img alt="" src={Save} className="save" />
      </IconButton>

      {insideModal !== "inside" && (
        <IconButton
          className="export"
          sx={{ padding: 0, background: "none !important" }}
          onClick={openModal}
        >
          <img alt="" src={Export} />
        </IconButton>
      )}
    </Box>
  );
};

export default CSVDownloader;
