import { useAppContext } from "../../Context/AppContext";

import { Box, Typography, CardHeader } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { colorPalette } from "../../Utils/colorPalette";


const ProfileInfo = ({ receiver, firstCandidate, lastCandidate }) => {
  const { theme } = useAppContext();

  return (
    <Box sx={{ width: "400px", borderRight: "solid 1px #D9D9D9" }}>
      <CardHeader
        sx={{
          backgroundColor: colorPalette[theme]["primary"],
          color: "#FFFFFF",
          py: "12px",
        }}
        title={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <RxCross2 style={{ marginRight: "70px" }} />
            <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
              Profile Info
            </Typography>
          </Box>
        }
      />
      <Box sx={{ p: 2 }}>
        <Box className="center">
          <img
            src={
              receiver.includes("1") ? firstCandidate.link : lastCandidate.link
            }
            style={{ width: "200px" }}
            alt="candidate profile"
          />
        </Box>
        <Typography
          className="cardHeader"
          sx={{ color: colorPalette[theme]["primary"] }}
        >
          {receiver.includes("1")
            ? firstCandidate.optionName.toUpperCase()
            : lastCandidate.optionName.toUpperCase()}
        </Typography>
        <Typography sx={{ fontSize: "14px", textAlign: "center", pt: 1 }}>
          {receiver.includes("1")
            ? firstCandidate.description
            : lastCandidate.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileInfo;
