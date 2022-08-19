/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { IconButton, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  parse,
  startOfToday,
} from "date-fns";

import Border from "../../../components/downBorder";

import Left from "../../../assets/images/calender-left.svg";
import Right from "../../../assets/images/calender-right.svg";
import CalenderLogo from "../../../assets/images/calendar.svg";

const useStyles = makeStyles({
  mainDiv: {
    paddingLeft: "43px",
    paddingRight: "43px",

    "& h2": {
      fontSize: "22.1439px",
      lineHeight: "28px",
      color: "#000000",
      flex: "1 1 auto",
      display: "flex",
      fontFamily: "MontserratBold",

      "& .monthName": {
        marginLeft: 19,
        marginRight: 48,
      },
    },

    "@media only screen and (max-width: 1600px)": {
      "& h2": {
        fontSize: "20px",
      },
    },

    "@media only screen and (max-width: 1440px)": {
      "& h2": {
        lineHeight: "26px !important",

        "& .monthName": {
          marginLeft: "10px !important",
          marginRight: "28px !important",
        },
      },
    },

    "@media only screen and (max-width: 1366px)": {
      padding: "0px 18px !important",

      "& h2": {
        fontSize: "14px !important",
        lineHeight: "20px !important",

        "& .calendarLogo": {
          "& img": {
            width: "19px",
            height: "18px",
          },
        },
      },
    },

    "@media only screen and (max-width: 1280px)": {
      "& h2": {
        lineHeight: "22px !important",

        "& .monthName": {
          marginRight: "20px !important",
        },
      },
    },
  },

  iconButton: {
    background: "transparent !important",
    border: "none",
    flex: "none",
    padding: "0px !important",

    "& :hover": {
      "& path": {
        fill: "#FEC875",
      },
    },

    "@media only screen and (max-width: 1366px)": {
      "& img": {
        width: "8px",
      },
    },
  },

  days: {
    display: "grid",
    marginTop: "1rem",
    textAlign: "center",
    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    fontSize: "18.4533px",
    lineHeight: "23px",
    color: "#000000",
    fontFamily: "MontserratBold",

    "@media only screen and (max-width: 1830px)": {
      fontSize: "16.4533px",
      marginTop: "0.2rem",
    },

    "@media only screen and (max-width: 1440px)": {
      fontSize: "16px",
      lineHeight: "23px",
    },

    "@media only screen and (max-width: 1366px)": {
      fontSize: "12px",
      lineHeight: "18px",
    },

    "@media only screen and (max-width: 1280px)": {
      lineHeight: "10px",
    },
  },

  calender: {
    display: "grid",
    marginTop: "0.5rem",
    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    fontSize: "16.6079px",
    lineHeight: "21px",
    textAlign: "center",
    color: "#000000",
    fontFamily: "MontserratRegular",

    "@media only screen and (max-width: 1830px)": {
      fontSize: "15px",
      lineHeight: "19px",
    },

    "@media only screen and (max-width: 1730px)": {
      lineHeight: "15px",
      marginTop: "0.2rem",
    },
  },

  day: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "31px",
    height: "31px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontFamily: "MontserratRegular",
    margin: "auto",

    "@media  only screen and (max-width: 1830px)": {
      width: "28px",
      height: "25px",
    },

    "@media  only screen and (max-width: 1730px)": {
      width: "26px",
      height: "22px",
      fontSize: "14px",
    },

    "@media only screen and (max-width: 1366px)": {
      width: "18px",
      height: "16px",
      fontSize: "11px",
    },
  },
});

const Calender = (props) => {
  const classes = useStyles();
  const panel = useSelector((state) => state.leftState.leftState);

  let today = startOfToday();

  // eslint-disable-next-line no-unused-vars
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let colStartClasses = ["", "1", "2", "3", "4", "5", "6"];

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 300,
      fontFamily: "Montserrat",
      fontSize: "9px",
      background: "rgba(97, 97, 97, 0.92)",
      color: "#ffffff",
      fontWeight: 500,
      lineHeight: "15px",
      padding: "4px 8px",
      borderRadius: "4px !important",
      marginLeft: "8px !important",
      marginTop: "10px !important",
    },
  });

  const arr = [
    3546, 2466, 4647, 4647, 2467, 4747, 0, 1245, 6689, 8080, 3653, 4634, 3577,
    8584, 4624, 2467, 8066, 1123, 4666, 2345, 8564, 1245, 6689, 8080, 3653,
    4634, 3577, 8584, 4624, 2467, 1123,
  ];

  return (
    <div className={classes.calenderDiv}>
      <Box
        className={classes.mainDiv}
        sx={{
          "@media only screen and (max-width: 1830px)": {
            padding: panel ? "0px 38px" : "0px 43px",
          },

          "@media only screen and (max-width: 1600px)": {
            padding: panel ? "0px 28px" : "0px 38px",
          },
        }}
      >
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h2">
                <span className="calendarLogo">
                  <img alt="" src={CalenderLogo} />
                </span>

                <span className="monthName">
                  {format(firstDayCurrentMonth, "MMMM")}
                </span>

                <span>{format(firstDayCurrentMonth, "yyyy")}</span>
              </Typography>

              <IconButton
                onClick={previousMonth}
                className={classes.iconButton}
                style={{
                  marginRight: 8,
                }}
              >
                <img alt="" src={Left} />
              </IconButton>
              <IconButton
                onClick={nextMonth}
                className={classes.iconButton}
                style={{
                  marginLeft: 8,
                }}
              >
                <img alt="" src={Right} aria-hidden="true" />
              </IconButton>
            </div>
            <div className={classes.days}>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
              <div>Su</div>
            </div>
            <div className={classes.calender}>
              {days.map((day, dayIdx) =>
                arr.map((a, idx) => {
                  if (dayIdx === idx) {
                    return (
                      <Box
                        key={day.toString()}
                        sx={{
                          paddingTop: "0.375rem",
                          paddingBottom: "0.375rem",
                          gridColumnStart:
                            dayIdx === 0 && colStartClasses[getDay(day)],

                          "@media only screen and (max-width: 1366px)": {
                            paddingTop: "0.1rem",
                            paddingBottom: "0.1rem",
                          },
                        }}
                      >
                        <CustomWidthTooltip
                          placement="right"
                          title={`${a} violations`}
                          key={idx}
                        >
                          <button
                            type="button"
                            className={classes.day}
                            style={{
                              color: "#464255",
                              backgroundColor:
                                a === 0
                                  ? "transparent"
                                  : a <= 1500 && a >= 0
                                  ? "rgba(136, 205, 212, 1)"
                                  : a <= 3000 && a >= 1501
                                  ? "rgba(136, 205, 212, 0.8)"
                                  : a <= 4500 && a >= 3001
                                  ? "rgba(136, 205, 212, 0.6)"
                                  : a <= 6000 && a >= 4501
                                  ? "rgba(136, 205, 212, 0.4)"
                                  : a >= 6001 && "rgba(136, 205, 212, 0.2)",
                              border: isToday(day) && "2px solid #FEC875",
                            }}
                          >
                            <time dateTime={format(day, "yyyy-MM-dd")}>
                              {format(day, "d")}
                            </time>
                          </button>
                        </CustomWidthTooltip>
                      </Box>
                    );
                  }
                })
              )}
            </div>
          </div>
        </div>
      </Box>

      <Border
        sx={{
          "@media only screen and (max-width: 1024px)": {
            display: "none",
          },
        }}
      />
    </div>
  );
};

export default Calender;
