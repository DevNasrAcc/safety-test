import { getDashboardNumbers } from "../services/dashboard-numbers-services";

export const dashboardNumbers =
  (filterString, startDate, endDate, setNumbersLoading) => async (dispatch) => {
    try {
      const response = await getDashboardNumbers(
        filterString,
        startDate,
        endDate
      );

      if (response) {
        setNumbersLoading(false);

        dispatch({
          type: "DASHBOARDNUMBERS",
          payload: response.data,
        });
      }
    } catch (error) {
      if (error) {
        setNumbersLoading(false);
      }
    }
  };
