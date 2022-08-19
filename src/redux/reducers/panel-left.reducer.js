const initialState = {
  leftState: false,
};

const panelReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PANELTOTRUE": {
      return {
        leftState: true,
      };
    }

    case "PANELTOFALSE": {
      return {
        leftState: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default panelReducer;
