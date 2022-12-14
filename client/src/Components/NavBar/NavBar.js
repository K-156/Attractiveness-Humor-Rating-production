import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import { MdSpaceDashboard } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

import "./NavBar.css";

const NavBar = () => {

    const navigate = useNavigate();
    const [tab, setTab] = useState("overview");

    const handleOnClick = (route) => {
        // navigate(`/${route}`);
        // setTab(route)
    }

    return (
    <>
    <div id="NavBar">
        <Box mt={12}>
            <Button 
                className="navBarButton"
                sx={{background: tab === "overview" ? "#1d353f" : "#264653"}}
                onClick={handleOnClick("overview")}
            >
                <MdSpaceDashboard size={25} style={{margin:"15px"}}/>
                <Typography variant="subtitle1" pl={1}>Overview</Typography>
            </Button>
            <Button 
                className="navBarButton"
                sx={{background: tab === "project" ? "#1d353f" : "#264653"}}
                onClick={handleOnClick("project")}
            >
                <BsCardChecklist size={25} style={{margin:"15px"}}/>
                <Typography variant="subtitle1" pl={1}>Project</Typography>
            </Button>
        </Box>

        <Box className="logoutPosition">
            <Button 
                variant="contained"
                className="logoutButton"
                sx={{mx:7, px: 3, backgroundColor:"#FFFFFF", '&:hover': {backgroundColor: "#C59D5F"}}}
                onClick={() => navigate("/")}
            >
                <FiLogOut size={20} style={{margin:"10px 10px 10px 0px"}}/>
                <Typography variant="subtitle1">Logout</Typography>
            </Button>
        </Box>
    </div>
    </>
    )  
}

export default NavBar;