import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

import { 
  Box, 
  Button
} from "@mui/material";

const SaveButton = ({ projectType, data, templateNum, sectionNum }) => {
  console.log(sectionNum)
  const navigate = useNavigate();
  const {updateProject, editProjectId} = useAppContext()
  const handleSubmit = (data) => {
    if (projectType === "projDetails") {
      let dict = {};
      dict[projectType] = data;
      console.log(dict);
      updateProject(editProjectId, projectType, dict);
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
      updateProject(editProjectId, projectType, arr);
      localStorage.setItem(projectType, JSON.stringify(arr));
    } else {
      updateProject(editProjectId, projectType, data);
      localStorage.setItem(projectType, JSON.stringify(data));
    }

    navigate("/projects/summary")

  };
  return (
    <Box 
      className="flexEnd"
      sx={{ my: 2 }}
    >
      <Button
        variant="contained"
        className="customButton-green"
        onClick={() => {
          handleSubmit(data);
        }}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default SaveButton;
