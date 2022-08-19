import { getViolationsByCategory } from "../services/by-category-services";

export const violationsByCategory =
  (filterString, startDate, endDate, setByCategoryLoading) =>
  async (dispatch) => {
    try {
      const response = await getViolationsByCategory(
        filterString,
        startDate,
        endDate
      );

      if (response) {
        setByCategoryLoading(false);

        dispatch({
          type: "VIOLATIONSBYCATEGORY",
          payload: response.data,
        });
      }
    } catch (error) {
      if (error) {
        setByCategoryLoading(false);
      }
    }
  };
