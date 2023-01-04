import { LinearProgress, LinearProgressProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface LinearProgressWithLabelProps {
  props?: LinearProgressProps;
  value: number;
  name: string;
}

const LinearProgressWithLabel = ({
  props,
  value,
  name,
}: LinearProgressWithLabelProps) => {
  return (
    <Box sx={{ width: "100%", mr: 1 }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {name}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={value}
        {...props}
        sx={{
          height: "20px",
          marginTop: "-20px",
        }}
        color="success"
      />
    </Box>
  );
};

export default LinearProgressWithLabel;
