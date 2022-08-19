const initialState = {
  byHours: [],
};

const byHoursReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VIOLATIONSBYSCHOOLHOURS": {
      return { ...state, byHours: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default byHoursReducer;
