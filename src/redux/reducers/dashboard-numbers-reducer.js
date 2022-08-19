const initialState = {
  dashboardNumbers: [],
};

const numberReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DASHBOARDNUMBERS": {
      return { ...state, dashboardNumbers: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default numberReducer;
