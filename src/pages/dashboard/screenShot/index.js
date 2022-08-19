import React from "react";
import { useSelector } from "react-redux";

import jsPDF from "jspdf";
import hrml2Canvas from "html2canvas";

import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";

import Border from "../../../components/downBorder";

import Camera from "../../../assets/images/camera.svg";

const useStyles = makeStyles({
  box: {
    paddingLeft: "43px",
    paddingRight: "43px",
    marginTop: 20,
  },

  screenShot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    "& h6": {
      fontSize: "16px",
      lineHeight: "20px",
      color: "#464255",
      fontFamily: "MontserratMedium",
    },
  },

  "@media only screen and (max-width: 1830px)": {
    screenShot: {
      "& img": {
        width: "30px !important",
      },
    },
  },

  "@media only screen and (max-width: 1600px)": {
    screenShot: {
      "& img": {
        width: "28px !important",
      },
    },
  },

  "@media only screen and (max-width: 1366px)": {
    box: {
      paddingLeft: "18px !important",
      paddingRight: "18px !important",
      marginTop: "8px !important",
    },

    screenShot: {
      "& h6": {
        fontSize: "14px",
        lineHeight: "16px",
      },

      "& img": {
        width: "22px !important",
      },
    },
  },

  "@media only screen and (max-width: 1280px)": {
    box: {
      marginTop: "6px !important",
    },

    screenShot: {
      "& h6": {
        fontSize: "13px",
      },

      "& img": {
        width: "20px !important",
      },
    },
  },

  "@media only screen and (max-width: 1199px)": {
    box: {
      marginTop: "20px !important",
    },
  },

  "@media only screen and (max-width: 828px)": {
    box: {
      marginTop: 0,
      paddingLeft: "10px",
      paddingRight: "20px",
    },

    screenShot: {
      padding: "0px 25px",

      "& h6": {
        lineHeight: "18px",
      },
    },
  },
});

const ScreenShot = () => {
  const classes = useStyles();
  const panel = useSelector((state) => state.leftState.leftState);

  const takeScreenShot = () => {
    const rootId = document.getElementById("root");
    hrml2Canvas(rootId, {
      useCORS: true,
      logging: true,
      letterRendering: 1,
    }).then((canvas) => {
      const imgWidth = 210;

      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "mm", "a4");

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("dashboard.pdf");
    });
  };

  return (
    <>
      <Box
        className={classes.box}
        sx={{
          "@media only screen and (max-width: 1830px)": {
            padding: panel ? "0px 38px" : "0px 43px",
            marginTop: "16px",
          },

          "@media only screen and (max-width: 1730px)": {
            padding: panel ? "0px 38px" : "0px 43px",
            marginTop: "14px",
          },

          "@media only screen and (max-width: 1600px)": {
            padding: panel ? "0px 28px" : "0px 38px",
            marginTop: "12px",
          },
        }}
      >
        <div className={classes.screenShot}>
          <Typography
            variant="h6"
            sx={{
              "@media only screen and (max-width: 1600px)": {
                fontSize: panel && "14px !important",
              },
            }}
          >
            Screenshot by clicking here
          </Typography>

          <div onClick={() => takeScreenShot()} style={{ cursor: "pointer" }}>
            <img alt="" src={Camera} />
          </div>
        </div>
      </Box>

      <Border />
    </>
  );
};

export default ScreenShot;
