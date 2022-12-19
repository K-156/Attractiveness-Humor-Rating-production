import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import ProjectTable from "../../Components/Tables/ProjectTable";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";
import { useAppContext } from "../../Context/AppContext";

// const data = [
//   { id: 1, name: "Employment", isActive: true, isPublish: true, edit: 1 },
//   { id: 2, name: "Project 1", isActive: false, isPublish: false, edit: 2 },
//   { id: 3, name: "Project 2", isActive: false, isPublish: false, edit: 3 },
//   { id: 4, name: "Project 3", isActive: false, isPublish: false, edit: 4 },
//   { id: 5, name: "Project 4", isActive: false, isPublish: false, edit: 5 },
//   { id: 6, name: "Project 5", isActive: false, isPublish: false, edit: 6 },
//   { id: 7, name: "Project 6", isActive: false, isPublish: false, edit: 7 },
// ];

const Projects = () => {
  const navigate = useNavigate();
  const {
    getAllProjects,
    projects,
    isLoading,
    setEditProject,
    deleteProject,
    isEditing,
    editProject,
  } = useAppContext();
  const handleOnClick = () => {
    navigate("/projects/details");
    sessionStorage.setItem("editMode", "add");
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <script>{(document.title = "Projects")}</script>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mx: 6 }}>
        <Button
          variant="contained"
          onClick={handleOnClick}
          className="customButton"
        >
          Add Project
        </Button>
      </Box>
      <ProjectTable data={projects} />
    </div>
  );
};

export default Projects;
