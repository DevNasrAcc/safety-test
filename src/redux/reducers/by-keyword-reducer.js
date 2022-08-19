const initialState = {
  byKeyword: [],
};

const byKeywordReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VIOLATIONSBYKEYWORD": {
      return { ...state, byKeyword: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default byKeywordReducer;
