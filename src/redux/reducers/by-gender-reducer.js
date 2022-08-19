const initialState = {
  byGender: [],
};

const byGenderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VIOLATIONSBYGENDER": {
      return { ...state, byGender: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default byGenderReducer;
