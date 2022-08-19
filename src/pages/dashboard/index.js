import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import millify from "millify";

import { makeStyles } from "@mui/styles";
import { Grid, Box } from "@mui/material";

import StyleBox from "../../components/details";

// Left Section
// Second Section
import ViolationsByGender from "./violationByGender";
import ViolationByTime from "./violationsByTime";
import NumberOfViolation from "./numberOfViolation";

// Third Section
import ViolationByGrade from "./violationByGrade";
import ViolationByCategory from "./violationsByCategory";
import DuringAfterSchoolHours from "./duringAferSchool";
import KeywordsAttempt from "./keywordsAttempt";

// Right Section
import ScreenShot from "./screenShot";
import Date from "./dateFilter";
import Calender from "./calender";
import AllFilters from "./allFilters";
import Border from "../../components/downBorder";

// Actions
import { violationsByCategory } from "../../redux/actions/by-category-action";
import { violationsByDay } from "../../redux/actions/by-day-action";
import { violationsByGender } from "../../redux/actions/by-gender-action";
import { violationsBySchoolHours } from "../../redux/actions/by-hours-action";
import { violationsByKeyword } from "../../redux/actions/by-keyword-action";
import { dashboardNumbers } from "../../redux/actions/dashboard-numbers-action";

import {
  gradesBySchool,
  violationsByGrade,
} from "../../redux/actions/grade-actions";

import {
  allOperators,
  violationsByOperators,
  allFilterCategories,
} from "../../redux/actions/operator-actions";

import {
  allSchools,
  schoolsByOperators,
  violationsBySchool,
} from "../../redux/actions/school-actions";

import {
  studentsByGrade,
  violationsByStudents,
} from "../../redux/actions/student-actions";

const useStyles = makeStyles({
  rightGrid: {
    borderRight: "2px solid #E8E8E8",
    padding: "30px 40px 60px 35px",

    "@media only screen and (max-width: 1830px)": {
      padding: "22px 32px 0px 30px",
    },

    "@media only screen and (max-width: 1440px)": {
      padding: "20px 25px 0px 35px",
    },

    "@media only screen and (max-width: 1366px)": {
      padding: "10px 20px 0px 30px",
    },

    "@media only screen and (max-width: 1280px)": {
      padding: "10px 15px 0px 22px",
    },

    "@media only screen and (max-width: 1023px)": {
      borderRight: "none",
      padding: "15px 18px 0px 18px",
    },

    "@media only screen and (max-width: 828px)": {
      padding: "15px 20px",
    },
  },

  firstSection: {
    overflowX: "hidden",
  },

  childGrid: {
    height: 338,

    "@media only screen and (max-width: 1830px)": {
      height: "300px",
    },

    "@media only screen and (max-width: 1730px)": {
      height: "285px",
    },

    "@media only screen and (max-width: 1600px)": {
      height: "265px",
    },

    "@media only screen and (max-width: 1366px)": {
      height: "225px",
    },

    "@media only screen and (max-width: 1280px)": {
      height: "220px",
    },

    "@media only screen and (max-width: 1100px)": {
      height: "220px",
    },

    "@media only screen and (max-width: 540px)": {
      height: 245,
    },
  },

  lastSection: {
    marginTop: "20px !important",

    "@media only screen and (max-width: 1280px)": {
      marginTop: "12px !important",
    },
  },

  allButtons: {
    display: "flex",
    overflowX: "auto",
    flexGrow: 1,

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  remove: {
    "@media only screen and (max-width: 1100px)": {
      display: "none",
    },
  },

  tab: {
    "@media only screen and (max-width: 1100px)": {
      marginTop: "20px !important",
      display: "block",
    },

    "@media only screen and (max-width: 800px)": {
      marginTop: "0px !important",
    },
  },

  showTab: {
    display: "none",

    "@media only screen and (max-width: 1100px)": {
      display: "block",
      marginTop: "15px !important",
    },
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [categoryLoading, setByCategoryLoading] = useState(false);
  const [byDayLoading, setByDayLoading] = useState(false);
  const [byGenderLoading, setByGenderLoading] = useState(false);
  const [bySchoolHoursLoading, setBySchoolHoursLoading] = useState(false);
  const [byKeywordLoading, setByKeywordLoading] = useState(false);
  const [numbersLoading, setNumbersLoading] = useState(false);
  const [gradesLoading, setGradesLoading] = useState(false);
  const [byGradeLoading, setByGradeLoading] = useState(false);
  const [operatorLoading, setOperatorLoading] = useState(false);
  const [byOperatorLoading, setByOperatorLoading] = useState(false);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [schoolLoading, setSchoolLoading] = useState(false);
  const [schoolByOperatorLoading, setSchoolByOperatorLoading] = useState(false);
  const [bySchoolLoading, setBySchoolLoading] = useState(false);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [byStudentsLoading, setByStudentsLoading] = useState(false);

  const [operatorId, setOperatorId] = useState(null);
  const [schoolCode, setSchoolCode] = useState(null);
  const [grade, setGrade] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  let [operArr, setOpeArr] = useState([]);
  let [schArr, setSchArr] = useState([]);
  let [gradeArr, setGradeArr] = useState([]);
  let [studentArr, setStudentArr] = useState([]);
  let [cateArr, setCateArr] = useState([]);

  let combineArr = "";

  if (operArr.length) {
    operArr = operArr.join(" or ");
    combineArr = [operArr];
  }

  if (schArr.length) {
    schArr = schArr?.join(" or ");
    combineArr = [operArr, schArr];
  }

  if (gradeArr.length) {
    gradeArr = gradeArr?.join(" or ");
    combineArr = [operArr, schArr, gradeArr];
  }

  if (studentArr.length) {
    studentArr = studentArr?.join(" or ");
    combineArr = [operArr, schArr, gradeArr, studentArr];
  }

  if (cateArr.length) {
    cateArr = cateArr?.join(" or ");
    combineArr = [operArr, schArr, gradeArr, studentArr, cateArr];
  }

  if (Array.isArray(combineArr)) {
    combineArr = combineArr.join(" and ");
  }

  useEffect(() => {
    setByCategoryLoading(true);
    setByDayLoading(true);
    setByGenderLoading(true);
    setBySchoolHoursLoading(true);
    setByKeywordLoading(true);
    setNumbersLoading(true);
    setByGradeLoading(true);
    setOperatorLoading(true);
    setByOperatorLoading(true);
    setFiltersLoading(true);
    setSchoolLoading(true);
    setBySchoolLoading(true);
    setByStudentsLoading(true);

    dispatch(
      dashboardNumbers(
        `${combineArr === "" ? 0 : combineArr}`,
        `${startDate === null ? "1970-01-01" : `${startDate} 00:00:00:000`}`,
        `${endDate === null ? "1970-01-01" : `${endDate} 00:00:00:000`}`,
        setNumbersLoading
      )
    );
    dispatch(allOperators(setOperatorLoading));
    dispatch(allSchools(setSchoolLoading));
    dispatch(allFilterCategories(setFiltersLoading));

    // Violations API
    dispatch(
      violationsByGender(
        `${combineArr === "" ? 0 : combineArr}`,
        `${startDate === null ? "1970-01-01" : `${startDate} 00:00:00:000`}`,
        `${endDate === null ? "1970-01-01" : `${endDate} 00:00:00:000`}`,
        setByGenderLoading
      )
    );

    dispatch(
      violationsByDay(
        `${combineArr === "" ? 0 : combineArr}`,
        `${startDate === null ? "1970-01-01" : `${startDate} 00:00:00:000`}`,
        `${endDate === null ? "1970-01-01" : `${endDate} 00:00:00:000`}`,
        setByDayLoading
      )
    );

    dispatch(
      violationsByGrade(
        `${combineArr === "" ? 0 : combineArr}`,
        `${startDate === null ? "1970-01-01" : `${startDate} 00:00:00:000`}`,
        `${endDate === null ? "1970-01-01" : `${endDate} 00:00:00:000`}`,
        setByGradeLoading
      )
    );

    dispatch(
      violationsByCategory(
        `${combineArr === "" ? 0 : combineArr}`,
        `${startDate === null ? "1970-01-01" : `${startDate} 00:00:00:000`}`,
        `${endDate === null ? "1970-01-01" : `${endDate} 00:00:00:000`}`,
        setByCategoryLoading
      )
    );

    dispatch(
      violationsBySchoolHours(
        `${combineArr === "" ? 0 : combineArr}`,
        `${startDate === null ? "1970-01-01" : `${startDate} 00:00:00:000`}`,
        `${endDate === null ? "1970-01-01" : `${endDate} 00:00:00:000`}`,
        setBySchoolHoursLoading
      )
    );

    dispatch(
      violationsByKeyword(
        `${combineArr === "" ? 0 : combineArr}`,
        `${startDate === null ? "1970-01-01" : `${startDate} 00:00:00:000`}`,
        `${endDate === null ? "1970-01-01" : `${endDate} 00:00:00:000`}`,
        setByKeywordLoading
      )
    );

    dispatch(
      violationsByOperators(
        `${combineArr === "" ? 0 : combineArr}`,
        `${startDate === null ? "1970-01-01" : `${startDate} 00:00:00:000`}`,
        `${endDate === null ? "1970-01-01" : `${endDate} 00:00:00:000`}`,
        setByOperatorLoading
      )
    );

    dispatch(
      violationsBySchool(
        `${combineArr === "" ? 0 : combineArr}`,
        `${startDate === null ? "1970-01-01" : `${startDate} 00:00:00:000`}`,
        `${endDate === null ? "1970-01-01" : `${endDate} 00:00:00:000`}`,
        setBySchoolLoading
      )
    );

    dispatch(
      violationsByStudents(
        `${combineArr === "" ? 0 : combineArr}`,
        `${startDate === null ? "1970-01-01" : `${startDate} 00:00:00:000`}`,
        `${endDate === null ? "1970-01-01" : `${endDate} 00:00:00:000`}`,
        setByStudentsLoading
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operArr, schArr, gradeArr, studentArr, cateArr, endDate, startDate]);

  useEffect(() => {
    if (operatorId !== null) {
      setSchoolByOperatorLoading(true);
      dispatch(schoolsByOperators(operatorId, setSchoolByOperatorLoading));
    }

    if (schoolCode !== null) {
      setGradesLoading(true);
      dispatch(gradesBySchool(schoolCode, setGradesLoading));
    }

    if (operatorId !== null && schoolCode !== null) {
      setStudentsLoading(true);
      dispatch(studentsByGrade(schoolCode, grade, setStudentsLoading));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grade, operatorId, schoolCode]);

  const numbers = useSelector(
    (state) => state.dashboardNumbers.dashboardNumbers
  );
  const byCategory = useSelector((state) => state.byCategory.byCategory);

  return (
    <Box style={{ height: "100%" }}>
      <Grid container height="100%">
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className={classes.showTab}
          sx={{
            marginBottom: "10px !important",
          }}
        >
          <Date />
        </Grid>

        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className={classes.showTab}
          sx={{
            marginBottom: "15px !important",
          }}
        >
          <Calender />
        </Grid>

        <Grid
          item
          lg={9}
          md={12}
          sm={12}
          xs={12}
          xxs={12}
          className={classes.rightGrid}
        >
          <div className={classes.firstSection}>
            <div className={classes.allButtons}>
              <StyleBox
                firstText={numbers?.schoolCount}
                secondText="Count of Schools"
                numbersLoading={numbersLoading}
              />

              <StyleBox
                firstText={numbers?.firstGrade}
                secondText="First Grade"
                numbersLoading={numbersLoading}
              />

              <StyleBox
                firstText={numbers?.lastGrade}
                secondText="Last Grade"
                numbersLoading={numbersLoading}
              />

              <StyleBox
                firstText={millify(numbers?.studentsViolating || 0)}
                secondText="Violation student"
                numbersLoading={numbersLoading}
              />

              <StyleBox
                firstText={millify(numbers?.totalViolations || 0)}
                secondText="Total Violation"
                numbersLoading={numbersLoading}
              />

              <StyleBox
                firstText={numbers?.keywords}
                secondText="Keywords"
                numbersLoading={numbersLoading}
              />
            </div>

            <Border numbers />
          </div>

          <Grid container spacing={2}>
            <Grid
              item
              xl={3}
              lg={3}
              md={12}
              sm={12}
              xs={12}
              xxs={12}
              className={classes.childGrid}
              sx={{
                "@media only screen and (max-width: 540px)": {
                  height: "240px",
                },
              }}
            >
              <ViolationsByGender byGenderLoading={byGenderLoading} />
            </Grid>

            <Grid
              item
              xl={6}
              lg={6}
              md={12}
              sm={12}
              xs={12}
              xxs={12}
              className={classes.childGrid}
              sx={{
                "@media only screen and (max-width: 1100px)": {
                  height: "260px !important",
                },
              }}
            >
              <ViolationByTime byDayLoading={byDayLoading} />
            </Grid>

            <Grid
              item
              xl={3}
              lg={3}
              md={12}
              sm={12}
              xs={12}
              xxs={12}
              className={classes.childGrid}
            >
              <NumberOfViolation
                byOperatorLoading={byOperatorLoading}
                bySchoolLoading={bySchoolLoading}
                byStudentsLoading={byStudentsLoading}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.lastSection}>
            <Grid
              item
              xl={3}
              lg={3}
              md={6}
              sm={6}
              xs={6}
              xxs={12}
              className={classes.childGrid}
            >
              <ViolationByGrade byGradeLoading={byGradeLoading} />
            </Grid>

            <Grid
              item
              xl={3}
              lg={3}
              md={6}
              sm={6}
              xs={6}
              xxs={12}
              className={classes.childGrid}
            >
              <ViolationByCategory
                categoryLoading={categoryLoading}
                byCategory={byCategory}
              />
            </Grid>

            <Grid
              item
              xl={3}
              lg={3}
              md={6}
              sm={6}
              xs={6}
              xxs={12}
              className={classes.childGrid}
            >
              <DuringAfterSchoolHours
                bySchoolHoursLoading={bySchoolHoursLoading}
              />
            </Grid>

            <Grid
              item
              xl={3}
              lg={3}
              md={6}
              sm={6}
              xs={6}
              xxs={12}
              className={classes.childGrid}
              style={{ position: "relative" }}
            >
              <KeywordsAttempt byKeywordLoading={byKeywordLoading} />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          lg={3}
          md={12}
          sm={12}
          xs={12}
          xxs={12}
          style={{ paddingBottom: 10 }}
          className={classes.tab}
        >
          <Grid container>
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className={classes.remove}
            >
              <ScreenShot />
            </Grid>

            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className={classes.remove}
            >
              <Date setStartDate={setStartDate} setEndDate={setEndDate} />
            </Grid>

            <Grid item lg={12} md={6} sm={6} xs={6} className={classes.remove}>
              <Calender />
            </Grid>

            <Grid item lg={12} md={6} sm={12} xs={12}>
              <AllFilters
                operatorLoading={operatorLoading}
                schoolLoading={schoolLoading}
                setOperatorId={setOperatorId}
                setSchoolCode={setSchoolCode}
                setGrade={setGrade}
                gradesLoading={gradesLoading}
                schoolByOperatorLoading={schoolByOperatorLoading}
                studentsLoading={studentsLoading}
                filtersLoading={filtersLoading}
                setOpeArr={setOpeArr}
                setSchArr={setSchArr}
                setGradeArr={setGradeArr}
                setStudentArr={setStudentArr}
                setCateArr={setCateArr}
                operArr={operArr}
                schArr={schArr}
                gradeArr={gradeArr}
                studentArr={studentArr}
                cateArr={cateArr}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
