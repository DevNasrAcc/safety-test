import {
  getAllSchools,
  getSchoolsByOperator,
  getViolationBySchool,
} from "../services/school-services";

export const allSchools = (setSchoolLoading) => async (dispatch) => {
  try {
    const response = await getAllSchools();

    if (response) {
      setSchoolLoading(false);

      dispatch({
        type: "ALLSCHOOLS",
        payload: response.data,
      });
    }
  } catch (error) {
    if (error) {
      setSchoolLoading(false);
    }
  }
};

export const schoolsByOperators =
  (operatorId, setSchoolByOperatorLoading) => async (dispatch) => {
    try {
      const response = await getSchoolsByOperator(operatorId);

      if (response) {
        setSchoolByOperatorLoading(false);

        dispatch({
          type: "SCHOOLBYOPERATOR",
          payload: response.data,
        });
      }
    } catch (error) {
      if (error) {
        setSchoolByOperatorLoading(false);
      }
    }
  };

export const violationsBySchool =
  (filterString, startDate, endDate, setBySchoolLoading) =>
  async (dispatch) => {
    try {
      const response = await getViolationBySchool(
        filterString,
        startDate,
        endDate
      );

      if (response) {
        setBySchoolLoading(false);

        dispatch({
          type: "VIOLATIONSBYSCHOOL",
          payload: response.data,
        });
      }
    } catch (error) {
      if (error) {
        setBySchoolLoading(false);
      }
    }
  };
