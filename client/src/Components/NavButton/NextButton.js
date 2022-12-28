import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

import { Box, Button } from "@mui/material";
import { HiArrowRight } from "react-icons/hi";

const NextButton = ({
  isSurvey,
  link,
  state,
  text,
  style,
  disabled,
  storeItem,
  ratingType,
  handleOnSubmit,
  data,
  projectType,
  templateNum,
  sectionNum,
}) => {
  const {
    theme,
    updateProject,
    createdProjectId,
  } = useAppContext();

  const navigate = useNavigate();
  const handleOnClick = () => {
    if (ratingType === "rank") {
      sessionStorage.setItem("rank", storeItem);
    }

    if (projectType === "projDetails") {
      let dict = {};
      dict[projectType] = data;
      updateProject(createdProjectId, projectType, dict);
    }

    if (projectType === "projData") {
      let arr = JSON.parse(localStorage.getItem("projData"))
        ? JSON.parse(localStorage.getItem("projData"))
        : [];
      let dict = {};
      dict[templateNum] = data;
      if (sectionNum == arr.length + 1) {
        arr.push(dict);
      } else {
        arr[sectionNum] = dict;
      }
      updateProject(createdProjectId, projectType, arr);
      localStorage.setItem(projectType, JSON.stringify(arr));
    } else {
      updateProject(createdProjectId, projectType, data);
      localStorage.setItem(projectType, JSON.stringify(data));
    }

    navigate(`${link}`, {
      state: { state },
    });
  };

  return (
    <Box sx={style}>
      <Button
        disabled={disabled}
        onClick={handleOnSubmit ? handleOnSubmit : handleOnClick}
        variant="contained"
        className={isSurvey ? `customButton-${theme}` : "customButton-green"}
      >
        {text === undefined ? "Next" : text}{" "}
        <HiArrowRight style={{ marginLeft: "10px" }} />
      </Button>
    </Box>
  );
};

export default NextButton;
