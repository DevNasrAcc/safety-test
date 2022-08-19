import { getViolationsByDay } from "../services/by-day-services";

export const violationsByDay =
  (filterString, startDate, endDate, setByDayLoading) => async (dispatch) => {
    try {
      const response = await getViolationsByDay(
        filterString,
        startDate,
        endDate
      );

      if (response) {
        setByDayLoading(false);

        dispatch({
          type: "VIOLATIONSBYDAY",
          payload: response.data,
        });
      }
    } catch (error) {
      if (error) {
        setByDayLoading(false);
      }
    }
  };
