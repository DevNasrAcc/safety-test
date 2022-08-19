import React from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@mui/styles";
import { Box, Typography, Skeleton } from "@mui/material";

const useStyles = makeStyles({
  box: {
    background: "#F5F8FF",
    borderRadius: "22.3844px",
    width: 199,
    marginRight: 18,

    "& h4": {
      fontFamily: "MontserratBold",
      fontSize: "29.46px",
      lineHeight: "37px",
      color: "#464255",
      display: "block",
      marginBottom: 15,
    },

    "& h6": {
      fontSize: "13.87px",
      lineHeight: "17.47px",
      textAlign: "center",
      color: "#A7A7A7",
      fontFamily: "MontserratSemiBold",
    },

    "@media only screen and (max-width: 1830px)": {
      "& h4": {
        fontSize: "25.2034px",
        lineHeight: "28px",
      },

      "& h6": {
        fontSize: "15.4746px",
      },
    },

    "@media only screen and (max-width: 1600px)": {
      marginRight: 16,
    },

    "@media only screen and (max-width: 1530px)": {
      marginRight: 16,

      "& h4": {
        fontSize: "17px !important",
        lineHeight: "18px !important",
        marginBottom: "10px",
      },

      "& h6": {
        fontSize: "13px !important",
        lineHeight: "15px !important",
      },
    },

    "@media only screen and (max-width: 1366px)": {
      marginBottom: 5,

      "& h4": {
        fontSize: "15px !important",
        lineHeight: "16px !important",
        marginBottom: "7px",
      },

      "& h6": {
        fontSize: "12.5px !important",
      },
    },

    "@media only screen and (max-width: 828px)": {
      borderRadius: "11.6287px",

      "& h4": {
        fontSize: "13px !important",
        lineHeight: "16px !important",
      },

      "& h6": {
        fontSize: "10px !important",
        lineHeight: "11px !important",
      },
    },

    "@media only screen and (max-width: 767px)": {
      flex: "0 0 35%",
    },
  },

  details: {
    padding: "32px 0px 30px",

    "& .detail": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },

    "@media only screen and (max-width: 1730px)": {
      padding: "26px 0px 24px",
    },

    "@media only screen and (max-width: 1530px)": {
      padding: "18px 0px 18px",
    },

    "@media only screen and (max-width: 540px)": {
      padding: "11px 9px",
    },
  },
});

const Derail = (props) => {
  const { firstText, secondText, numbersLoading } = props;
  const classes = useStyles();

  const panel = useSelector((state) => state.leftState.leftState);

  return (
    <Box
      className={classes.box}
      sx={{
        "@media only screen and (max-width: 1440px)": {
          marginRight: panel ? "10px" : "16px",

          "& h4": {
            lineHeight: "28px",
            fontSize: panel ? "17px" : "19px",
          },

          "& p": {
            fontSize: panel ? "12.4746px" : "14.4746px",
          },
        },
      }}
    >
      <Box
        className={classes.details}
        sx={{
          "@media only screen and (max-width: 1440px)": {
            padding: panel ? "22px 12px" : "22px 18px",
          },

          "@media only screen and (max-width: 1366px)": {
            padding: panel ? "19px 12px" : "15px 16px",
          },

          "@media only screen and (max-width: 1280px)": {
            padding: panel ? "10px 12px" : "13px 14px",
          },
        }}
      >
        <div className="detail">
          <Typography
            variant="h4"
            style={{ width: numbersLoading && "100%" }}
            sx={{
              "@media only screen and (max-width: 1730px)": {
                fontSize: panel ? "17px !important" : "19px !important",
                lineHeight: "22px !important",
              },
            }}
          >
            {numbersLoading ? <Skeleton variant="text" /> : firstText}
          </Typography>
          <Typography
            variant="h6"
            style={{ width: numbersLoading && "100%" }}
            sx={{
              "@media only screen and (max-width: 1730px)": {
                fontSize: "14px !important",
                lineHeight: "15px",
              },
            }}
          >
            {numbersLoading ? (
              <Skeleton variant="text" style={{ height: 28 }} />
            ) : (
              secondText
            )}
          </Typography>
        </div>
      </Box>
    </Box>
  );
};

export default Derail;
