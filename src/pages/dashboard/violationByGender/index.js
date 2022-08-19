import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Box, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { GridBox } from "../../../components/box";

import CsvDownload from "../../../components/csvDownload";
import Modal from "../../../components/modal/byGender";

const useStyles = makeStyles({
  box: {
    display: "flex",
    flexDirection: "column",

    "& .headDiv": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "40px",
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

      "& .headDiv": {
        marginBottom: "30px",
      },
    },

    "@media only screen and (max-width: 1600px)": {
      "& h2": {
        fontSize: "12px",
      },

      "& .headDiv": {
        marginBottom: "10px",
      },
    },

    "@media only screen and (max-width: 1440px)": {
      "& h2": {
        fontSize: "12px",
      },

      "& .types": {
        paddingBottom: 0,
      },
    },

    "@media only screen and (max-width: 1366px)": {
      padding: "16px 14px 0px !important",
      height: "calc(100% - 16px) !important",

      "& .headDiv": {
        marginBottom: "10px",
      },

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

    "@media only screen and (max-width: 1024px)": {
      "& .headDiv": {
        marginBottom: 0,
      },

      "& .types": {
        paddingBottom: 0,
      },

      height: "170px !important",
    },

    "@media only screen and (max-width: 828px)": {
      "& h2": {
        lineHeight: "14px",
      },
    },

    "@media only screen and (max-width: 540px)": {
      height: "200px !important",

      "& .headDiv": {
        paddingTop: "10px",
      },
    },
  },

  innerBox: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },

  boxes: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: 11,

    "& h5": {
      fontSize: "13.6867px",
      lineHeight: "17px",
      color: "#464255",
      fontFamily: "MontserratMedium",
      marginRight: 2,
    },

    "& h6": {
      fontSize: "11.6867px",
      lineHeight: "17px",
      color: "#ffffff",
      fontFamily: "MontserratBold",
    },

    "& .child": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 12px",
      borderTopLeftRadius: "7.69879px",
      borderBottomLeftRadius: "7.69879px",
    },

    "& .seconChild": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "18px 12px 18px 0px",
      borderTopRightRadius: "7.69879px",
      borderBottomRightRadius: "7.69879px",
    },

    "@media only screen and (max-width: 1830px)": {
      "& .child": {
        padding: "15px 10px",
      },

      "& .seconChild": {
        padding: "15px 10px 15px 0px",
      },
    },

    "@media only screen and (max-width: 1730px)": {
      "& h5": {
        fontSize: "11px",
      },

      "& .child": {
        padding: "12px 10px",
      },

      "& .seconChild": {
        padding: "12px 10px 12px 0px",
      },
    },

    "@media only screen and (max-width: 1530px)": {
      marginBottom: 8,

      "& .child": {
        padding: "13px 8px",
      },

      "& .seconChild": {
        padding: "13px 8px",
      },

      "& h5": {
        fontSize: "9px",
      },
    },

    "@media only screen and (max-width: 1366px)": {
      marginBottom: 5,

      "& .child": {
        padding: "10px 7px",
      },

      "& .seconChild": {
        padding: "10px 7px",
      },
    },

    "@media only screen and (max-width: 1100px)": {
      justifyContent: "center",

      marginBottom: 4,

      "& .child": {
        padding: "10px 7px",
      },

      "& .seconChild": {
        padding: "10px 7px",
      },
    },

    "@media only screen and (max-width: 1024px)": {
      "& .child": {
        padding: "8px 8px",
      },

      "& .seconChild": {
        padding: "8px 8px",
      },
    },

    "@media only screen and (max-width: 540px)": {
      "& h5": {
        fontSize: "10px",
        lineHeight: "1px",
      },

      "& h6": {
        fontSize: "8px",
        lineHeight: "10px",
      },

      "& .child": {
        padding: "11px 7px",
      },

      "& .seconChild": {
        padding: "11px 8px",
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

  legends: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",

    "& h6": {
      fontFamily: "MontserratRegular",
      color: "#464255",
    },

    "@media only screen and (max-width: 1366px)": {
      "& h6": {
        fontSize: "8px",
      },
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

const ByGender = (props) => {
  const { byGenderLoading, insideModal, setInsideModal } = props;

  const classes = useStyles();
  const panel = useSelector((state) => state.leftState.leftState);
  const byGender = useSelector((state) => state.byGender.byGender);

  const [toggleValueType, setToggleValueType] = useState(false);
  const [genderState, setGenderState] = useState(false);

  const [maleLowVal, setMaleLow] = useState(0);
  const [femaleLowVal, setFemaleLow] = useState(0);

  const [maleMildVal, setMaleMild] = useState(0);
  const [femaleMildVal, setFemaleMild] = useState(0);

  const [maleCriticaLVal, setMaleCriticaL] = useState(0);
  const [femaleCriticaLVal, setFemaleCriticaL] = useState(0);

  useEffect(() => {
    if (byGender.length) {
      const lowVal = byGender?.filter((forLow) => forLow.category === "Low");
      const mildVal = byGender?.filter((forLow) => forLow.category === "Mild");
      const criticalVal = byGender?.filter(
        (forLow) => forLow.category === "Critical"
      );

      // LOW
      const lowMaleCount = lowVal?.find((value) => value.gender === "Male");
      const lowFemaleCount = lowVal?.find((value) => value.gender === "Female");

      const totalLowCountInK =
        lowMaleCount?.violationCount + lowFemaleCount?.violationCount;

      const lowMale = (lowMaleCount?.violationCount / totalLowCountInK) * 100;
      const lowFemale =
        (lowFemaleCount?.violationCount / totalLowCountInK) * 100;
      setMaleLow(lowMale?.toFixed(0));
      setFemaleLow(lowFemale?.toFixed(0));

      // MILD
      const mildMaleCount = mildVal?.find((value) => value.gender === "Male");
      const mildFemaleCount = mildVal?.find(
        (value) => value.gender === "Female"
      );

      const totalMildCountInK =
        mildMaleCount?.violationCount + mildFemaleCount?.violationCount;

      const mildMale =
        (mildMaleCount?.violationCount / totalMildCountInK) * 100;
      const mildFemale =
        (mildFemaleCount?.violationCount / totalMildCountInK) * 100;
      setMaleMild(mildMale?.toFixed(0));
      setFemaleMild(mildFemale?.toFixed(0));

      // CRITICAL
      const criticalMaleCount = criticalVal?.find(
        (value) => value.gender === "Male"
      );
      const criticalFemaleCount = criticalVal?.find(
        (value) => value.gender === "Female"
      );

      const totalCriticalCountInK =
        criticalMaleCount?.violationCount + criticalFemaleCount?.violationCount;

      const criticalMale =
        (criticalMaleCount?.violationCount / totalCriticalCountInK) * 100;
      const criticalFemale =
        (criticalFemaleCount?.violationCount / totalCriticalCountInK) * 100;
      setMaleCriticaL(criticalMale.toFixed(0));
      setFemaleCriticaL(criticalFemale?.toFixed(0));
    }
  }, [byGender]);

  const headers = [
    { label: "Category", key: "category" },
    { label: "Gender", key: "gender" },
    { label: "Count in K", key: "violationCount" },
    { label: "Count in %", key: "violationPercentage" },
  ];

  const handleClose = () => {
    if (insideModal === "inside") {
      setInsideModal("");
    }
    setGenderState(false);
  };

  const handleOpen = () => {
    setGenderState(true);
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
          <Typography variant="h2">Violations By Gender</Typography>

          {byGender.length ? (
            <CsvDownload
              violoationByGender
              setToggleValueType={setToggleValueType}
              toggleValueType={toggleValueType}
              filename="Violations By Gender.csv"
              headerArray={headers}
              data={byGender}
              handleGender={handleOpen}
              insideModal={insideModal}
              symbol={toggleValueType ? "K" : "%"}
            />
          ) : null}
        </div>
      </div>

      {byGenderLoading ? (
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
        <Box className="types">
          <Box
            className={classes.legends}
            sx={{
              "@media only screen and (max-width: 1730px)": {
                marginBottom: "8px",
              },
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: `9px`,
                  backgroundColor: "#9BA5CC",
                  height: "9px",
                  marginRight: "5px",
                  borderRadius: "3.35183px",
                }}
              />
              <h6
                style={{
                  fontSize: "9px",
                }}
              >
                Male
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
                  width: `9px`,
                  backgroundColor: "#188E9C",
                  height: "9px",
                  marginRight: "5px",
                  borderRadius: "3.35183px",
                }}
              />
              <h6
                style={{
                  fontSize: "9px",
                }}
              >
                Female
              </h6>
            </div>
          </Box>

          <div className={classes.boxes}>
            <Typography
              variant="h5"
              sx={{
                fontSize: panel && "12px !important",

                "@media only screen and (max-width: 1440px)": {
                  fontSize: panel && "8px !important",
                },
              }}
            >
              Mid
            </Typography>
            <div className={classes.innerBox}>
              <div
                style={{
                  width: `${maleCriticaLVal}%`,
                  backgroundColor: "#9BA5CC",
                }}
                className="child"
              >
                <Typography variant="h6">
                  {`${maleCriticaLVal}${toggleValueType ? "%" : "K"}`}
                </Typography>
              </div>

              <div
                style={{
                  width: `${femaleCriticaLVal}%`,
                  backgroundColor: "#188E9C",
                }}
                className="seconChild"
              >
                <Typography variant="h6">
                  {`${femaleCriticaLVal}${toggleValueType ? "%" : "K"}`}
                </Typography>
              </div>
            </div>
          </div>

          <div className={classes.boxes}>
            <Typography
              variant="h5"
              sx={{
                fontSize: panel && "12px !important",
                "@media only screen and (max-width: 1440px)": {
                  fontSize: panel && "8px !important",
                },
              }}
            >
              Critical
            </Typography>
            <div className={classes.innerBox}>
              <div
                style={{
                  width: `${maleMildVal}%`,
                  backgroundColor: "#9BA5CC",
                }}
                className="child"
              >
                <Typography variant="h6">
                  {`${maleMildVal}${toggleValueType ? "%" : "K"}`}
                </Typography>
              </div>

              <div
                style={{
                  width: `${femaleMildVal}%`,
                  backgroundColor: "#188E9C",
                }}
                className="seconChild"
              >
                <Typography variant="h6">
                  {`${femaleMildVal}${toggleValueType ? "%" : "K"}`}
                </Typography>
              </div>
            </div>
          </div>

          <div className={classes.boxes}>
            <Typography
              variant="h5"
              sx={{
                fontSize: panel && "12px !important",

                "@media only screen and (max-width: 1440px)": {
                  fontSize: panel && "8px !important",
                },
              }}
            >
              Low
            </Typography>
            <div className={classes.innerBox}>
              <div
                style={{
                  width: `${maleLowVal}%`,
                  backgroundColor: "#9BA5CC",
                }}
                className="child"
              >
                <Typography variant="h6">
                  {`${maleLowVal}${toggleValueType ? "%" : "K"}`}
                </Typography>
              </div>

              <div
                style={{
                  width: `${femaleLowVal}%`,
                  backgroundColor: "#188E9C",
                }}
                className="seconChild"
              >
                <Typography variant="h6">
                  {`${femaleLowVal}${toggleValueType ? "%" : "k"}`}
                </Typography>
              </div>
            </div>
          </div>
        </Box>
      )}

      <Modal genderState={genderState} handleClose={handleClose} />
    </GridBox>
  );
};

export default ByGender;
