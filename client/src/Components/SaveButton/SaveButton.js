import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";

import { Box, Button } from "@mui/material";

const SaveButton = ({ projectType, formData, templateNum, sectionNum }) => {
  const { updateProject, data } = useAppContext();
  const editProjectId = sessionStorage.getItem("editProjectId");

  const navigate = useNavigate();
  const handleSubmit = (formData) => {
    if (projectType === "projDetails") {
      updateProject(editProjectId, projectType, formData);
    }
    if (projectType === "projData") {
      let arr = data;
      let dict = {};
      dict[templateNum] = formData;
      if (sectionNum == arr.length + 1) {
        arr.push(dict);
      } else {
        arr[sectionNum - 1] = dict;
      }
      updateProject(editProjectId, projectType, arr);
    } else {
      updateProject(editProjectId, projectType, formData);
    }
    navigate("/projects/summary");
  };
  return (
    <Box className="flexEnd" sx={{ my: 2 }}>
      <Button
        variant="contained"
        className="customButton-green"
        onClick={() => {
          handleSubmit(formData);
        }}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default SaveButton;
