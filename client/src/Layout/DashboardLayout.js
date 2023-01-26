import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import NavBar from "../Components/NavBar/NavBar";

const DashboardLayout = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F0F4F8",
        p: "25px 25px 50px 25px",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <Box sx={{ ml: "250px" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
