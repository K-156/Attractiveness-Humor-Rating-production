import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";
import { HiOutlineArrowLeft } from "react-icons/hi";

import { ReactComponent as ErrorImage } from "../../Assets/error404.svg";
import { colorPalette } from "../../Utils/colorPalette";

const Error404 = ({ text }) => {
  const { theme } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className={`backgroundImage-${theme} center`}>
      <Box
        className="center"
        sx={{
          height: "100vh",
          flexDirection: "column",
          py: 5,
        }}
      >
        <Button
          sx={{
            color: colorPalette[theme]["secondary"],
            width: "200px",
            textTransform: "none",
            fontSize: "16px",
          }}
          onClick={() => navigate("/")}
        >
          <HiOutlineArrowLeft style={{ marginRight: "10px" }} />
          Return to Home
        </Button>
        <ErrorImage style={{ height: "80%" }} />
      </Box>
    </div>
  );
};

export default Error404;
