import React, { useState, useEffect } from "react";

import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

import BurgerIcon from "../../assets/images/logos/mobile-left.svg";
import Logo from "../../assets/images/charter-logo.png";

import Backdrop from "../menuDashboard/backdrop";
import SideDrawer from "../menuDashboard";

const useStyles = makeStyles({
  box: {
    width: "100%",

    "& header": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "18px 20px 0px",
    },
  },

  iconsItem: {
    "@media only screen and (max-width: 828px)": {
      width: 39,
      height: 39,
      borderRadius: "8.58px !important",
      display: "flex !important",
      alignItems: "center !important",
      justifyContent: "center !important",
      border: "1px solid #D0D0D0 !important",
      backgroundColor: "transparent !important",
    },
  },

  notification: {
    marginRight: "9px !important",
  },

  hamburger: {
    display: "none",
    cursor: "pointer",

    "@media only screen and (max-width: 828px)": {
      display: "block",
    },
  },

  mobileLogo: {
    display: "none",

    "@media only screen and (max-width: 828px)": {
      display: "block",
    },
  },

  toolbar: {
    justifyContent: "space-between",
  },
});

export default function Header() {
  const classes = useStyles();

  const [toggle, setToggle] = useState(false);
  const [expandedToggle, setExpandedToggle] = useState(false);

  const drawerToggle = () => {
    setToggle(!toggle);
    setExpandedToggle(false);
  };
  let backdrop;

  if (toggle) {
    backdrop = <Backdrop onClick={drawerToggle} />;
  }

  useEffect(() => {
    const bodyStyle = document.getElementsByTagName("body");

    if (toggle) {
      bodyStyle[0].style.overflow = "hidden";
    } else {
      bodyStyle[0].style.overflow = "auto";
    }
  }, [toggle]);

  return (
    <Box className={classes.box}>
      <header>
        <div className={classes.hamburger} onClick={drawerToggle}>
          <img alt="" src={BurgerIcon} />
        </div>

        <SideDrawer
          show={toggle}
          drawerToggle={drawerToggle}
          expandedToggle={expandedToggle}
          setExpandedToggle={setExpandedToggle}
        />
        {backdrop}

        <div className={classes.mobileLogo}>
          <img alt="" src={Logo} />
        </div>
      </header>
    </Box>
  );
}
