import React, { useState } from "react";

import { Backdrop, Box, Modal, Fade } from "@mui/material";
import { styled } from "@mui/material";

import ByGender from "../../pages/dashboard/violationByGender";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "40%",
  overflow: "auto",

  "&::-webkit-scrollbar": {
    display: "none",
  },
};

const StyledModal = styled(Modal)(() => ({
  background: "rgba(0, 0, 0, 0.28)",
  backdropFilter: "blur(4px)",
}));

const ExpandDiv = (props) => {
  const { genderState, handleClose } = props;

  const [insideModal, setInsideModal] = useState("inside");

  return (
    <StyledModal
      open={genderState}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 10,
      }}
    >
      <Fade in={genderState}>
        <Box sx={style}>
          <ByGender setInsideModal={setInsideModal} insideModal={insideModal} />
        </Box>
      </Fade>
    </StyledModal>
  );
};

export default ExpandDiv;
