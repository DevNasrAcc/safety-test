import {
  getAllOperators,
  getViolationByOperators,
  filterCategories,
} from "../services/operators-services";

export const allOperators = (setOperatorLoading) => async (dispatch) => {
  try {
    const response = await getAllOperators();

    if (response) {
      setOperatorLoading(false);

      dispatch({
        type: "ALLOPERATORS",
        payload: response.data,
      });
    }
  } catch (error) {
    if (error) {
      setOperatorLoading(false);
    }
  }
};

export const violationsByOperators =
  (filterString, startDate, endDate, setByOperatorLoading) =>
  async (dispatch) => {
    try {
      const response = await getViolationByOperators(
        filterString,
        startDate,
        endDate
      );

      if (response) {
        setByOperatorLoading(false);

        dispatch({
          type: "VIOLATIONSBYOPERATORS",
          payload: response.data,
        });
      }
    } catch (error) {
      if (error) {
        setByOperatorLoading(false);
      }
    }
  };

export const allFilterCategories = (setFiltersLoading) => async (dispatch) => {
  try {
    const response = await filterCategories();

    if (response) {
      setFiltersLoading(false);

      dispatch({
        type: "ALLFILTERS",
        payload: response.data,
      });
    }
  } catch (error) {
    if (error) {
      setFiltersLoading(false);
    }
  }
};
