import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  box: {
    background: "#FFFFFF",
    boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.15)",
    borderRadius: "14.7481px",
    padding: "22px 18px 0px",
    height: "calc(100% - 22px)",
    position: "relative",
  },
});

export const GridBox = (props) => {
  const { className, children, sx } = props;
  const classes = useStyles();
  return (
    <Box sx={sx} className={[className, classes.box].join(" ")}>
      {children}
    </Box>
  );
};
