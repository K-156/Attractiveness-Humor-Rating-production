import { Outlet } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

import { Box } from "@mui/material";

import { themePalette } from "../Utils/themePalette";

const GeneralLayout = () => {
  const { theme } = useAppContext();

  return (
    <Box
      sx={{
        backgroundColor: themePalette[theme]?.background,
        p: "25px 25px 50px 25px",
        minHeight: "100vh",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default GeneralLayout;
