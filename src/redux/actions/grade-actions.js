import {
  getGradesBySchool,
  getViolationByGrade,
} from "../services/grade-services";

export const gradesBySchool =
  (schoolCode, setGradesLoading) => async (dispatch) => {
    try {
      const response = await getGradesBySchool(schoolCode);

      if (response) {
        setGradesLoading(false);

        dispatch({
          type: "GRADESBYSCHOOL",
          payload: response.data,
        });
      }
    } catch (error) {
      if (error) {
        setGradesLoading(false);
      }
    }
  };

export const violationsByGrade =
  (filterString, startDate, endDate, setByGradeLoading) => async (dispatch) => {
    try {
      const response = await getViolationByGrade(
        filterString,
        startDate,
        endDate
      );

      if (response) {
        setByGradeLoading(false);

        dispatch({
          type: "VIOLATIONSBYGRADE",
          payload: response.data,
        });
      }
    } catch (error) {
      if (error) {
        setByGradeLoading(false);
      }
    }
  };
