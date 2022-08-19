const initialState = {
  studentsByGrade: [],
  byStudents: [],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STUDENTSBYGRADE": {
      return { ...state, studentsByGrade: action.payload };
    }

    case "VIOLATIONSBYSTUDENTS": {
      return { ...state, byStudents: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default studentReducer;
