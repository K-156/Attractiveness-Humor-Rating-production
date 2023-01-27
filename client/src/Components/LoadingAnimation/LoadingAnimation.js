import { useAppContext } from "../../Context/AppContext";

import { CircularProgress, Box } from "@mui/material/";

import { themePalette } from "../../Utils/themePalette";

const LoadingAnimation = ({ isSurvey, size, marginLeft }) => {
  const { theme } = useAppContext();

  return (
    <Box className="center">
      <CircularProgress
        size={size}
        sx={{
          color: themePalette[isSurvey ? theme : "green"]["primary"],
          mx: "3rem auto",
          marginLeft: { marginLeft },
        }}
      />
    </Box>
  );
};

export default LoadingAnimation;
