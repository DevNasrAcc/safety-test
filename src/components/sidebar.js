import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import Menu from "../assets/images/logos/right.svg";
import Logo from "../assets/images/logos/logo.svg";
import Dashboard from "../assets/images/logos/dashboard.svg";
import Users from "../assets/images/logos/users.svg";
import Classes from "../assets/images/logos/classes.svg";
import Settings from "../assets/images/logos/term-setting.svg";
import Rosters from "../assets/images/logos/rosters.svg";
import ParentAssets from "../assets/images/logos/parent-assets.svg";
import GradeBook from "../assets/images/logos/grade-book.svg";
import Academics from "../assets/images/logos/academics.svg";
import Attendance from "../assets/images/logos/attendance.svg";
import Jobs from "../assets/images/logos/jobs.svg";
import Logout from "../assets/images/logos/log-out.svg";

import Profile from "../assets/images/logos/user-image.png";
import Left from "../assets/images/logos/left.svg";

import Backdrop from "./menuDashboard/backdrop";
import {
  leftPanelToTrue,
  leftPanelToFalse,
} from "../redux/actions/panel-left.actions";

const useStyles = makeStyles({
  div: {
    backgroundColor: "#020A58",
    height: "100vh",
    position: "sticky",
    left: 0,
    top: 0,
    overflowY: "auto",
    overflowX: "hidden",
    transition: "all 0.2s ease-in-out",
    zIndex: 300,

    "& ul": {
      padding: "0 !important",

      "& button": {
        textTransform: "inherit !important",
        fontSize: "18px !important",
        lineHeight: "23px !important",
        color: "#FFFFFF !important",
        fontFamily: "MontserratBlack",
      },
    },
  },

  expandBtn: {
    marginTop: "22px !important",
    marginLeft: "37px !important",
  },

  list: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  links: {
    paddingTop: 32,
  },

  iconItem: {
    padding: "0 !important",
    margin: "42px auto 0px !important",

    "& .MuiListItemIcon-root": {
      justifyContent: "center",
    },
  },

  menu: {
    padding: "0 !important",
    margin: "0px auto !important",

    "& .MuiListItemIcon-root": {
      justifyContent: "center",
    },

    "@media only screen and (max-width: 1280px)": {
      "& img": {
        width: "17px",
      },
    },
  },

  logout: {
    paddingBottom: 68,

    "& button": {
      marginLeft: "37px !important",
    },
  },

  smallDiv: {
    paddingBottom: 42,

    "& button": {
      margin: "0px auto !important",

      "& .MuiListItemIcon-root": {
        justifyContent: "center",
      },
    },
  },

  header: {
    "& .downBorder": {
      background: "#BCDEE2",
      height: "1px",
      width: "100%",
      opacity: 0.3,
      margin: "29px 0px 40px",
    },
  },

  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,

    "& p": {
      color: "#D9D9D9",
      margin: "0px 10px 0px 27px",
    },

    "@media only screen and (max-width: 1280px)": {
      "& img": {
        width: 17,
      },

      "& .logoExpand": {
        "& img": {
          width: 20,
        },
      },
    },
  },

  profile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,

    "& h4": {
      fontFamily: "MontserratBlack",
      fontSize: "23.6374px",
      lineHeight: "30px",
      color: "#FFFFFF",
    },

    "& p": {
      fontSize: "13.73px",
      lineHeight: "17px",
      color: "#FFFFFF",
      fontFamily: "MontserratRegular",
    },

    "& .imgDiv": {
      width: 64,
      height: 64,
      marginRight: 10,

      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
  },

  logoutTopBorder: {
    background: "#BCDEE2",
    height: "1px",
    width: "100%",
    opacity: 0.3,
    marginBottom: 36,
  },

  "@media only screen and (max-width: 1680px)": {
    expandBtn: {
      marginTop: "18px !important",
    },

    iconItem: {
      margin: "32px auto 0px !important",
    },

    links: {
      paddingTop: 28,
    },

    logout: {
      paddingBottom: 58,
    },

    logoutTopBorder: {
      marginBottom: 30,
    },
  },

  "@media only screen and (max-width: 1600px)": {
    expandBtn: {
      marginTop: "17px !important",
    },

    links: {
      paddingTop: 23,
    },

    logout: {
      paddingBottom: 46,
    },

    logoutTopBorder: {
      marginBottom: 26,
    },

    smallDiv: {
      paddingBottom: 10,
      marginTop: 10,
    },
  },

  "@media only screen and (max-width: 1440px)": {
    expandBtn: {
      marginTop: "16px !important",
    },

    links: {
      paddingTop: 20,
    },

    iconItem: {
      margin: "30px auto 0px !important",
    },

    logout: {
      paddingBottom: 42,
    },

    smallDiv: {
      paddingBottom: 30,
    },

    header: {
      "& .downBorder": {
        margin: "20px 0px 30px",
      },
    },

    profile: {
      "& h4": {
        fontSize: "20px",
        lineHeight: "27px",
      },

      "& .imgDiv": {
        width: 60,
        height: 60,
      },
    },

    logoutTopBorder: {
      marginBottom: 22,
      marginTop: 10,
    },
  },

  "@media only screen and (max-width: 1366px)": {
    expandBtn: {
      marginTop: "0px !important",
    },

    links: {
      paddingTop: 16,
    },

    iconItem: {
      margin: "18px auto 0px !important",
    },

    logout: {
      paddingBottom: 10,
    },

    smallDiv: {
      paddingBottom: 20,
    },

    profile: {
      "& h4": {
        fontSize: "17px",
        lineHeight: "24px",
      },

      "& p": {
        fontSize: "12px",
      },

      "& .imgDiv": {
        width: 40,
        height: 40,
      },
    },

    header: {
      "& .downBorder": {
        margin: "20px 0px 26px",
      },
    },

    logoutTopBorder: {
      marginBottom: 18,
      marginTop: 10,
    },
  },

  "@media only screen and (max-width: 1280px)": {
    iconItem: {
      margin: "18px auto 0px !important",

      "& img": {
        width: 17,
      },
    },

    diff: {
      "& img": {
        width: 20,
      },
    },

    profile: {
      "& h4": {
        fontSize: "15px",
        lineHeight: "20px",
      },

      "& p": {
        fontSize: "10px",
      },

      "& .imgDiv": {
        width: 30,
        height: 30,
      },
    },

    expandBtn: {
      marginLeft: "20px !important",

      "& img": {
        width: 17,
      },
    },

    logout: {
      paddingBottom: 22,

      "& button": {
        marginLeft: "20px !important",
      },
    },

    smallDiv: {
      paddingBottom: 16,

      "& img": {
        width: 19,
      },
    },

    header: {
      "& .downBorder": {
        margin: "16px 0px 20px",
      },
    },

    logoutTopBorder: {
      marginBottom: 12,
    },
  },

  "@media only screen and (max-width: 1100px)": {
    topBar: {
      marginBottom: 10,

      "& p": {
        color: "#D9D9D9",
        margin: "0px 10px 0px 12px",
      },
    },
  },

  "@media only screen and (max-width: 1023px)": {
    div: {
      width: "83px !important",
    },
  },
});

const Sidebar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [expandedToggle, setExpandedToggle] = useState(false);
  const panel = useSelector((state) => state.leftState.leftState);

  const drawerToggle = () => {
    setExpandedToggle(!expandedToggle);
  };
  let backdrop;

  if (expandedToggle) {
    backdrop = <Backdrop drawerToggle={drawerToggle} />;
  }

  return (
    <>
      <Box
        className={classes.div}
        style={{
          width: expandedToggle ? "300px" : "100%",
        }}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "@media only screen and (max-width: 1366px)": {
            width: expandedToggle && panel ? "260px !important" : "100%",
          },

          "@media only screen and (max-width: 1280px)": {
            width: expandedToggle && panel ? "235px !important" : "100%",
          },

          "@media only screen and (max-width: 1250px)": {
            width: expandedToggle && panel ? "227px !important" : "100%",
          },
        }}
      >
        <List className={classes.list}>
          <div className={classes.links}>
            {expandedToggle && (
              <div className={classes.header}>
                <div className={classes.topBar}>
                  <div
                    onClick={() => {
                      dispatch(leftPanelToFalse());
                      drawerToggle();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img alt="" src={Left} />
                  </div>

                  <div>
                    <Typography variant="body1">Charters school</Typography>
                  </div>

                  <div className="logoExpand">
                    <img alt="" src={Logo} />
                  </div>
                </div>

                <div className={classes.profile}>
                  <div className="imgDiv">
                    <img alt="" src={Profile} />
                  </div>

                  <div>
                    <Typography variant="h4">Operator</Typography>

                    <Typography variant="body1">
                      Charterschool@gmail.com
                    </Typography>
                  </div>
                </div>

                <div className="downBorder" />
              </div>
            )}

            {!expandedToggle && (
              <>
                <ListItemButton component={Button} className={classes.menu}>
                  <ListItemIcon
                    onClick={() => {
                      dispatch(leftPanelToTrue());
                      drawerToggle();
                    }}
                  >
                    <img alt="" src={Menu} />
                  </ListItemIcon>
                </ListItemButton>

                <ListItemButton
                  className={
                    expandedToggle
                      ? classes.expandBtn
                      : [classes.iconItem, classes.diff].join(" ")
                  }
                  component={Button}
                >
                  <ListItemIcon>
                    <img alt="" src={Logo} />
                  </ListItemIcon>
                </ListItemButton>
              </>
            )}

            <ListItemButton
              className={expandedToggle ? classes.expandBtn : classes.iconItem}
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={Dashboard} />
              </ListItemIcon>

              {expandedToggle && <ListItemText primary="Dashboard" />}
            </ListItemButton>

            <ListItemButton
              className={expandedToggle ? classes.expandBtn : classes.iconItem}
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={Users} />
              </ListItemIcon>

              {expandedToggle && <ListItemText primary="Users" />}
            </ListItemButton>

            <ListItemButton
              className={expandedToggle ? classes.expandBtn : classes.iconItem}
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={Classes} />
              </ListItemIcon>

              {expandedToggle && <ListItemText primary="Classes" />}
            </ListItemButton>

            <ListItemButton
              className={expandedToggle ? classes.expandBtn : classes.iconItem}
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={Settings} />
              </ListItemIcon>

              {expandedToggle && <ListItemText primary="Term Setting" />}
            </ListItemButton>

            <ListItemButton
              className={expandedToggle ? classes.expandBtn : classes.iconItem}
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={Rosters} />
              </ListItemIcon>

              {expandedToggle && <ListItemText primary="Nwea Rosters" />}
            </ListItemButton>

            <ListItemButton
              className={expandedToggle ? classes.expandBtn : classes.iconItem}
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={ParentAssets} />
              </ListItemIcon>

              {expandedToggle && <ListItemText primary="Parent Assets" />}
            </ListItemButton>

            <ListItemButton
              className={expandedToggle ? classes.expandBtn : classes.iconItem}
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={GradeBook} />
              </ListItemIcon>

              {expandedToggle && <ListItemText primary="GradeBook" />}
            </ListItemButton>

            <ListItemButton
              className={expandedToggle ? classes.expandBtn : classes.iconItem}
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={Academics} />
              </ListItemIcon>

              {expandedToggle && <ListItemText primary="Academics" />}
            </ListItemButton>

            <ListItemButton
              className={expandedToggle ? classes.expandBtn : classes.iconItem}
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={Attendance} />
              </ListItemIcon>

              {expandedToggle && <ListItemText primary="Attendance" />}
            </ListItemButton>

            <ListItemButton
              className={expandedToggle ? classes.expandBtn : classes.iconItem}
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={Jobs} />
              </ListItemIcon>

              {expandedToggle && <ListItemText primary="Jobs" />}
            </ListItemButton>
          </div>

          <div className={expandedToggle ? classes.logout : classes.smallDiv}>
            {expandedToggle && <div className={classes.logoutTopBorder} />}

            <ListItemButton component={Button}>
              <ListItemIcon>
                <img alt="" src={Logout} />
              </ListItemIcon>

              {expandedToggle && <ListItemText primary="Logout" />}
            </ListItemButton>
          </div>
        </List>
      </Box>

      {!panel && expandedToggle && backdrop}
    </>
  );
};

export default Sidebar;
