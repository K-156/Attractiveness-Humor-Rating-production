import { useAppContext } from "../../Context/AppContext";

import { CircularProgress, Box } from "@mui/material/";

import { colorPalette } from "../../Utils/colorPalette";

const LoadingAnimation = ({ isSurvey, size, marginLeft }) => {
  const { theme } = useAppContext();

  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress
        size={size}
        sx={{
          color: colorPalette[isSurvey ? theme : "green"]["primary"],
          m: "3rem auto",
          marginLeft: { marginLeft },
        }}
      />
    </Box>
  );
};

export default LoadingAnimation;
