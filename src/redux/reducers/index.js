import { combineReducers } from "redux";

import byCategoryReducer from "./by-category-reducer";
import byDayReducer from "./by-day-reducer";
import byGenderReducer from "./by-gender-reducer";
import byHoursReducer from "./by-hours-reducer";
import byKeywordReducer from "./by-keyword-reducer";
import numberReducer from "./dashboard-numbers-reducer";
import gradeReducer from "./grade-reducer";
import operatorReducer from "./operator-reducer";
import panelReducer from "./panel-left.reducer";
import schoolReducer from "./school-reducer";
import studentReducer from "./student-reducer";

export default combineReducers({
  byCategory: byCategoryReducer,
  byDay: byDayReducer,
  byGender: byGenderReducer,
  byHours: byHoursReducer,
  byKeyword: byKeywordReducer,
  dashboardNumbers: numberReducer,
  grade: gradeReducer,
  operator: operatorReducer,
  leftState: panelReducer,
  school: schoolReducer,
  student: studentReducer,
});
