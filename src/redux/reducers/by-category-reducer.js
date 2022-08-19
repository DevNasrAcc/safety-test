const initialState = {
  byCategory: [],
};

const byCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VIOLATIONSBYCATEGORY": {
      return { ...state, byCategory: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default byCategoryReducer;
