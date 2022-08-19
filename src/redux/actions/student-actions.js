import {
  getStudentsBySchoolGrade,
  getViolationByStudents,
} from "../services/student-services";

export const studentsByGrade =
  (schoolCode, grade, setStudentsLoading) => async (dispatch) => {
    try {
      const response = await getStudentsBySchoolGrade(schoolCode, grade);

      if (response) {
        setStudentsLoading(false);

        dispatch({
          type: "STUDENTSBYGRADE",
          payload: response.data,
        });
      }
    } catch (error) {
      if (error) {
        setStudentsLoading(false);
      }
    }
  };

export const violationsByStudents =
  (filterString, startDate, endDate, setByStudentsLoading) =>
  async (dispatch) => {
    try {
      const response = await getViolationByStudents(
        filterString,
        startDate,
        endDate
      );

      if (response) {
        setByStudentsLoading(false);

        dispatch({
          type: "VIOLATIONSBYSTUDENTS",
          payload: response.data,
        });
      }
    } catch (error) {
      if (error) {
        setByStudentsLoading(false);
      }
    }
  };
