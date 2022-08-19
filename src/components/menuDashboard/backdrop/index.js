import React from "react";

import { styled } from "@mui/material";

const Backdrop = styled("div")(() => ({
  position: "fixed",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0",
  background: "rgba(0, 0, 0, 0.28)",
  zIndex: "100",
  backdropFilter: "blur(13px)",
}));

const BackDrop = ({ onClick }) => <Backdrop onClick={onClick} />;

export default BackDrop;
