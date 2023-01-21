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
  handleUpload,
}) => {
  const {
    theme,
    updateProject,
    projId,
    getProject,
    nextSection,
    sectionNum,
  } = useAppContext();

  const navigate = useNavigate();
  const handleOnClick = async () => {
    if (ratingType === "rank") {
      sessionStorage.setItem("rank", storeItem);
    }
    if (projectType === "emailList") {
      await updateProject(projId, projectType, data).then(() => {
        getProject(projId);
      });
      setOpen(false);
      handleUpload();
    }

    if (projectType === "projDetails") {
      sessionStorage.setItem("roles", JSON.stringify(data.roles));
      updateProject(projId, projectType, data).then(() => {
        getProject(projId);
      });
    }

    if (projectType === "projData") {
      nextSection()
      sessionStorage.setItem("sectionNum", Number(sessionStorage.getItem("sectionNum"))+1);
      console.log('hi')
      let arr = JSON.parse(localStorage.getItem("projData"))
        ? JSON.parse(localStorage.getItem("projData"))
        : [];
      let dict = {};
      dict[templateNum] = data;
      if (sectionNum == arr.length) {
        arr.push(dict);
      } else {
        arr[sectionNum] = dict;
      }
      updateProject(projId, projectType, arr).then(() => {
        getProject(projId);
      });
      localStorage.setItem(projectType, JSON.stringify(arr));
    }
    if (projectType === "sections") {
      updateProject(projId, projectType, data).then(() => {
        getProject(projId);
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
