import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { 
  Box, 
  Button, 
  Typography 
} from "@mui/material";
import { MdSpaceDashboard } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [tab, setTab] = useState(location.pathname);

  useEffect(() => {
    setTab(location.pathname)
  }, [location])

  return (
    <>
      <div id="NavBar">
        <Box mt={12}>
          <Button
            className="navBarButton"
            sx={{ background: tab.includes("overview") 
                  ? "#1d353f" 
                  : "#264653" 
               }}
            onClick={() => navigate("/overview")}
          >
            <MdSpaceDashboard 
              size={25} 
              style={{ margin: "15px" }} 
            />
            <Typography sx={{pl: 1}}>
              Overview
            </Typography>
          </Button>
          <Button
            className="navBarButton"
            sx={{ background: tab.includes("projects")
                  ? "#1d353f" 
                  : "#264653"  
                }}
            onClick={() => navigate("/projects")}
          >
            <BsCardChecklist 
              size={25} 
              style={{ margin: "15px" }} 
            />
            <Typography sx={{pl: 1}}>
              Projects
            </Typography>
          </Button>
        </Box>

        <Box className="logoutPosition">
          <Button
            variant="contained"
            className="logoutButton"
            onClick={() => navigate("/")}
          >
            <FiLogOut 
              size={20} 
              style={{ margin: "10px 10px 10px 0px" }} 
            />
            <Typography>Logout</Typography>
          </Button>
        </Box>
      </div>
    </>
  );
};

export default NavBar;
