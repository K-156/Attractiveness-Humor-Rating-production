import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

import { Box, Button, Typography } from "@mui/material";
import { MdSpaceDashboard } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import _ from "lodash";

import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { removeUserFromLocalStorage } = useAppContext();
  const [tab, setTab] = useState(location.pathname);
  const navList = [
    {
      name: "Overview",
      icon: <MdSpaceDashboard />,
    },
    {
      name: "Projects",
      icon: <BsCardChecklist />,
    },
    {
      name: "Participants",
      icon: <HiUserGroup />,
    },
  ];

  useEffect(() => {
    setTab(location.pathname);
  }, [location]);

  return (
    <>
      <div id="NavBar">
        <Box mt={12}>
          {_.map(navList, (item) => {
            return (
              <Button
                key={item.name}
                className="navBarButton"
                sx={{
                  background: tab.includes(item.name.toLowerCase())
                    ? "#1d353f"
                    : "#264653",
                }}
                onClick={() => navigate(`/${item.name.toLowerCase()}`)}
              >
                <Box className="center" sx={{ fontSize: "25px", m: 2 }}>
                  {item.icon}
                </Box>
                <Typography sx={{ pl: 1 }}>{item.name}</Typography>
              </Button>
            );
          })}
        </Box>
        <Box className="logoutPosition">
          <Button
            variant="contained"
            className="logoutButton"
            onClick={() => {
              removeUserFromLocalStorage();
              sessionStorage.clear();
              navigate("/");
            }}
          >
            <FiLogOut size={20} style={{ margin: "10px 10px 10px 0px" }} />
            <Typography>Logout</Typography>
          </Button>
        </Box>
      </div>
    </>
  );
};

export default NavBar;
