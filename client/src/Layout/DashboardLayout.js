import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import NavBar from "../Components/NavBar/NavBar";
import { useAppContext } from "../Context/AppContext";

const DashboardLayout = () => {

    const {open} = useAppContext();

    return(
        <>
        <NavBar/>
        <Box sx={{ml:"250px"}}>
            <Outlet />
        </Box>
        </>    
    )
}

export default DashboardLayout;