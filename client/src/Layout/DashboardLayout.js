import { Outlet } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";

import { Box } from "@mui/material";

import NavBar from "../Components/NavBar/NavBar";
import { colorPalette } from "../Utils/colorPalette";

const DashboardLayout = () => {

    const {open} = useAppContext();

    return(
        <Box
            sx={{
                backgroundColor: colorPalette["green"]["background"],
                p: "25px 25px 50px 25px",
                minHeight:"100vh"
            }}
        >
            <NavBar/>
            <Box sx={{ml:"250px"}}>
                <Outlet />
            </Box>
        </Box>    
    )
}

export default DashboardLayout;