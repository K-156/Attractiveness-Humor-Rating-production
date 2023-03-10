import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

import { Box, Button } from "@mui/material";
import { HiArrowLeft } from "react-icons/hi";

const PrevButton = ({ isSurvey, state, text, style, link, projectType }) => {
  const { theme, getProject, createdProjectId, prevSection } =
    useAppContext();
  const navigate = useNavigate();
  const handleOnClick = async () => {
    if (text === "Profiles") {
    } else if (projectType === "projData") {
      prevSection();
      sessionStorage.setItem("sectionNum", Math.max(Number(sessionStorage.getItem("sectionNum"))-1,0));
      getProject(createdProjectId);
      
    }
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
