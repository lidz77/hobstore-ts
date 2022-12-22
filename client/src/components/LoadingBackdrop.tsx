import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const LoadingBackdrop = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      transitionDuration={{
        appear: 5000,
        enter: 5000,
        exit: 5000,
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
