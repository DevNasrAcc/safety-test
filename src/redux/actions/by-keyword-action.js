import { getViolationsByKeyword } from "../services/by-keyword-services";

export const violationsByKeyword =
  (filterString, startDate, endDate, setByKeywordLoading) =>
  async (dispatch) => {
    try {
      const response = await getViolationsByKeyword(
        filterString,
        startDate,
        endDate
      );

      if (response) {
        setByKeywordLoading(false);

        dispatch({
          type: "VIOLATIONSBYKEYWORD",
          payload: response.data,
        });
      }
    } catch (error) {
      if (error) {
        setByKeywordLoading(false);
      }
    }
  };
