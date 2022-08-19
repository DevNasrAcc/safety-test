import React, { useState } from "react";

import { Backdrop, Box, Modal, Fade } from "@mui/material";
import { styled } from "@mui/material";

import ByKeyword from "../../pages/dashboard/keywordsAttempt";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "auto",
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
  const { modalState, handleClose } = props;

  const [insideModal, setInsideModal] = useState("inside");

  return (
    <StyledModal
      open={modalState}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 10,
      }}
    >
      <Fade in={modalState}>
        <Box sx={style}>
          <ByKeyword
            setInsideModal={setInsideModal}
            insideModal={insideModal}
          />
        </Box>
      </Fade>
    </StyledModal>
  );
};

export default ExpandDiv;
