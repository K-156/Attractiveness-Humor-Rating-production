import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

import { Box, Button } from "@mui/material";
import { HiArrowLeft } from "react-icons/hi";

const PrevButton = ({ isSurvey, state, text, style, link }) => {
  const { theme, getProject, createdProjectId, prevSection } = useAppContext();

  const navigate = useNavigate();
  const handleOnClick = () => {
    prevSection();
    getProject(createdProjectId);
    navigate(`${link}`, {
      state: { state },
    });
  };

  return (
    <Box sx={style}>
      <Button
        onClick={handleOnClick}
        variant="contained"
        className={isSurvey ? `customButton-${theme}` : "customButton-green"}
      >
        <HiArrowLeft style={{ marginRight: "10px" }} />{" "}
        {text === undefined ? "Previous" : text}
      </Button>
    </Box>
  );
};

export default PrevButton;
