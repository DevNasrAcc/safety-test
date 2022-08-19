const initialState = {
  allOperators: [],
  byOperators: [],
  filterCategory: [],
};

const operatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALLOPERATORS": {
      return { ...state, allOperators: action.payload };
    }

    case "VIOLATIONSBYOPERATORS": {
      return { ...state, byOperators: action.payload };
    }

    case "ALLFILTERS": {
      return { ...state, filterCategory: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default operatorReducer;
