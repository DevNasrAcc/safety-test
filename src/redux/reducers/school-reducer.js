const initialState = {
  allSchools: [],
  schoolByOperators: [],
  bySchool: [],
};

const schoolReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALLSCHOOLS": {
      return { ...state, allSchools: action.payload };
    }

    case "SCHOOLBYOPERATOR": {
      return { ...state, schoolByOperators: action.payload };
    }

    case "VIOLATIONSBYSCHOOL": {
      return { ...state, bySchool: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default schoolReducer;
