import React, { useEffect } from "react";

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

import Menu from "../../assets/images/logos/right.svg";
import Logo from "../../assets/images/logos/logo.svg";
import Dashboard from "../../assets/images/logos/dashboard.svg";
import Users from "../../assets/images/logos/users.svg";
import Classes from "../../assets/images/logos/classes.svg";
import Settings from "../../assets/images/logos/term-setting.svg";
import Rosters from "../../assets/images/logos/rosters.svg";
import ParentAssets from "../../assets/images/logos/parent-assets.svg";
import GradeBook from "../../assets/images/logos/grade-book.svg";
import Academics from "../../assets/images/logos/academics.svg";
import Attendance from "../../assets/images/logos/attendance.svg";
import Jobs from "../../assets/images/logos/jobs.svg";
import Logout from "../../assets/images/logos/log-out.svg";

import Profile from "../../assets/images/logos/user-image.png";
import Left from "../../assets/images/logos/left.svg";

const useStyles = makeStyles({
  div: {
    backgroundColor: "#020A58",
    height: "100vh",
    position: "sticky",
    left: 0,
    top: 0,
    overflow: "auto",
    transition: "all 0.3s ease-in-out",
    zIndex: 300,

    "& ul": {
      padding: "0 !important",

      "& button": {
        textTransform: "inherit !important",

        "& .MuiTypography-root": {
          fontFamily: "MontserratBlack",
          fontSize: "14.93px !important",
          lineHeight: "18.82px !important",
          color: "#FFFFFF !important",
        },
      },
    },

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  expandBtn: {
    marginTop: "22px !important",
    marginLeft: "37px !important",
    padding: "0px !important",
  },

  list: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  links: {
    paddingTop: 26,
  },

  iconItem: {
    padding: "0 !important",
    margin: "19px auto 0px !important",

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
  },

  logout: {
    paddingBottom: 32,

    "& button": {
      padding: "0px !important",
      marginLeft: "37px !important",
    },
  },

  smallDiv: {
    paddingBottom: 20,

    "& button": {
      margin: "0px auto !important",
      padding: 0,

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
      margin: "24px 0px 33px",
    },
  },

  topBar: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: "30px",

    "& p": {
      color: "#D9D9D9",
      fontFamily: "MontserratRegular",
      fontSize: "11.39px",
      lineHeight: "14px",
      margin: "0px 10px 0px 27px",
    },
  },

  profile: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    marginLeft: "30px",

    "& h4": {
      fontFamily: "MontserratBlack",
      fontSize: "19.6103px",
      lineHeight: "25px",
      color: "#FFFFFF",
    },

    "& p": {
      fontFamily: "MontserratRegular",
      fontSize: "11.39px",
      lineHeight: "14px",
      color: "#FFFFFF",
    },

    "& .imgDiv": {
      width: 53,
      height: 53,
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
    marginBottom: 15,
    marginTop: 15,
  },
});

const Sidebar = (props) => {
  const classes = useStyles();

  const drawerToggle = () => {
    props.setExpandedToggle(false);
  };

  const openDrawer = () => {
    props.setExpandedToggle(true);
  };

  let drawerClasses = "sidedrawer";

  if (props.show) {
    drawerClasses = "sidedrawer open";
  }

  useEffect(() => {
    const bodyStyle = document.getElementsByTagName("body");

    if (props.show) {
      bodyStyle[0].style.overflow = "hidden";
    } else {
      bodyStyle[0].style.overflow = "auto";
    }
  }, [props.show]);

  return (
    <div
      className={drawerClasses}
      style={{
        width: props.expandedToggle ? "330px" : "100px",
        maxWidth: props.expandedToggle ? "330px" : "100px",
        transition: props.expandedToggle && "all 0.2s ease-in-out",
      }}
    >
      <Box className={classes.div}>
        <List className={classes.list}>
          <div className={classes.links}>
            {props.expandedToggle && (
              <div className={classes.header}>
                <div className={classes.topBar}>
                  <div
                    onClick={() => drawerToggle()}
                    style={{ cursor: "pointer" }}
                  >
                    <img alt="" src={Left} />
                  </div>

                  <div>
                    <Typography variant="body1">Charters school</Typography>
                  </div>

                  <div>
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

            {!props.expandedToggle && (
              <>
                <ListItemButton component={Button} className={classes.menu}>
                  <ListItemIcon onClick={() => openDrawer()}>
                    <img alt="" src={Menu} />
                  </ListItemIcon>
                </ListItemButton>

                <ListItemButton
                  className={
                    props.expandedToggle ? classes.expandBtn : classes.iconItem
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
              className={
                props.expandedToggle ? classes.expandBtn : classes.iconItem
              }
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={Dashboard} />
              </ListItemIcon>

              {props.expandedToggle && <ListItemText primary="Dashboard" />}
            </ListItemButton>

            <ListItemButton
              className={
                props.expandedToggle ? classes.expandBtn : classes.iconItem
              }
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={Users} />
              </ListItemIcon>

              {props.expandedToggle && <ListItemText primary="Users" />}
            </ListItemButton>

            <ListItemButton
              className={
                props.expandedToggle ? classes.expandBtn : classes.iconItem
              }
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={Classes} />
              </ListItemIcon>

              {props.expandedToggle && <ListItemText primary="Classes" />}
            </ListItemButton>

            <ListItemButton
              className={
                props.expandedToggle ? classes.expandBtn : classes.iconItem
              }
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={Settings} />
              </ListItemIcon>

              {props.expandedToggle && <ListItemText primary="Term Setting" />}
            </ListItemButton>

            <ListItemButton
              className={
                props.expandedToggle ? classes.expandBtn : classes.iconItem
              }
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={Rosters} />
              </ListItemIcon>

              {props.expandedToggle && <ListItemText primary="Nwea Rosters" />}
            </ListItemButton>

            <ListItemButton
              className={
                props.expandedToggle ? classes.expandBtn : classes.iconItem
              }
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={ParentAssets} />
              </ListItemIcon>

              {props.expandedToggle && <ListItemText primary="Parent Assets" />}
            </ListItemButton>

            <ListItemButton
              className={
                props.expandedToggle ? classes.expandBtn : classes.iconItem
              }
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={GradeBook} />
              </ListItemIcon>

              {props.expandedToggle && <ListItemText primary="GradeBook" />}
            </ListItemButton>

            <ListItemButton
              className={
                props.expandedToggle ? classes.expandBtn : classes.iconItem
              }
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={Academics} />
              </ListItemIcon>

              {props.expandedToggle && <ListItemText primary="Academics" />}
            </ListItemButton>

            <ListItemButton
              className={
                props.expandedToggle ? classes.expandBtn : classes.iconItem
              }
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={Attendance} />
              </ListItemIcon>

              {props.expandedToggle && <ListItemText primary="Attendance" />}
            </ListItemButton>

            <ListItemButton
              className={
                props.expandedToggle ? classes.expandBtn : classes.iconItem
              }
              component={Button}
            >
              <ListItemIcon>
                <img alt="" src={Jobs} />
              </ListItemIcon>

              {props.expandedToggle && <ListItemText primary="Jobs" />}
            </ListItemButton>
          </div>

          <div
            className={props.expandedToggle ? classes.logout : classes.smallDiv}
          >
            {props.expandedToggle && (
              <div className={classes.logoutTopBorder} />
            )}

            <ListItemButton component={Button}>
              <ListItemIcon>
                <img alt="" src={Logout} />
              </ListItemIcon>

              {props.expandedToggle && <ListItemText primary="Logout" />}
            </ListItemButton>
          </div>
        </List>
      </Box>
    </div>
  );
};

export default Sidebar;
