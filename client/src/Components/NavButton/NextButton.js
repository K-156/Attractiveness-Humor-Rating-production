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
  open,
  setOpen,
}) => {
  const {
    theme,
    updateProject,
    createdProjectId,
    getProject,
    nextSection,
    sectionNum,
  } = useAppContext();

  const navigate = useNavigate();
  const handleOnClick = () => {
    if (ratingType === "rank") {
      sessionStorage.setItem("rank", storeItem);
    }
    if (projectType === "emailList") {
      let dict = {};
      dict[projectType] = data;

      updateProject(createdProjectId, projectType, dict).then(() => {
        getProject(createdProjectId);
      });
      setOpen(false);
    }

    if (projectType === "projDetails") {
      let dict = {};
      dict[projectType] = data;
      updateProject(createdProjectId, projectType, dict).then(() => {
        getProject(createdProjectId);
      });
    }

    if (projectType === "projData") {
      nextSection();
      let arr = JSON.parse(localStorage.getItem("projData"))
        ? JSON.parse(localStorage.getItem("projData"))
        : [];
      console.log(sectionNum, arr.length);
      let dict = {};
      dict[templateNum] = data;
      if (sectionNum == arr.length) {
        arr.push(dict);
      } else {
        arr[sectionNum] = dict;
      }
      updateProject(createdProjectId, projectType, arr).then(() => {
        getProject(createdProjectId);
      });
      localStorage.setItem(projectType, JSON.stringify(arr));
    }
    if (projectType === "sections") {
      updateProject(createdProjectId, projectType, data).then(() => {
        getProject(createdProjectId);
      });
      localStorage.setItem(projectType, JSON.stringify(data));
    }
    link &&
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
        {link && <HiArrowRight style={{ marginLeft: "10px" }} />}
      </Button>
    </Box>
  );
};

export default NextButton;
