export const leftPanelToTrue = () => (dispatch) => {
  dispatch({
    type: "PANELTOTRUE",
  });
};

export const leftPanelToFalse = () => (dispatch) => {
  dispatch({
    type: "PANELTOFALSE",
  });
};
