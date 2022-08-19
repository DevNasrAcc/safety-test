const initialState = {
  byDay: [],
};

const byDayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VIOLATIONSBYDAY": {
      return { ...state, byDay: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default byDayReducer;
