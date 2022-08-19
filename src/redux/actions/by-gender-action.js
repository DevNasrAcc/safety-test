import { getViolationsByGender } from "../services/by-gender-services";

export const violationsByGender =
  (filterString, startDate, endDate, setByGenderLoading) =>
  async (dispatch) => {
    try {
      const response = await getViolationsByGender(
        filterString,
        startDate,
        endDate
      );

      if (response) {
        setByGenderLoading(false);

        dispatch({
          type: "VIOLATIONSBYGENDER",
          payload: response.data,
        });

        dispatch({
          type: "CLEARMESSAGE",
        });
      }
    } catch (error) {
      if (error) {
        dispatch({
          type: "NOMESSAGE",
          payload: error.data.title,
        });
        setByGenderLoading(false);
      }
    }
  };
