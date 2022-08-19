const initialState = {
  gradesBySchool: [],
  byGrade: [],
};

const gradeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GRADESBYSCHOOL": {
      return { ...state, gradesBySchool: action.payload };
    }

    case "VIOLATIONSBYGRADE": {
      return { ...state, byGrade: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default gradeReducer;
