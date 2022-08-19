import { getViolationsBySchoolHours } from "../services/by-hours-services";

export const violationsBySchoolHours =
  (filterString, startDate, endDate, setBySchoolHoursLoading) =>
  async (dispatch) => {
    try {
      const response = await getViolationsBySchoolHours(
        filterString,
        startDate,
        endDate
      );

      if (response) {
        setBySchoolHoursLoading(false);

        dispatch({
          type: "VIOLATIONSBYSCHOOLHOURS",
          payload: response.data,
        });
      }
    } catch (error) {
      if (error) {
        setBySchoolHoursLoading(false);
      }
    }
  };
