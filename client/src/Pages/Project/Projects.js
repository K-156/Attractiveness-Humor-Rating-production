import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import ProjectTable from "../../Components/Tables/ProjectTable";
import Loading from "../../Components/LoadingAnimation/LoadingAnimation";
import { useAppContext } from "../../Context/AppContext";
import ErrorAlert from "../../Components/SnackBar/ErrorAlert";

const Projects = () => {
  const navigate = useNavigate();
  const { getAllProjects, projects, isLoading, createProject } =
    useAppContext();
  const handleOnClick = () => {
    createProject();
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
          className="customButton-green"
        >
          Add Project
        </Button>
      </Box>
      <ErrorAlert isError={true} text="hihi cannot delete active project"/>
      <ProjectTable data={projects} />
    </div>
  );
};

export default Projects;
